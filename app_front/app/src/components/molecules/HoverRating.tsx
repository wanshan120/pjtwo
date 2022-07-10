import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

const labels: { [index: string]: string } = {
  1: 'R.I.P.',
  2: 'D+',
  3: 'C',
  4: 'C+',
  5: 'B 普通',
  6: 'B+',
  7: 'A',
  8: 'A+',
  9: 'S',
  10: 'S+ God Tier',
};

const getLabelText = (value: number) => `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;

const HoverRating = () => {
  const [value, setValue] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        max={10}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarBorderRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  );
};
export default HoverRating;
