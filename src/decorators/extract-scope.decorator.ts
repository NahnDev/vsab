import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { ExtractScopeCallback } from 'src/auth/scopes/extract-scope-callback';

export const EXTRACT_DATA_KEY = 'extract_data_handler';
export const ExtractScope = (cb: ExtractScopeCallback) =>
  SetMetadata(EXTRACT_DATA_KEY, cb);
