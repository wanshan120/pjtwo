import { FC } from 'react';

// MUI
// import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ring1 from 'data/images/package/ring1.jpg';
import ring2 from 'data/images/package/ring2.jpg';
import ring3 from 'data/images/package/ring3.jpg';

const ContentCard: FC = () => (
  <Grid container direction="row" columnSpacing={1} sx={{ marginTop: 1 }}>
    <Grid item tablet={4} mobile={12}>
      <Card sx={{ maxWidth: '100%', display: 'inline-block' }}>
        <CardMedia component="img" alt="green iguana" height="200" image={ring1} loading="lazy" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item tablet={4} mobile={12}>
      <Card sx={{ maxWidth: '100%', display: 'inline-block' }}>
        <CardMedia component="img" alt="green iguana" height="200" image={ring2} loading="lazy" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item tablet={4} mobile={12}>
      <Card sx={{ maxWidth: '100%', display: 'inline-block' }}>
        <CardMedia component="img" alt="green iguana" height="200" image={ring3} loading="lazy" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

export default ContentCard;
