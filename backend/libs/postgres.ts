import {Client} from 'pg';


export async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'sofi',
    password: 'sofi123',
    database: 'virtual_appointments'
  });
  await client.connect();
  return client;
}