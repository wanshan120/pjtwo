import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 180;

const SideMenuBar: FC = () => (
  <Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    aria-label="mailbox folders"
  >
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="ホーム" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="マイリスト" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="通知" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="メッセージ" />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <PermIdentityIcon />
            </ListItemIcon>
            <ListItemText primary="プロフィール" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="設定" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="ログアウト" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  </Box>
);

export default SideMenuBar;
