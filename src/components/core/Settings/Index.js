import React from 'react'
import Changeprofile from './Changeprofile'
import Updateuserprofile from './Updateuserprofile'
import ChangePasswordForm from './Changepassword'
import DeleteAccount from './Deleteaccount'
const Index = () => {
  return (
    <div>

        <h1> Edit Profile</h1>

        <Changeprofile/>

        <Updateuserprofile/>

        <ChangePasswordForm/>

        <DeleteAccount/>
      
    </div>
  )
}

export default Index
