import * as yup from 'yup'

const id = yup.number();
const title = yup.string();
const file = yup.string()
const status = yup.mixed().oneOf(['Pending', 'In progress','Done'])
const symptoms = yup.string()
const doctorAssigned = yup.number()

export const createSubmissionSchema = yup.object({
    title: title.required(),
    symptoms: symptoms.required(),
})

export const updateSubmissionSchema = yup.object({
  title: title,
  file: file,
  status: status,
  symptoms: symptoms,
  doctorAssigned: doctorAssigned,
});

export const getSubmissionSchema = yup.object({
  id: id.required(),
});
