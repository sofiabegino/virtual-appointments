"use strict";
// import { faker } from '@faker-js/faker';
// import boom from '@hapi/boom';
// import bcrypt from "bcryptjs";
// import { IUpdateUser, IUser } from '../interfaces/IUser';
// import { generateToken } from '../utils/jwt';
// import { getConnection } from '../libs/postgres';
// import  models from './../libs/sequelize';
// import {pool} from '../libs/postgres.pool'
// export class UserService {
//   users:IUser[];
//   constructor(){
//     this.users = [];
//     this.generate();
//   }
//   generate() {
//     const limit = 100;
//     for (let index = 0; index < limit; index++) {
//       return {
//           _id: faker.datatype.uuid(),
//           name: faker.name.firstName(),
//           email: faker.internet.email(),
//           password: faker.internet.password(10, true, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
//           role: 'patient',
//       };
//     }
//   }
//   async create(user:IUser) {
//     const newUser = {
//       _id: faker.datatype.uuid(),
//       name: user.name,
//       email: user.email,
//       password: bcrypt.hashSync(user.password, 8),
//       role: user.role
//     }
//     const query = `INSERT INTO users (id, name, email, password,role) VALUES (4232, 'sofi','sofi@mail', 'cfds','fedscs')`
//     const createdUser = pool.query(query);
//     return createdUser;
//     // return {
//     //   ...newUser,
//     //   token: generateToken(newUser),
//     // };
//   }
//   async find() {
//     const query = 'SELECT * FROM users';
//     const data = pool.query(query);
//     return data;
//   }
//   async findOne(id:string) {
//     // const user = this.users.find(user => user._id === id);
//     // if (!user) {
//     //   throw boom.notFound('user not found');
//     // }
//     return null;
//   }
//   async findByEmail(email:string) {
//     // const user = model.Users.find(user => user._id === id);
//     // if (!user) {
//     //   throw boom.notFound('user not found');
//     // }
//     return {name:'dfs',role:'dfs',_id:54322332,'email':'sdds',password:'dfds'};
//   }
//   async update(id:string, modifiedUser:IUpdateUser) {
//     // const index = this.users.findIndex(user => user._id === id);
//     // if (index === -1) {
//     //   throw boom.notFound('product not found');
//     // }
//     // const product = this.users[index];
//     // this.users[index] = {
//     //   ...product,
//     //   ...modifiedUser
//     // };
//     return null;
//   }
//   async delete(id:string) {
//     // const index = this.users.findIndex(user => user._id === id);
//     // if (index === -1) {
//     //   throw boom.notFound('user not found');
//     // }
//     // this.users.splice(index, 1);
//     return { id };
//   }
// }
