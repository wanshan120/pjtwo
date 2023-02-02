/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { Link } from 'react-router-dom';

// JSX
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

// icon
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

// compornents
import AppBar from 'components/toolbar/AppBar';
import MiniDrawer from 'components/toolbar/MiniDrawer';
import drawerWidth from 'components/elements/DrawerWidth';
import SearchModal from 'components/modal/SearchModal';
import ListItemWithButton from 'components/elements/ListItemWithButton';
// import ListItemWithButtonToMyList from 'components/atoms/ListItemWithButtonToMylist';
import StyledListItemIcon from 'components/elements/StyledListItemIcon';
import LogoutButton from 'features/menu/components/LogoutButton';

// data
import { urlPatterns } from 'urlPatterns';

// login
import { useStateContext } from 'context';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const ResponsiveMenuBar = (props: Props) => {
  const { window } = props;

  // toggle Drawer
  const [open, setOpen] = React.useState(true);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('mobile'));

  // メニューの開閉状態を画面サイズで制御する
  React.useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isMobile]);

  // login
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const drawer = (
    <>
      <Toolbar />
      {!user && (
        <List>
          {/* 会員登録 */}
          <ListItemWithButton open={open} url={urlPatterns.signUp.path}>
            <StyledListItemIcon open={open}>
              <PersonAddIcon />
            </StyledListItemIcon>
            <ListItemText primary={urlPatterns.signUp.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemWithButton>
          {/* ログイン */}
          <ListItemWithButton open={open} url={urlPatterns.login.path}>
            <StyledListItemIcon open={open}>
              <LoginIcon />
            </StyledListItemIcon>
            <ListItemText primary={urlPatterns.login.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemWithButton>
        </List>
      )}
      {user && (
        <>
          <List>
            {/* ホーム */}
            <ListItemWithButton open={open} url={urlPatterns.home.path}>
              <StyledListItemIcon open={open}>
                <HomeIcon />
              </StyledListItemIcon>
              <ListItemText primary={urlPatterns.home.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemWithButton>
            {/* マイリスト */}
            <ListItemWithButton open={open} url={urlPatterns.myList.path}>
              <StyledListItemIcon open={open}>
                <FormatListBulletedIcon />
              </StyledListItemIcon>
              <ListItemText primary={urlPatterns.myList.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemWithButton>
            {/* 後で見る */}
            <ListItemWithButton open={open} url={urlPatterns.watchlist.path}>
              <StyledListItemIcon open={open}>
                <BookmarkBorderOutlinedIcon />
              </StyledListItemIcon>
              <ListItemText primary={urlPatterns.watchlist.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemWithButton>
            {/* 通知 */}
            <ListItemWithButton open={open} url={urlPatterns.notice.path}>
              <StyledListItemIcon open={open}>
                <NotificationsActiveIcon />
              </StyledListItemIcon>
              <ListItemText primary={urlPatterns.notice.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemWithButton>
            {/* メッセージ */}
            <ListItemWithButton open={open} url={urlPatterns.message.path}>
              <StyledListItemIcon open={open}>
                <MailIcon />
              </StyledListItemIcon>
              <ListItemText primary={urlPatterns.message.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemWithButton>
          </List>
          <Divider />
          <List>
            {/* プロフィール */}
            <ListItemWithButton open={open} url={urlPatterns.profile.path}>
              <StyledListItemIcon open={open}>
                <PermIdentityIcon />
              </StyledListItemIcon>
              <ListItemText primary={urlPatterns.profile.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemWithButton>
            {/* 設定 */}
            <ListItemWithButton open={open} url={urlPatterns.settings.path}>
              <StyledListItemIcon open={open}>
                <SettingsIcon />
              </StyledListItemIcon>
              <ListItemText primary={urlPatterns.settings.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemWithButton>
            {/* ログアウト */}
            <LogoutButton open />
          </List>
        </>
      )}
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              padding: 1.5,
              // ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {isMobile ? `isMobile` : `isTablet`}
          </Typography>
          <SearchModal />
        </Toolbar>
      </AppBar>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {isMobile ? (
        <MuiDrawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: 'block',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </MuiDrawer>
      ) : (
        <MiniDrawer variant="permanent" open={open}>
          {drawer}
        </MiniDrawer>
      )}
    </>
  );
};

export default ResponsiveMenuBar;
