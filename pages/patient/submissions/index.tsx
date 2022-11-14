import { Fragment, useState } from 'react'
import { PatientLayout } from '../../../components/layouts';
import { Table } from '../../../components/ui/Table';
import Select from 'react-select';

const all_submissions = [
    { title: 'Hepatic infarction', name: '', date: '3/4/16', status: 'Pending' },
    { title: 'Reye syndrome', name: '', date: '1/15/12', status: 'Pending' },
    { title: 'Hepatic infarction', name: '', date: '3/4/16', status: 'Pending' },
    { title: 'Reye syndrome', name: '', date: '1/15/12', status: 'Pending' },
    { title: 'Hepatic infarction', name: 'Theresa Webb', date: '3/4/16', status: 'In progress' },
    { title: 'Reye syndrome', name: 'Eleanor Pena', date: '1/15/12', status: 'In progress' },
    { title: 'Hepatic infarction', name: 'Theresa Webb', date: '3/4/16', status: 'Done' },
    { title: 'Reye syndrome', name: 'Eleanor Pena', date: '1/15/12', status: 'Done' },
]

const columns = ['Submission title', 'Doctor assigned', 'Created at', 'Status']

const Submissions = () => {

  const [selectedOption,setSelectedOption] = useState('all_submissions')
  const [submissions,setSubmissions] = useState(all_submissions)
  
  const filterSubmissions = (value:string) => {
    setSelectedOption(value);
    let filtered_submissions = all_submissions.filter((e)=>e.status==value);
    value != "All submissions" ? setSubmissions(filtered_submissions) : setSubmissions(all_submissions)
  }

    return (
        <PatientLayout title="submissions" pageDescription='pag de submissions'>
            <div className='px-8 flex justify-end'>
                <select
                    id="location"
                    name="location"
                    className="mt-1 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="All submissions"
                    onChange={(event)=>filterSubmissions(event.target.value)}
                    value={selectedOption}
                >
                    <option value='All submissions'>All submissions</option>
                    <option value='Pending'>Pending</option>
                    <option value='In progress'>In progress</option>
                    <option value='Done'>Done</option>
                </select>
            </div>
            <Table columns={columns} data={submissions} type='patient' />
        </PatientLayout>
    )
}

export default Submissions