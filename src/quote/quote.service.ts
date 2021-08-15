import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Quote } from './quote.entity';
import { Repository, InjectRepository } from '@nestjs/azure-database';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class QuoteService {

  constructor(
    @InjectRepository(Quote) 
    private readonly quoteRepo: Repository<Quote>,
    private readonly pubSub: PubSub
  ) {}

  async findAll() {
    const res = await this.quoteRepo.findAll();
    return res.entries || [];
  }

  async find(rowKey: string, quote: Quote) {
    try {
      return await this.quoteRepo.find(rowKey, quote);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async create(quote: Quote) {
    try {
      const createdQuote = await this.quoteRepo.create(quote);
      this.pubSub.publish('quoteCreated', { quoteCreated: createdQuote });
      return createdQuote;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async update(rowKey: string, quote: Partial<Quote>) {
    try {
      await this.quoteRepo.update(rowKey, quote);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
    try {
      const updatedQuote = await this.find(rowKey, new Quote());
      this.pubSub.publish('quoteUpdated', { quoteUpdated: updatedQuote });
      return updatedQuote;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async delete(rowKey: string, quote: Quote) {
    try {
      const deletedQuote = await this.find(rowKey, new Quote());
      await this.quoteRepo.delete(rowKey, quote);
      this.pubSub.publish('quoteDeleted', { quoteDeleted: deletedQuote });
      return deletedQuote;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }
}
