import boom from '@hapi/boom';
import bcrypt from "bcryptjs";
import { IUpdateUser, IUser } from '../interfaces/IUser';
import { User, UserSchema } from '../db/models';
import  models from './../libs/sequelize';
 
export class UserService {

  constructor(){
    UserSchema(models);
    User.associate()
  }

  async create(user:IUser) {
    console.log(user);
    const newUser = {
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, 8),
      role: user.role
    }
    const createdUser = await User.create(newUser);
    return createdUser;
  }

  async findByEmail(email:string) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw boom.notFound('user not found');
    }
    const foundUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      otherInfo: user.otherInfo,
      phoneNumber: user.phoneNumber,
      weight: user.weight as number | undefined,
      height: user.height as number | undefined,
      password: user.password,
    }
    return foundUser;
  }

  async findUser(id:number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id:string,modifiedUser:IUpdateUser) {
    const user = await User.findByPk(id);
    if (user === null) {
      throw boom.notFound('user not found');
    }
    user.set({
      ...user,
      ...modifiedUser
    })
    await user.save();
    return user;
  }

  async delete(id:string) {
    const user = await User.findByPk(id);
    if (user === null) {
      throw boom.notFound('user not found');
    }
    await user.destroy();
    return { id };
  }

}
