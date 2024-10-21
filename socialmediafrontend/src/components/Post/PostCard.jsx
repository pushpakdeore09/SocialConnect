import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const PostCard = (item) => {
  return (
    <Card className=''>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName+" "+item.user.lastName}
        subheader={"@"+item.user.firstName.toLowerCase()+"_"+item.user.lastName.toLowerCase()}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://cdn.pixabay.com/photo/2024/02/23/08/27/apple-8591539_640.jpg" 
        alt="Paella dish"
      />
       <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between' disableSpacing>
        <div >
            <IconButton>
                {true?<FavoriteIcon/>:<FavoriteBorderIcon/>}
            </IconButton>
            <IconButton>
                {<ShareIcon/>}
            </IconButton>
            <IconButton>
                {<ChatBubbleIcon/>}
            </IconButton>
        </div>
        <div>
            <IconButton>
            {true?<BookmarkIcon/>:<BookmarkBorderIcon/>}
            </IconButton>
        </div>
      </CardActions>
    </Card>
  )
}

export default PostCard
