import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaType, SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';

@Schema({ _id: false })
export class Permission {
  @ApiProperty()
  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  manager: boolean;
}

@Schema()
export class Role {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'New role' })
  name: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Association.name, required: true })
  association: string;

  @ApiProperty()
  @Prop({ type: Permission, required: true })
  permission: Permission;
}

export type RoleDoc = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.methods.toJSON = function () {
  return plainToClass(Role, JSON.parse(JSON.stringify(this.toObject())));
};
