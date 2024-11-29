import { z, ZodErrorMap, ZodIssueCode } from 'zod';

const getFieldName = (issue: { path: (string | number)[] }) => (issue.path.length > 0 ? issue.path.join('.') : 'Поле');

export const zodErrorMap: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      const typeDict: Record<string, string> = {
        number: `${getFieldName(issue)} должно быть числом`,
        string: `${getFieldName(issue)} должно быть строкой`,
        boolean: `${getFieldName(issue)} должно быть булевым значением`,
        date: `${getFieldName(issue)} должно быть датой`,
        array: `${getFieldName(issue)} должно быть массивом`,
        object: `${getFieldName(issue)} должно быть объектом`,
        undefined: `${getFieldName(issue)} не должно быть неопределено`,
        null: `${getFieldName(issue)} не должно равняться null`,
      };
      return { message: typeDict[issue.expected] ?? 'Неверный тип' };

    case ZodIssueCode.invalid_enum_value:
      return {
        message: `${getFieldName(issue)} должно быть одним из следующих значений: ${issue.options.join(', ')}`,
      };

    case ZodIssueCode.invalid_literal:
      return {
        message: `${getFieldName(issue)} должно быть значением: ${issue.expected}`,
      };

    case ZodIssueCode.too_small:
      return {
        message: `${getFieldName(issue)} должно быть больше или равно ${issue.minimum}`,
      };

    case ZodIssueCode.too_big:
      return {
        message: `${getFieldName(issue)} должно быть меньше или равно ${issue.maximum}`,
      };

    case ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: `${getFieldName(issue)} должно быть адресом email` };
      } else if (issue.validation === 'url') {
        return { message: `${getFieldName(issue)} должно быть валидным URL` };
      } else if (issue.validation === 'uuid') {
        return { message: `${getFieldName(issue)} должно быть валидным UUID` };
      } else {
        return { message: `${getFieldName(issue)} имеет неверный формат` };
      }

    case ZodIssueCode.invalid_union:
      return {
        message: `${getFieldName(issue)} не соответствует ни одному из допустимых типов`,
      };

    case ZodIssueCode.custom:
      return {
        message: issue.message ?? `${getFieldName(issue)} содержит ошибку`,
      };

    default:
      return { message: ctx.defaultError };
  }
};

// Usage
z.setErrorMap(zodErrorMap);
