import { WsAuthGuard } from './ws-auth.guard';

describe('WsGuard', () => {
  it('should be defined', () => {
    expect(new WsAuthGuard()).toBeDefined();
  });
});
