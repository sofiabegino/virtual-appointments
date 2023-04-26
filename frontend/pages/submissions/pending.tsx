import { useQuery } from 'react-query';
import { ISubmission } from '../../../backend/interfaces/ISubmission';
import { Table } from '../../components/ui/Table';
import { getPending } from '../api/submissionsApi';
import { Layout } from '../../components/layouts/Layout';

const columns = ['Submission title','Patient name','Created at','Status']

function getPendingSubmissions (): ({
    data: ISubmission[]
    isLoading: boolean
  }) {
    const {
      data: submissions,
      isLoading
    } = useQuery(['getPendingSubmissions'], async () => await getPending())
  
    const data = submissions?.data ?? []
  
    return {
      data,
      isLoading
    }
}

const Submissions  = () => {

    const {
        data: pendingSubmissions,
    } = getPendingSubmissions()
    
    return (
        <Layout title="Pending submissions" pageDescription='Pending submissions'>
            <Table columns={columns} data={pendingSubmissions}/>
        </Layout>
    )
}

export default Submissions