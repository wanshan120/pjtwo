import { FC } from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Card, CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import ShowMoreText from 'components/elements/ShowMoreText';

import { Movie } from 'models/movie';

const Summary: FC<{ summary: Movie['summary'] }> = ({ summary }) => (
  <div>
    {summary ? (
      <Paper variant="outlined" sx={{ padding: 2 }}>
        <Typography
          variant="h4"
          display="inline"
          sx={{
            fontSize: '1rem',
            color: 'text.secondary',
            fontWeight: 'bold',
          }}
        >
          あらすじ
        </Typography>
        <Typography paragraph sx={{ fontSize: '0.9rem', marginTop: 1, marginBottom: 0 }}>
          <ShowMoreText text={summary} minTextSize={200} />
        </Typography>
      </Paper>
    ) : (
      <Card>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6" component="div">
              登録されているあらすじがありません
            </Typography>
            <Typography variant="body2" color="text.secondary">
              あらすじを追加できます
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )}
  </div>
);

export default Summary;
