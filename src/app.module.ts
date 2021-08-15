import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppConfig } from './app.config';
import { CommonModule } from './common/common.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    GraphQLModule.forRoot(AppConfig.GraphQL),
    QuoteModule,
    CommonModule,
  ]
})
export class AppModule {}
