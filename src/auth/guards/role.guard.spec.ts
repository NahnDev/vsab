import { PoliciesGuard } from './policies.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(new PoliciesGuard()).toBeDefined();
  });
});
