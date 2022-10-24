import { pick } from 'lodash';
import { Scope } from './scope.class';

export type ExtractScopeCallback = (data: unknown) => Scope;

export const defaultExtractScopeCallback: ExtractScopeCallback = (data) => {
  return pick(data, ['project']);
};
