import { FC } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Movie } from 'models/movie';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const StreamingList: FC<{ plannings: Movie['plannings'] }> = ({ plannings }) => {
  // 最高値順でソートする
  const badValueVods: Movie['plannings'] = plannings?.sort((a, b) => b.price - a.price);

  // 重複するplanningサービスを削除する。最高値でソートしているため、最安値が残る
  const uniqueVods: Movie['plannings'] = Array.from(
    new Map(badValueVods?.map((planning) => [planning.site.name, planning])).values(),
  );

  // 最安値順でソートする
  const bestValuePlannings: Movie['plannings'] = uniqueVods?.sort((a, b) => a.price - b.price);

  // 価格帯の説明を付与する
  const descGigenPlannings: Movie['plannings'] = bestValuePlannings?.map((planning) => {
    if (planning.isSubscription) {
      return { ...planning, desc: '会員見放題' };
    }

    if (planning.price === 0) {
      if (planning.isFree) {
        return { ...planning, desc: '無料' };
      }

      return { ...planning, desc: '価格不明' };
    }

    return { ...planning, desc: `${String(planning.price)}円より` };
  });

  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Box sx={{ marginBottom: 1 }}>
        <Typography
          variant="h4"
          display="inline"
          sx={{
            fontSize: '1rem',
            color: 'text.secondary',
            fontWeight: 'bold',
          }}
        >
          今すぐ観る
        </Typography>
      </Box>

      {descGigenPlannings?.length ? (
        <Grid
          sx={{ flexGrow: 1 }}
          container
          rowSpacing={1}
          columnSpacing={{ mobile: 1, tablet: 2 }}
        >
          {descGigenPlannings?.map((planning) => (
            <Grid item mobile={12} tablet={6}>
              <Button fullWidth variant="outlined" sx={{ padding: 2, textTransform: 'none' }}>
                <Avatar
                  alt={planning.site.name}
                  src={`${process.env.PUBLIC_URL}/${planning.site.icon}`}
                />
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                  <Grid item mobile={6} tablet={6}>
                    <Typography
                      sx={{ display: 'inline' }}
                      fontWeight="bold"
                      variant="body2"
                      color="text.primary"
                      noWrap
                    >
                      {planning.site.name}
                    </Typography>
                  </Grid>
                  <Grid item mobile={6} tablet={6}>
                    <Typography
                      sx={{ display: 'inline' }}
                      variant="body2"
                      color="text.primary"
                      noWrap
                    >
                      {planning.desc}
                    </Typography>
                  </Grid>
                </Grid>

                <PlayCircleOutlineIcon fontSize="large" sx={{ color: 'whitesmoke' }} />
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        'notitle'
      )}
    </Paper>
  );
};

export default StreamingList;
