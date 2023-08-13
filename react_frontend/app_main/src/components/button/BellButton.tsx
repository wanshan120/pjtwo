import * as React from 'react';
import { FC } from 'react';

import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';

const BellButton: FC<{ disabled: boolean; size: number }> = ({ disabled, size }) => {
  const [activeBtn, setActiveBtn] = React.useState(false);
  const handleClick = () => {
    setActiveBtn(!activeBtn);
  };

  return (
    <div>
      {activeBtn ? (
        <IconButton
          disabled={disabled}
          color="primary"
          aria-label="add to bookmark"
          onClick={handleClick}
        >
          <NotificationsIcon sx={{ fontSize: size }} />
        </IconButton>
      ) : (
        <IconButton disabled={disabled} aria-label="add to Notification" onClick={handleClick}>
          <NotificationAddOutlinedIcon sx={{ fontSize: size }} />
        </IconButton>
      )}
    </div>
  );
};
export default BellButton;
