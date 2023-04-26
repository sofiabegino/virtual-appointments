"use strict";
// import { faker } from '@faker-js/faker';
// import boom from '@hapi/boom';
// import bcrypt from "bcryptjs";
// import { IUpdateUser, IUser, ISubmission } from '../interfaces';
// import { generateToken } from '../utils';
// import { getConnection } from '../libs/postgres';
// import {sequelize} from '../libs/sequelize';
// export class SubmissionService {
//   submissions:ISubmission[];
//   constructor(){
//     this.submissions = [];
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
//   async create(submisison:ISubmission) {
//     const newSubmission = {
//       _id: faker.datatype.uuid(),
//       title: submisison.title,
//       symptoms: submisison.symptoms,
//       status: 'pending'
//     }
//     this.submissions.push(newSubmission);
//     return {
//       ...newSubmission,
//     };
//   }
//   async find() {
//     const query = 'SELECT * FROM submissions';
//     const [data] = await sequelize.query(query);
//     return data;
//   }
//   async findOne(id:string) {
//     const user = this.submissions.find(user => user._id === id);
//     if (!user) {
//       throw boom.notFound('user not found');
//     }
//     return user;
//   }
//   async update(id:string, modifiedUser:IUpdateUser) {
//     const index = this.submissions.findIndex(user => user._id === id);
//     if (index === -1) {
//       throw boom.notFound('product not found');
//     }
//     const product = this.submissions[index];
//     this.submissions[index] = {
//       ...product,
//       ...modifiedUser
//     };
//     return this.submissions[index];
//   }
//   async delete(id:string) {
//     const index = this.submissions.findIndex(user => user._id === id);
//     if (index === -1) {
//       throw boom.notFound('user not found');
//     }
//     this.submissions.splice(index, 1);
//     return { id };
//   }
// }
