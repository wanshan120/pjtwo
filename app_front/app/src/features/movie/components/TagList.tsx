import { FC } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Movie } from 'models/movie';
import TagKeys from 'data/tagKeysType';

import Grid from '@mui/material/Grid';

const TagList: FC<{ tags: Movie['keywordTags']; subHeader: string }> = ({ tags, subHeader }) => (
  <Paper
    variant="outlined"
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      listStyle: 'none',
      padding: 2,
    }}
  >
    <Typography
      variant="h4"
      paragraph
      sx={{
        fontSize: '1rem',
        color: 'text.secondary',
        fontWeight: 'bold',
      }}
    >
      {subHeader}
    </Typography>
    <Grid container spacing={1}>
      {tags?.map((tag) => (
        <Grid container item key={tag.id}>
          <Grid item tablet={4} sx={{ textAlign: 'right' }}>
            <Typography
              variant="h4"
              sx={{ fontSize: '0.9rem', color: 'text.secondary', paddingRight: 3 }}
            >
              {TagKeys[tag.id]}
            </Typography>
          </Grid>
          <Grid item tablet={8}>
            {tag.tags?.map((t) => (
              <Typography key={t.name} paragraph margin={0} sx={{ fontSize: '0.9rem' }}>
                {t.name}
              </Typography>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Paper>
);
export default TagList;
