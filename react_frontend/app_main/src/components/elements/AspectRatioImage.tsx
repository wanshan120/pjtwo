import { styled } from '@mui/material/styles';

const AspectRatioImage = styled('img')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: '100%',
  width: '100%',
}));

export default AspectRatioImage;
