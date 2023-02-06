import React from 'react'
import ProfileCard from './ProfileCard'
const ProfileCardsContainer: React.FC<{
  onNewUserDeatils: (userDetails: object) => void
}> = ({ onNewUserDeatils }) => {
  return (
    <>
      <ProfileCard
        cardDetails={{
          userUpdated: onNewUserDeatils,
          title: 'User details',
          subTitle: 'Change first and last name',
          btnText: 'Submit',
          btnCss: 'btn-main',
          form1: {
            id: 'first-name',
            placeholder: 'first Name',
            tpye: 'text',
            cssType: 'input-main',
          },
          form2: {
            id: 'last-name',
            placeholder: 'Last Name',
            tpye: 'text',
            cssType: 'input-main',
          },
        }}
      />
      <ProfileCard
        cardDetails={{
          title: 'Change Password',
          subTitle: 'Change you password easly',
          btnText: 'Reset',
          btnCss: 'btn-orange',
          form1: {
            id: 'password',
            placeholder: 'Current Passowrd',
            tpye: 'password',
            cssType: 'input-main',
          },
          form2: {
            id: 'new-password',
            placeholder: 'New Password',
            tpye: 'password',
            cssType: 'input-main',
          },
        }}
      />
    </>
  )
}

export default ProfileCardsContainer
