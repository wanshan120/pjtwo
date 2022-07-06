import { styled } from '@mui/material/styles';

import Chip, { ChipProps } from '@mui/material/Chip';

const ChipTag = styled(Chip)<ChipProps>(() => ({
  borderRadius: '4px',
}));

export default ChipTag;
