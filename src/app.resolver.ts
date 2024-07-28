import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => String)
export class AppResolver {
  @Query(() => String)
  index(): string {
    return 'Hello World! from GraphQL';
  }
}
