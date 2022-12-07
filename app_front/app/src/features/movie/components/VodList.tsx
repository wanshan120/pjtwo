import { FC } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import AspectRatioBlock from 'components/block/AspectRatioBlock';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Movie } from 'models/movie';

const VODList: FC<{ plannings: Movie['plannings'] }> = ({ plannings }) => {
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

    return { ...planning, desc: `${String(planning.price)}円` };
  });

  return (
    <AspectRatioBlock sx={{ width: '22%' }}>
      {descGigenPlannings?.length ? (
        <Paper
          // variant="outlined"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            minWidth: '200px',
            textAlign: 'center',
          }}
        >
          <List
            sx={{
              margin: '1px',
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              bgcolor: 'background.paper',
            }}
            subheader={
              <ListSubheader
                sx={{
                  fontSize: '1rem',
                  color: 'text.secondary',
                  fontWeight: 'bold',
                }}
              >
                今すぐ観る
              </ListSubheader>
            }
          >
            {descGigenPlannings?.map((planning) => (
              <ListItem sx={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 1 }}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={planning.site.name}
                      src={`${process.env.PUBLIC_URL}/${planning.site.icon}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={planning.site.name}
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        noWrap
                      >
                        {planning.desc}
                      </Typography>
                    }
                  />
                  <ListItemIcon sx={{ paddingLeft: 2 }}>
                    <PlayCircleOutlineIcon fontSize="large" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        'notitle'
      )}
    </AspectRatioBlock>
  );
};

export default VODList;
