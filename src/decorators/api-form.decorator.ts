import { ApiBody } from '@nestjs/swagger';

export function ApiForm(properties: {
  [name: string]: { type: string; format?: string };
}) {
  return ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties,
    },
  });
}
