import { FC } from 'react';
import Typography from '@mui/material/Typography';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import AspectRatioBlock from 'components/block/AspectRatioBlock';
import AspectRatioImage from 'components/elements/AspectRatioImage';
import { Movie } from 'models/movie';

const ImageComponent: FC<{ images: Movie['images'] }> = ({ images }) => {
  const mainImage = images?.find(({ isMain }) => isMain);

  return (
    <AspectRatioBlock sx={{ width: '22%' }}>
      {images?.length && mainImage ? (
        <AspectRatioImage src={mainImage?.path} alt={mainImage?.title} loading="lazy" />
      ) : (
        <Card sx={{ height: '100%' }}>
          <CardActionArea sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AddPhotoAlternateIcon sx={{ fontSize: 70 }} />
              <Typography gutterBottom variant="h5" component="div">
                メイン画像がありません
              </Typography>
              <Typography variant="body2" color="text.secondary">
                作品のメイン画像を追加できます
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </AspectRatioBlock>
  );
};

export default ImageComponent;
