import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';

// icon
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';

const actions = [
  { icon: <EditOutlinedIcon />, name: 'レビューを書く' },
  { icon: <ShareIcon />, name: 'SNSで共有' },
  { icon: <QuestionMarkOutlinedIcon />, name: 'ヘルプ' },
  { icon: <ReportGmailerrorredOutlinedIcon />, name: 'ページ内不具合報告' },
];

const DetailFAB = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        height: 330,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onClick={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default DetailFAB;
