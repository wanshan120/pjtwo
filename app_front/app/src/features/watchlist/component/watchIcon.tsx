import * as React from 'react';
import { FC } from 'react';
import { IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import useAddWatchlist from '../hooks/use-add-watchlist';
import useDelWatchlist from '../hooks/use-del-watchlist';
import useFindoneWatchlist from '../hooks/use-findone-watchlist';

const WatchIcon: FC<{ productId: string; size: number }> = ({ productId, size }) => {
  const { data } = useFindoneWatchlist(productId);

  const { onDeleteHandler, isLoading: delLoaging } = useDelWatchlist(productId);
  const { onCreateHandler, isLoading: addLoaging } = useAddWatchlist(productId);

  const handleDelete = () => {
    onDeleteHandler();
  };
  const handleCreate = () => {
    onCreateHandler();
  };

  const iconButton = (
    <div>
      {data ? (
        <IconButton color="primary" aria-label="add to bookmark" onClick={handleDelete}>
          <BookmarkIcon sx={{ fontSize: size }} />
        </IconButton>
      ) : (
        <IconButton aria-label="add to bookmark" onClick={handleCreate}>
          <BookmarkAddOutlinedIcon sx={{ fontSize: size }} />
        </IconButton>
      )}
    </div>
  );

  // ローディング中に先行してボタンを切り替え
  if (delLoaging) {
    return iconButton;
  }

  if (addLoaging) {
    return iconButton;
  }

  return iconButton;
};

export default WatchIcon;
