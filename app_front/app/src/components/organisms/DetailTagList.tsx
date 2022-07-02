import { FC } from 'react';

// MUI
// import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import ListItem from '@mui/material/ListItem';

// itemdata
import { AllContentsTagType, tagWithURL } from 'data/detailTag';
// import { DetailTagJPData } from 'data/detailTagJP';

type TagKeyValue = {
  jpReadingKey: string;
  tagValue?: undefined | tagWithURL[];
};

const TagItemGrid: FC<TagKeyValue> = ({ jpReadingKey, tagValue }) => (
  <Grid container item spacing={3} justifyContent="center" alignItems="flex-start">
    <Grid item tablet={4} sx={{ textAlign: 'right' }}>
      <Typography
        variant="h4"
        display="inline"
        sx={{ fontSize: '0.9rem', color: 'text.secondary' }}
      >
        {jpReadingKey}
      </Typography>
    </Grid>
    <Grid item tablet={8}>
      {tagValue?.map((tag) => (
        <Typography paragraph margin={0} sx={{ fontSize: '0.9rem' }}>
          {tag.name}
        </Typography>
      ))}
    </Grid>
  </Grid>
);

const DetailTagList: FC<AllContentsTagType> = ({ detailCode }) => (
  <Paper variant="outlined" sx={{ padding: 2 }}>
    <Grid container spacing={1}>
      <TagItemGrid jpReadingKey="公開年" tagValue={detailCode.publicationDate} />
      <TagItemGrid jpReadingKey="原作" tagValue={detailCode.based} />
      <TagItemGrid jpReadingKey="原作者" tagValue={detailCode.author} />
      <TagItemGrid jpReadingKey="制作国" tagValue={detailCode.country} />
      <TagItemGrid jpReadingKey="言語" tagValue={detailCode.language} />
      <TagItemGrid jpReadingKey="ジャンル" tagValue={detailCode.genre} />
      <TagItemGrid jpReadingKey="監督" tagValue={detailCode.directedBy} />
      <TagItemGrid jpReadingKey="脚本" tagValue={detailCode.producedBy} />
      <TagItemGrid jpReadingKey="主演・助演" tagValue={detailCode.starring} />
      <TagItemGrid jpReadingKey="音楽" tagValue={detailCode.prodConpany} />
      <TagItemGrid jpReadingKey="制作会社" tagValue={detailCode.musicBy} />
      <TagItemGrid jpReadingKey="制作" tagValue={detailCode.editedBy} />
      <TagItemGrid jpReadingKey="撮影" tagValue={detailCode.screenplayBy} />
      <TagItemGrid jpReadingKey="映像" tagValue={detailCode.graphy} />
    </Grid>
  </Paper>
);

export default DetailTagList;
