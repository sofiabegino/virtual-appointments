import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PatientLayout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <PatientLayout title="pag inicial" pageDescription='pag inicial'>
      
      </PatientLayout>
  )
}

export default HomePage;
