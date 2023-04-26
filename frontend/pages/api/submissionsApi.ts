import axios from 'axios'
import { ISubmission, IUpdateSubmission } from '../../../backend/interfaces/ISubmission';
import api from './api';


export const createSubmission = async (submission: ISubmission) => {
    const response = await api.post('/submissions', submission)
    return response
}

export const getSubmission = async (id: string) => {
  const response = await api.get(`/submissions/${id}`)
  return response
}

export const getAll = async () => {
  const response = await (await api.get(`/submissions`)).data
  return response
}

export const getPending = async () => {
  const response = await api.get(`/submissions/pending`)
  return response
}

export const getTaskHistory = async () => {
  const response = await api.get(`/submissions/task-history`)
  return response
}

export const create = async (submission:ISubmission) => {
  const response = await api.post(`/submissions`,submission)
  return response
}

export const submissionDoctor = async (submission:IUpdateSubmission) => {
  const response = await api.patch(`/submissions/${submission.id}`,submission)
  return response
}
