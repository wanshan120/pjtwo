import { styled } from '@mui/material/styles';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';

const StyledToolbar = styled(Toolbar)<ToolbarProps>(() => ({
  minHeight: 46,
  display: 'flex',
}));

export default StyledToolbar;
