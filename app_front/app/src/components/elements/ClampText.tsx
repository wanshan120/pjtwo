import { FC, useState } from 'react';

import { useClampText } from 'use-clamp-text';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ClampText: FC<{ toggleText: string }> = ({ toggleText }) => {
  const [text] = useState(toggleText);

  const [expanded, setExpanded] = useState(false);
  const [ref, { noClamp, clampedText, key }] = useClampText({
    text,
    lines: 2,
    ellipsis: '...',
    expanded,
    charWidth: 10.5,
  });

  const toggleExpanded = () => setExpanded((state) => !state);

  return (
    <div className="ClampText">
      <Box ref={ref} key={key}>
        <Typography
          ref={ref}
          key={key}
          variant="body2"
          display="block"
          sx={{ wordBreak: 'break-word', fontSize: 12 }}
        >
          {clampedText}
          {!noClamp && (
            <Button color="secondary" style={{ marginRight: 10 }} onClick={toggleExpanded}>
              {expanded ? '閉じる' : 'もっと見る '}
            </Button>
          )}
        </Typography>
      </Box>
    </div>
  );
};

export default ClampText;
