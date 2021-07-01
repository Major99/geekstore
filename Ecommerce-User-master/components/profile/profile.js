import React, { Fragment, useState, useEffect } from 'react';
import { Input } from 'antd';
import Button from '@material-ui/core/Button';
import { updateProfile,userProfile,getCookie, isAuth } from '../../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
const { TextArea } = Input;

const Profile = () => {
  const token = getCookie('token');
  const userId = isAuth() && isAuth()._id

 var [values, setValues] = useState({
   name: '',
   flatNumber: '',
   streetName: '',
   city: '',
   pinCode: '',
   email: '',
   _id: ''
 })

useEffect(() => {
   userProfile(userId, token)
    .then((value) => {
    setValues({...values, name: value.name, email:value.email, flatNumber: value.address.flatNumber,streetName:value.address.streetName,city:value.address.city, pinCode:value.address.pinCode, _id: value._id})
    })
    .catch((err) => {console.log(err)})
 },[])

  const { name, email, flatNumber,streetName,city,pinCode, _id } = values

  const updateUserInfo = () => {
    updateProfile({userId:  _id, name: name, flatNumber, streetName, city, pinCode}, token)
        .then(res => toast.success(res.message))
        .catch(err => toast.error(err.error))
  }


  return <Fragment>
              <ToastContainer />
              <div className="text-center">
              <h1>
              Profile
              </h1>
              </div>
             <div>
              <small>Name</small>
               <Input
               variant="outlined"
               fullWidth
               size="large"
               value={name}
               className="profile-input"
               onChange={(e) => {
                 setValues({...values, name: e.target.value})
               }} />


               <small>Flat no.</small>
                <TextArea
                rows={1}
                fullWidth
                size="large"
                value={flatNumber}
                className="profile-input"
                onChange={(e) => {
                   setValues({...values, flatNumber: e.target.value})
                }} />


                <small>street name</small>
                 <TextArea
                 rows={1}
                 fullWidth
                 size="large"
                 value={streetName}
                 className="profile-input"
                 onChange={(e) => {
                    setValues({...values,streetName: e.target.value})
                 }} />


                 <small>city</small>
                  <TextArea
                  rows={1}
                  fullWidth
                  size="large"
                  value={city}
                  className="profile-input"
                  onChange={(e) => {
                     setValues({...values, city: e.target.value})
                  }} />

                  <small>pincode</small>
                   <TextArea
                   rows={1}
                   fullWidth
                   size="large"
                   value={pinCode}
                   className="profile-input"
                   onChange={(e) => {
                      setValues({...values, pinCode: e.target.value})
                   }} />

             <small>Email</small>
               <Input
               variant="outlined"
               fullWidth
               disabled
               value={email}
               size="large"
               className="profile-input"
                 />

              <div className="text-center">
               <Button variant="contained" className="profile-btn" onClick={updateUserInfo}>
                  Update
               </Button>
              </div>
             </div>
         </Fragment>
}

export default Profile;
