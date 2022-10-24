import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { User } from 'src/user/schemas/user.schema';
import { File } from '../file/schemas/file.schema';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof User | typeof File | 'all', true>;

export type AppAbility = Ability<[Actions, Subjects]>;

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    can(Actions.Manage, 'all');
    return build();
  }
}
