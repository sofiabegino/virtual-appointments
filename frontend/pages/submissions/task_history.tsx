import { useQuery } from 'react-query';
import { ISubmission } from '../../../backend/interfaces/ISubmission';
import { Table } from '../../components/ui/Table';
import { getTaskHistory } from '../api/submissionsApi';
import { Layout } from '../../components/layouts/Layout';

const columns = ['Submission title','Patient name','Created at','Status']

function getHistory (): ({
    data: ISubmission[]
    isLoading: boolean
  }) {
    const {
      data: submissions,
      isLoading
    } = useQuery(['getTaskHistory'], async () => await getTaskHistory())
  
    const data = submissions?.data ?? []
  
    return {
      data,
      isLoading
    }
}

const Submissions = () => {

    const {
        data: taskHistory,
    } = getHistory ()

    return (
        <Layout title="Task history" pageDescription='Task history'>
            <Table columns={columns} data={taskHistory}/>
        </Layout>
    )
}


export default Submissions