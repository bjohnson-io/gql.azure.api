import { EntityPartitionKey, EntityRowKey, EntityString } from '@nestjs/azure-database';

@EntityPartitionKey('quote')
@EntityRowKey('RowKey')
export class Quote {

  @EntityString() 
  source: string;

  @EntityString() 
  quote: string;

  constructor(quote?: Partial<Quote>) {
    if (quote) {
      Object.assign(this, quote);
    }
  }

}