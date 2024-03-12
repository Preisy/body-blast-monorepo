import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { AppBaseEntity } from '../models/app-base-entity.entity';
import { Between, FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from 'typeorm';
import { ToBoolean } from '../decorators/to-boolean.decorator';
import { createDerivedClass } from './create-derived-class.util';

export namespace AppDatePagination {
  export class Request {
    @IsOptional()
    @ApiPropertyOptional({ example: '2020-11-11' })
    @IsDateString()
    public from?: Date;

    @IsOptional()
    @ApiPropertyOptional({ example: '2020-11-11' })
    @IsDateString()
    public to?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @ToBoolean()
    public expanded?: boolean;

    constructor(expanded = false, from?: Date, to?: Date) {
      this.expanded = expanded;
      this.from = from;
      this.to = to;
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
      class AppPaginationResponseType extends AppDatePagination.Response<T> {
        @ApiProperty({ type, isArray: true })
        public data: T[];
      }

      return createDerivedClass(`AppPagination${type.name}ResponseType`, AppPaginationResponseType);
    }
  }

  export type GetExecutorOptions<Entity> = Omit<FindManyOptions<Entity>, 'skip' | 'take'>;

  export function getExecutor<Entity extends AppBaseEntity>(
    repository: Repository<Entity>,
    relations?: FindOneOptions<Entity>['relations'],
  ) {
    return {
      getPaginatedData: async (
        query: AppDatePagination.Request,
        options: Omit<FindManyOptions<Entity>, 'skip' | 'take' | 'relations'> = {},
      ) => {
        const request = new AppDatePagination.Request(query.expanded, query.from, query.to);
        const from = request.from || new Date('2020-01-01');
        const to = request.to || new Date();

        const queryBuilder = repository.createQueryBuilder('entity');
        const whereCondition = {
          createdAt: Between(from, to),
        };
        const [sellers, count] = await queryBuilder.where(whereCondition).getManyAndCount();

        return new AppDatePagination.Response<Entity>(sellers, count);
      },
    };
  }
}
