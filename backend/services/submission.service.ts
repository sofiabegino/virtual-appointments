import boom from '@hapi/boom';
import { Submission, SubmissionSchema, User } from '../db/models';
import { ISubmission } from '../interfaces';
import  models from './../libs/sequelize';
import { IUpdateSubmission } from '../interfaces/ISubmission';
import { Op } from 'sequelize';

export class SubmissionService {
  constructor(){
    SubmissionSchema(models)
    Submission.associate()
  }

  async create(submission:ISubmission,userId:number) {
    const newSubmission = {
      title: submission.title,
      symptoms: submission.symptoms,
      status: 'Pending',
      userId: userId,
    }
    const createdSubmission = Submission.create(newSubmission);
    return createdSubmission
  }

  async find() {
    // sendMail();
    const submissions = await Submission.findAll({include: [{model: User, as: "user"},
    { model: User, as: "doctor"}]});
    return submissions;
  }

  async findPending(){
    const submissions = await Submission.findAll({
      where: {
        status:'Pending'
      },
      include: [{model: User, as: "user"}],
    });
    return submissions;
  }

  async findTaskHistory(id:number){
    const submissions = await Submission.findAll({
      where: {
        [Op.not]: [{ status:'Pending' }],
        doctorId: id
      },
      include: [{model: User, as: "user"},
      { model: User, as: "doctor", attributes: ['name']}]
    });
    return submissions;
  }


  async findIds() {
    const submissions = (await Submission.findAll({attributes: ['id'],raw:true}));
    if (!submissions) {
      throw boom.notFound('there are no submissions');
    }
    return submissions;
  }

  async findPatientSubmissions(id:number) {
    const submissions = (await Submission.findAll({where: {userId:id},
      include: [{model: User, as: "user"},
      { model: User, as: "doctor"}]}));
    if (!submissions) {
      throw boom.notFound('there are no submissions');
    }
    return submissions;
  }

  async findOne(id:string) {
    const submission = await Submission.findByPk(id,{include: [{model: User, as: "user",attributes: {
      exclude: ['password']
    }},
    { model: User, as: "doctor", attributes: ['name']}]});
    if (!submission) {
      throw boom.notFound('submission not found');
    }
    return submission;
  }

  async update(id:string, modifiedSubmission:IUpdateSubmission) {
    const submission = await Submission.findByPk(id);
    if (submission === null) {
      throw boom.notFound('submission not found');
    }
    submission.set({
    ...submission,
    ...modifiedSubmission
    })
    await submission.save();
    return submission;
  }

  async delete(id:string) {
    const submission = await Submission.findByPk(id);
    if (submission === null) {
      throw boom.notFound('user not found');
    }
    await submission.destroy();
    return { id };
  }

}
