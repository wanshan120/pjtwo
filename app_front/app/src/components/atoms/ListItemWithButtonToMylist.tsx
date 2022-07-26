import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode;
  open?: boolean | null;
  url: string;
}

const ListItemWithButtonToMyList: React.FC<Props> = ({ open, children, url }) => {
  const [openListItem, setOpenListItem] = React.useState(true);

  const handleClick = () => {
    setOpenListItem(!openListItem);
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        component={Link}
        to={url}
        onClick={handleClick}
      >
        {children}
      </ListItemButton>
      <Collapse in={openListItem} timeout="auto" unmountOnExit>
        <List>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon>
              <BookmarkBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="後で見る" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Collapse>
    </ListItem>
  );
};

export default ListItemWithButtonToMyList;
