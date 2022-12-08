import { Test, TestingModule } from '@nestjs/testing';
import { AssociationGateway } from './association.gateway';

describe('AssociationGateway', () => {
  let gateway: AssociationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociationGateway],
    }).compile();

    gateway = module.get<AssociationGateway>(AssociationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
