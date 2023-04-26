import { useState, useEffect } from 'react';
import { Table } from '../../components/ui/Table';
import { getAll } from '../api/submissionsApi';
import { ISubmission } from '../../../backend/interfaces/ISubmission';
import { useQuery } from 'react-query';
import { Layout } from '../../components/layouts/Layout';

function getSubmissions(): ({
    data: ISubmission[]
    isLoading: boolean
}) {
    const {
        data: submissionData,
        isLoading
    } = useQuery(['getPatientSubmission'], async () => await getAll())

    const data = submissionData ?? null
    return {
        data,
        isLoading
    }
}

const columns = ['Submission title', 'Doctor assigned', 'Created at', 'Status']

const Submissions = () => {

    const {
        data: all_submissions,
    } = getSubmissions()

    const [selectedOption, setSelectedOption] = useState('all_submissions')
    const [submissions, setSubmissions] = useState(all_submissions)

    useEffect(() => {
        setSubmissions(all_submissions)
    }, [all_submissions])


    const filterSubmissions = (value: string) => {
        setSelectedOption(value);
        let filtered_submissions = all_submissions.filter((e) => e.status == value);
        value != "All submissions" ? setSubmissions(filtered_submissions) : setSubmissions(all_submissions)
    }

    return (
        <Layout title="Submissions" pageDescription='Submissions'>
            <div className='px-8 flex justify-end'>
                <select
                    id="location"
                    name="location"
                    className="mt-1 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="All submissions"
                    onChange={(event) => filterSubmissions(event.target.value)}
                    value={selectedOption}
                >
                    <option value='All submissions'>All submissions</option>
                    <option value='Pending'>Pending</option>
                    <option value='In progress'>In progress</option>
                    <option value='Done'>Done</option>
                </select>
            </div>
            <Table columns={columns} data={submissions} />
        </Layout>
    )
}


export default Submissions