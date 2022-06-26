import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import StyledToolbar from 'components/molecules/ToolBar';
import Typography from '@mui/material/Typography';

// import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 200;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const ResponsiveDrawer = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <StyledToolbar />
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
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { tablet: `calc(100% - ${drawerWidth}px)` },
          ml: { tablet: `${drawerWidth}px` },
        }}
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { tablet: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </StyledToolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { tablet: drawerWidth }, flexShrink: { tablet: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { mobile: 'block', tablet: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { mobile: 'none', tablet: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            tablet: `calc(100% - ${drawerWidth}px)`,
          },
          minWidth: { tablet: `calc(100% - ${drawerWidth}px)` },
          overflow: 'auto',
        }}
      >
        <StyledToolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
