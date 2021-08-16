import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { QuoteService } from './quote.service';
import { Quote } from './quote.entity';
import { CreateQuoteInput } from '../graphql';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class QuoteResolver {

  constructor(
    private readonly quoteService: QuoteService,
    private readonly pubSub: PubSub
  ) {}

  @Query()
  async listQuotes() {
    return this.quoteService.findAll();
  }

  @Query()
  async getQuote(@Args('RowKey') rowKey: string) {
    return this.quoteService.find(rowKey, new Quote());
  }

  @Mutation()
  async createQuote(@Args('input') input: CreateQuoteInput) {
    let quote = new Quote(input);
    return this.quoteService.create(quote);
  }

  @Mutation()
  async updateQuote(
    @Args('RowKey') rowKey: string, 
    @Args('input') input: Partial<Quote>
  ) {
    let quote = new Quote(input);
    return this.quoteService.update(rowKey, quote);
  }

  @Mutation()
  async deleteQuote(@Args('RowKey') rowKey: string) {
    return this.quoteService.delete(rowKey, new Quote());
  }

  @Subscription()
  quoteCreated() {
    return this.pubSub.asyncIterator('quoteCreated');
  }

  @Subscription()
  quoteUpdated() {
    return this.pubSub.asyncIterator('quoteUpdated');
  }

  @Subscription()
  quoteDeleted() {
    return this.pubSub.asyncIterator('quoteDeleted');
  }

}
