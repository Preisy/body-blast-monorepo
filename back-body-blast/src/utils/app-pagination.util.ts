import { FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, IsOptional } from 'class-validator';
import { ToBoolean } from '../decorators/to-boolean.decorator';
import { createDerivedClass } from './create-derived-class.util';

export namespace AppPagination {
  export class Request {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumberString()
    public page?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumberString()
    public limit?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @ToBoolean()
    public expanded?: boolean;

    constructor(expanded = false, page?: number, limit?: number) {
      this.page = page;
      this.limit = limit;
      this.expanded = expanded;
    }
  }

  export class Response<Entity extends ObjectLiteral> {
    public data: Entity[];

    @ApiProperty()
    public count: number;

    constructor(data: Entity[], count: number) {
      this.data = data;
      this.count = count;
    }

    static type<T extends ObjectLiteral>(type: new (...args: unknown[]) => T) {
      class AppPaginationResponseType extends AppPagination.Response<T> {
        @ApiProperty({ type, isArray: true })
        public data: T[];
      }

      return createDerivedClass(`AppPagination${type.name}ResponseType`, AppPaginationResponseType);
    }
  }
  export type GetExecutorOptions<Entity> = Omit<FindManyOptions<Entity>, 'skip' | 'take'>;

  export function getExecutor<Entity extends ObjectLiteral>(
    repository: Repository<Entity>,
    relations?: FindOneOptions<Entity>['relations'],
  ) {
    return {
      getPaginatedData: async (
        query: AppPagination.Request,
        options: Omit<FindManyOptions<Entity>, 'skip' | 'take' | 'relations'> = {},
      ) => {
        const request = new AppPagination.Request(query.expanded, query.page, query.limit);
        const page = request.page || 1;
        const limit = request.limit || 0;
        let skip = (page - 1) * limit!;

        skip = skip < 0 ? -1 * skip : skip;

        const [sellers, count] = await repository.findAndCount({
          skip: skip,
          take: limit,
          relations: request.expanded ? relations : undefined,
          ...options,
        });
        return new AppPagination.Response<Entity>(sellers, count);
      },
    };
  }
}
