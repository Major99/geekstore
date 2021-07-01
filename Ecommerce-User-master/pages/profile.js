import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../components/layout/layout'
import UserProfile from '../components/profile/profile'



const Profile = () => {


  return <Fragment>
          <Layout>
           <div className="profile-page-container">
              <div className="row col justify-content-center">
                <div className="col-md-4 card p-3">
                  <UserProfile />
                </div>
              </div>
           </div>
          </Layout>
        </Fragment>
}



export default Profile;
