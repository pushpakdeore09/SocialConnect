import { Avatar } from '@mui/material' 
import React from 'react'

const StoryCircle = () => {
  return (
    <div>
      <div
          className="flex
          flex-col
          items-center
          mr-4
          cursor-pointer"
        >
          <Avatar src='https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww' sx={{ width: "5rem", height: "5rem" }}>
          </Avatar>
          <p>socialmedia</p>
        </div>
    </div>
  )
}

export default StoryCircle
