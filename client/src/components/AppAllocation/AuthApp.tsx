import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login, SignUp } from '../componentContainer'

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="*" element={<Login />}></Route>
    </Routes>
  )
}

export default AuthApp
