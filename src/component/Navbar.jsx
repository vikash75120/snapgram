import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeMaxOutlinedIcon from '@mui/icons-material/HomeMaxOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { grey } from '@mui/material/colors';

const Navbar = () => {

  const NavbarItems = [
    {
      text: 'Home',
      icon: <HomeMaxOutlinedIcon sx={{ color: grey[50] }} />
    },
    {
      text: 'Explore',
      icon: <TravelExploreOutlinedIcon sx={{ color: grey[50] }} />
    },
    {
      text: 'People',
      icon: <PeopleOutlinedIcon sx={{ color: grey[50] }} />
    },
    {
      text: 'Saved',
      icon: <BookmarkBorderOutlinedIcon sx={{ color: grey[50] }} />
    },
    {
      text: 'Create Post',
      icon: <NoteAddOutlinedIcon sx={{ color: grey[50] }} />
    }
  ]
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {NavbarItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: grey[50] }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Navbar
