import { FC } from 'react';

// MUI
// import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import ListItem from '@mui/material/ListItem';

// itemdata
import { TagType, tagWithURL } from 'data/detailTag';
import { DetailTagJP } from 'data/detailTagJP';
// import { DetailTagJPData } from 'data/detailTagJP';

type TagKeyValue = {
  jpReadingKey: string;
  tagValue?: undefined | tagWithURL[];
};

type TagTypes = {
  jpReadingObjects: DetailTagJP;
  tagObjects: TagType;
};

const TagItemGrid: FC<TagKeyValue> = ({ jpReadingKey, tagValue }) => (
  <Grid container item>
    <Grid item tablet={3} sx={{ textAlign: 'right' }}>
      <Typography
        variant="h4"
        sx={{ fontSize: '0.9rem', color: 'text.secondary', paddingRight: 3 }}
      >
        {jpReadingKey}
      </Typography>
    </Grid>
    <Grid item tablet={9}>
      {tagValue?.map((tag) => (
        <Typography paragraph margin={0} sx={{ fontSize: '0.9rem' }}>
          {tag.name}
        </Typography>
      ))}
    </Grid>
  </Grid>
);

const DetailTagList: FC<TagTypes> = ({ jpReadingObjects, tagObjects }) => (
  <Paper variant="outlined">
    <Grid container spacing={1} sx={{ p: 2 }}>
      {Object.entries(jpReadingObjects).map((jpV) =>
        // ブラケット記法だと型anyでエラーになるため2重ループで対応
        Object.entries(tagObjects).map(
          (tagV) => jpV[0] === tagV[0] && <TagItemGrid jpReadingKey={jpV[1]} tagValue={tagV[1]} />,
        ),
      )}
    </Grid>
  </Paper>
);

export default DetailTagList;
