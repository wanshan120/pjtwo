import { FC } from 'react';

import * as React from 'react';
import Button from '@mui/material/Button';

const ShowMoreText: FC<{ text: string; minTextSize: number }> = ({ text, minTextSize }) => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <>
      {showMore ? text : `${text.substring(0, minTextSize)} ...`}
      <Button
        color="secondary"
        sx={{ p: 0, m: 0 }}
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        {showMore ? '閉じる' : 'さらに表示'}
      </Button>
    </>
  );
};

export default ShowMoreText;
