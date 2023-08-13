import { styled } from '@mui/material/styles';

type InputProps = {
  aspectratio?: string;
};

const AspectRatioBlock = styled('div')<InputProps>(({ aspectratio }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: aspectratio,
  },
}));

export default AspectRatioBlock;
