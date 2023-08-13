import * as React from 'react';
import { FC } from 'react';

import { IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

const BookmarkButton: FC<{ disabled: boolean; size: number }> = ({ disabled, size }) => {
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
          <BookmarkIcon sx={{ fontSize: size }} />
        </IconButton>
      ) : (
        <IconButton disabled={disabled} aria-label="add to bookmark" onClick={handleClick}>
          <BookmarkAddOutlinedIcon sx={{ fontSize: size }} />
        </IconButton>
      )}
    </div>
  );
};
export default BookmarkButton;
