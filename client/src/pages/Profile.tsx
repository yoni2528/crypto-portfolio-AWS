import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import useDatabseRequest from '../apiHooks/useDatabseRequest'
import UploadImageInput from '../components/UploadImageInput/UploadImageInput'
import ProfileCardsContainer from '../components/ProfileCard/ProfileCardsContainer'

import { IoCameraOutline } from 'react-icons/io5'
import Spinner from '../components/Spinner/Spinner'
import { BASE_URL } from '../config/static'
const Profile = () => {
  const { handleGetUserDetails } = useDatabseRequest()
  const [imagePatch, setImagePath] = useState<string>('')
  const [userDetails, setUserDetails] = useState<any>({
    firstName: '',
    lastName: '',
    id: '',
    email: '',
  })

  useEffect(() => {
    handleUpdateImage()
  }, [])

  const handleUpdateImage = async () => {
    const data = await handleGetUserDetails()
    if (data.data.image === imagePatch) return
    setImagePath(data.data.image)
    setUserDetails({
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      id: data.data._id,
      email: data.data.email,
    })
  }

  const handleNewUserDetails = (userDetails: object) => {
    setUserDetails(userDetails)
  }
  const handleNewImage = (newImagePath: string) => {
    setImagePath(newImagePath)
  }

  return (
    <div className={styles['profile-overlay']}>
      <div className={styles['block-photo']}>
        <div className={styles['inner-block-photo']}>
          <div>
            {imagePatch ? (
              <div
                className={styles['image-box']}
                style={{
                  backgroundImage: `url(${BASE_URL}${
                    imagePatch === 'default.png'
                      ? 'default.png'
                      : `${userDetails.email}/${imagePatch}`
                  })`,
                }}
              >
                <IoCameraOutline className={styles['change-image-icon']} />
                <UploadImageInput onChange={handleNewImage} />
              </div>
            ) : (
              <Spinner />
            )}
          </div>
          <div className={styles['inner-details']}>
            <h2 className={styles['user-details']}>
              {userDetails.firstName}
              <span> </span>
              {userDetails.lastName}
            </h2>
            <p>{userDetails.email}</p>
          </div>
        </div>
      </div>
      <div className={styles['block-details']}>
        <ProfileCardsContainer onNewUserDeatils={handleNewUserDetails} />
      </div>
    </div>
  )
}

export default Profile
