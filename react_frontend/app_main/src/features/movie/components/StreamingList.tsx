import { FC } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Movie } from 'models/movie';

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
            <Grid item mobile={12} tablet={6} key={planning.site.name}>
              <Button fullWidth variant="outlined" sx={{ padding: 2, textTransform: 'none' }}>
                <Stack
                  direction={{ mobile: 'row', tablet: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                  width="100%"
                >
                  <Avatar
                    alt={planning.site.name}
                    src={`${process.env.PUBLIC_URL}/${planning.site.icon}`}
                  />
                  <Typography fontWeight="bold" variant="body1" color="text.primary">
                    {planning.site.name}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {planning.desc}
                  </Typography>
                  <PlayCircleOutlineIcon fontSize="large" sx={{ color: 'whitesmoke' }} />
                </Stack>
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body2"
          display="inline"
          sx={{
            fontSize: '1rem',
            color: 'text.secondary',
            fontWeight: 'bold',
          }}
        >
          配信サービスが見つかりませんでした
        </Typography>
      )}
    </Paper>
  );
};

export default StreamingList;
