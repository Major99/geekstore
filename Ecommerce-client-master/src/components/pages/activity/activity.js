import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '../../core/layout'
import 'antd/dist/antd.css'
import React, { useState, useEffect } from 'react';
import {  Divider } from 'antd';
import { getAllActivity } from '../../../actions/activity'
import './activity.css';
import moment from 'moment'


const Home  = () => {

const [activity, setActivities] = useState([]);

  useEffect(() => {
    allActivities()
  },[])

  const allActivities = () => {
    getAllActivity()
    .then(res => setActivities(res))
    .catch(err => console.log(err))
  }

  const showActivities = () => {
    return activity.map((item,i) => {
      return <div key={i} className='activity-container mb-2'>
                <div className='row col container-fluid'>
                     <div className='activity-message col-md-8'>{item.message}</div>
                     <div className='activity-time float-right col-md-4'>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </div>

             </div>
    })
  }

  return  <React.Fragment>
            <Layout >
               <div className='container'>
              <Divider orientation="left"><h1>Activity</h1></Divider>
                {showActivities()}
              </div>
            </Layout>
          </React.Fragment>
}

export default Home;
