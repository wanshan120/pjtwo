import { FC } from 'react';

import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material/';

import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 180;

const styles = {
  customizeToolbar: {
    minHeight: 42,
    display: 'flex',
  },
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('mobile')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('mobile')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const BaseMenuBar: FC = () => (
  <Box sx={{ display: 'flex' }}>
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar style={styles.customizeToolbar}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { mobile: 'none', desktop: 'block' } }}
        >
          MUI
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
      </Toolbar>
    </AppBar>
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
      <Toolbar style={styles.customizeToolbar}>
        <Typography variant="h6" noWrap component="div">
          PJ Two
        </Typography>
      </Toolbar>
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

export default BaseMenuBar;
