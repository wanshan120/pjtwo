import { styled } from '@mui/material/styles';

type InputProps = {
  aspectRatio?: string;
};

const AspectRatioBlock = styled('div')<InputProps>(({ aspectRatio }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: aspectRatio,
  },
}));

export default AspectRatioBlock;
