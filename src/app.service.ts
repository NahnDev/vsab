import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AssociationService } from './association/association.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  // constructor(private readonly associationService: AssociationService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async onApplicationBootstrap() {
    // tao
    // Tao use
  }
}
