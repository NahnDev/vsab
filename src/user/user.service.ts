import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { EUserStatus } from 'src/enums/EUserStatus';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from './schemas/user.schema';
import { compare, hash } from 'bcryptjs';
import { USER_ROLE } from 'src/constants/user.role';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}
  async create(
    createUserDto: CreateUserDto,
    session?: ClientSession,
  ): Promise<User> {
    const userDoc = new this.userModel({
      ...createUserDto,
      password: await this.hashPassWd(createUserDto.password),
    });
    await userDoc.save({ session });
    return this.findOne(userDoc._id);
  }

  async findAll(search = '') {
    const userDocs = await this.userModel
      .find({ email: { $regex: new RegExp(search, 'i') } })
      .limit(10);
    return userDocs.map((userDoc) => userDoc.toJSON());
  }

  async findOne(id: string): Promise<User> {
    const userDoc = await this.userModel.findById(id);
    if (!userDoc) throw new NotFoundException(`Not found user with id ${id}`);
    const user = userDoc.toJSON();
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await this.userModel.findOne({ email });
    if (!userDoc) return null;
    const user: User = userDoc.toJSON();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassWd(updateUserDto.password);
    }
    await this.userModel.updateOne({ _id: id }, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.userModel.updateOne(
      { _id: id },
      { active: EUserStatus.BLOCK },
    );
  }

  async activeUser(id: string) {
    return await this.userModel.updateOne(
      {
        _id: id,
      },
      { active: EUserStatus.ACTIVE },
    );
    return true;
  }

  async hashPassWd(password: string): Promise<string> {
    const hashed = await hash(password, 1);
    return hashed;
  }
  async verifyPassWd(password: string, hash): Promise<boolean> {
    return await compare(password, hash);
  }
  async getPasswordByEmail(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email }, { password: 1 });
    if (!user) return null;
    return user.password;
  }
}
