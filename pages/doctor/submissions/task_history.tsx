import { Fragment, useState } from 'react'
import { DoctorLayout } from '../../../components/layouts';
import { Table } from '../../../components/ui/Table';

const submissions = [
    { title: 'Hepatic infarction', name: 'Theresa Webb', date: '3/4/16', status: 'In progress' },
    { title: 'Reye syndrome', name: 'Eleanor Pena', date: '1/15/12', status: 'In progress' },
    { title: 'Hepatic infarction', name: 'Theresa Webb', date: '3/4/16', status: 'In progress' },
    { title: 'Reye syndrome', name: 'Eleanor Pena', date: '1/15/12', status: 'In progress' },
    { title: 'Hepatic infarction', name: 'Theresa Webb', date: '3/4/16', status: 'In progress' },
    { title: 'Reye syndrome', name: 'Eleanor Pena', date: '1/15/12', status: 'In progress' },
    { title: 'Hepatic infarction', name: 'Theresa Webb', date: '3/4/16', status: 'Done' },
    { title: 'Reye syndrome', name: 'Eleanor Pena', date: '1/15/12', status: 'Done' },
]

const columns = ['Submission title','Patient name','Created at','Status']

const Submissions = () => {
    return (
        <DoctorLayout title="submissions" pageDescription='pag de submissions'>
            <Table columns={columns} data={submissions} type='doctor'/>
        </DoctorLayout>
    )
}

export default Submissions