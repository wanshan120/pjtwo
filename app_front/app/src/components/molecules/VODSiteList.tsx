import { FC } from 'react';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// icon
import AmazonPrimeVideo from 'data/images/icons/AmazonPrimeVideo.jpg';
import netflix from 'data/images/icons/netflix.png';
import unext from 'data/images/icons/unext.png';
import hulu from 'data/images/icons/hulu.png';

const VODSiteList: FC = () => (
  <List
    sx={{
      margin: '1px',
      width: 'calc(100% - 2px)',
      height: 'calc(100% - 2px)',
      bgcolor: 'background.paper',
    }}
  >
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Cindy Baker" src={AmazonPrimeVideo} />
      </ListItemAvatar>
      <ListItemText
        primary="Amazon Prime Video"
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
            noWrap
          >
            会員見放題
          </Typography>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src={netflix} />
      </ListItemAvatar>
      <ListItemText
        primary="NETFLIX"
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
              noWrap
            >
              300円
            </Typography>
            {' - レンタル'}
          </>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Cindy Baker" src={unext} />
      </ListItemAvatar>
      <ListItemText
        primary="U-NEXT"
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
              noWrap
            >
              400円
            </Typography>
            {' - 購入'}
          </>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="huku" src={hulu} />
      </ListItemAvatar>
      <ListItemText
        primary="fulu"
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
              noWrap
            >
              600円
            </Typography>
            {' - 購入'}
          </>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="huku" src={hulu} />
      </ListItemAvatar>
      <ListItemText
        primary="fulu"
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
              noWrap
            >
              600円
            </Typography>
            {' - 購入'}
          </>
        }
      />
    </ListItem>
  </List>
);

export default VODSiteList;
