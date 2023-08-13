import { FC } from 'react';
import Typography from '@mui/material/Typography';

import YouTubeIcon from '@mui/icons-material/YouTube';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import YoutubeIframe from 'components/elements/YoutubeIframe';
import AspectRatioBlock from 'components/block/AspectRatioBlock';

import { Movie } from 'models/movie';

const PvComponent: FC<{ pvs: Movie['pvs'] }> = ({ pvs }) => {
  const mainMovie = pvs?.find(({ isMain }) => isMain);

  return (
    <AspectRatioBlock aspectratio="56.25%" sx={{ width: '73%', marginLeft: 1 }}>
      {pvs?.length && mainMovie ? (
        <YoutubeIframe
          src={mainMovie.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <Card
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            width: '100%',
          }}
        >
          <CardActionArea sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <YouTubeIcon sx={{ fontSize: 70 }} />
              <Typography gutterBottom variant="h5" component="div">
                登録されている動画がありません
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yotubeに投稿されているPV動画を追加できます
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </AspectRatioBlock>
  );
};

export default PvComponent;
