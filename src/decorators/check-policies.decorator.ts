import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from 'src/casl/policy-handler';
import { CHECK_POLICIES_KEY } from 'src/constants/CHECK_POLICIES_KEY';

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
