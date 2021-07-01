import React, { Fragment, useEffect, useState } from 'react';
import './users.css';
import { getAllUsers } from '../../../actions/user'
import Layout from '../../core/layout';
import { Divider } from 'antd';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import moment from 'moment'

const Users = () => {
  const [users, setUsers] = useState()

const allUsers = () => {
  getAllUsers()
     .then(res => {
        setUsers(res.result);
    })
    .catch(err => console.log(err))
}

    useEffect(() => {
      allUsers()
    }, [])

    const showUsers = () => {
      return  users && users.map( (item,i) => {
          return <Tr key={i}>
                      <Td>{item.role}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      <Td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Td>
                    </Tr>
        })
    }

  return <Fragment>
             <Layout>
              <div className='container text-center'>
                <Divider orientation="left"><h1>Users</h1></Divider>
                   <Table>
                 <Thead>
                   <Tr>
                     <Th>Role</Th>
                     <Th>Name</Th>
                     <Th>Email</Th>
                     <Th>Created at</Th>
                   </Tr>
                 </Thead>
                 <Tbody>
                    {showUsers()}
                 </Tbody>
             </Table>
             </div>
          </Layout>
         </Fragment>
}

export default Users;
