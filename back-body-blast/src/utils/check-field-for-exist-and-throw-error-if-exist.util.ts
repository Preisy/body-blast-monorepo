// import { MainException } from 'src/exceptions/main.exception';
import { MainException } from 'src/exceptions/main.exception';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

export const checkFieldForExistAndThrowErrorIfExist = async <
  TEntity extends ObjectLiteral,
  Field extends keyof TEntity,
>(
  repository: Repository<TEntity>,
  field: Field,
  value: TEntity[Field],
) => {
  const entity = await repository.findOne({
    where: {
      [field]: value,
    } as FindOptionsWhere<TEntity>,
  });
  if (entity) throw MainException.invalidData(`Entity with ${field.toString()} ${value} already exist`);
};
