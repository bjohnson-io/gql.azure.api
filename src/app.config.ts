import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

export const AppConfig = {
  GraphQL: {
    debug: false,
    typePaths: [join(process.cwd(), 'src/**/*.graphql')],
    installSubscriptionHandlers: true,
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class'
    }
  } as GqlModuleOptions
};
export default AppConfig;