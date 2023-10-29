import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { MainException } from 'src/exceptions/main.exception';

type DefaultStatusCodes = 500 | 400 | 401;

const getBaseOptions = () => {
  return [
    {
      status: 500,
      description:
        'Internal error occurred (while internal HTTP requests, etc).',
      type: MainException,
    },
    {
      status: 400,
      description: 'Validation error (provided data is not valid).',
      type: MainException,
    },
    {
      status: 401,
      description: 'Unauthorized.',
      type: MainException,
    },
  ];
};

export function AppResponses(
  ...options: Exclude<ApiResponseOptions, DefaultStatusCodes>[]
) {
  return applyDecorators(
    ...getBaseOptions().map((it) => ApiResponse(it)),
    ...options.map((it) => ApiResponse(it)),
  );
}
