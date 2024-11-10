import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import { red } from '@mui/material/colors';

const PopularUser = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <Button size='small'>
            Follow
          </Button>
        }
        title="SocialConnect"
        subheader="@socialconnect"
      />
    </div>
  )
}

export default PopularUser
