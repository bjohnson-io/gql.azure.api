import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { QuoteConfig } from './quote.config';
import { QuoteService } from './quote.service';
import { QuoteResolver } from './quote.resolver';
import { Quote } from './quote.entity';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(Quote, QuoteConfig.AzureTable),
  ],
  providers: [QuoteService, QuoteResolver],
})
export class QuoteModule {}
