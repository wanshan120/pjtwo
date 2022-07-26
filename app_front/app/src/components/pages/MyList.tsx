import * as React from 'react';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// icon
import ClearIcon from '@mui/icons-material/Clear';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// molecules
import SortMenu from 'components/molecules/SortMenu';
// atoms
import DrawerHeader from 'components/atoms/DrawerHeader';
// organisms
import ResponsiveMenuBar from 'components/organisms/ResponsiveMenuBar';

// img
import intothewildAama from 'data/images/intothewildAma.jpg';

// date
import { formatDistance, subDays } from 'date-fns';
import ja from 'date-fns/locale/ja';

const MyList = () => {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <DrawerHeader />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ResponsiveMenuBar />
        <Paper variant="outlined" component="main" sx={{ maxWidth: 1280, width: '100%', p: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ my: 3 }}
          >
            <Grid item mobile={12} sx={{ width: '100%', marginBottom: 2 }}>
              <Typography variant="h4" component="h1">
                後で見る
              </Typography>
            </Grid>
            <Grid item mobile={12} sx={{ m: 0, p: 0 }}>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
                  <ToggleButton value="all">全て</ToggleButton>
                  <ToggleButton value="movie">映画</ToggleButton>
                  <ToggleButton value="tv">TVドラマ</ToggleButton>
                  <ToggleButton value="anime">アニメ</ToggleButton>
                  <ToggleButton value="comic">漫画</ToggleButton>
                  <ToggleButton value="novel">小説</ToggleButton>
                </ToggleButtonGroup>
                <SortMenu />
              </Stack>
            </Grid>
            <Grid
              item
              mobile={12}
              sx={{ m: 0, p: 0, border: '1px solid rgba(255, 255, 255, 0.12)' }}
            >
              <ListItemButton>
                <Grid container direction="row" justifyContent="flex-start" spacing={2}>
                  <Grid item mobile={1.5} sx={{ lineHeight: 0 }}>
                    <img
                      src={intothewildAama}
                      alt={intothewildAama}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}
                    />
                  </Grid>
                  <Grid item mobile={10.5}>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Stack direction="row" spacing={1}>
                          <Chip label="映画" sx={{ borderRadius: '0px' }} />
                          <Typography id="transition-modal-title" variant="h6" component="h2">
                            イントゥザワイルド
                          </Typography>
                        </Stack>
                        <Box>
                          <IconButton aria-label="item menu">
                            <MoreVertIcon />
                          </IconButton>
                          <IconButton aria-label="item clear">
                            <ClearIcon />
                          </IconButton>
                        </Box>
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Paper
                          variant="outlined"
                          sx={{
                            paddingTop: 0.5,
                            paddingBottom: 0.5,
                            px: 3,
                            textAlign: 'center',
                          }}
                        >
                          <Typography display="inline" style={{ fontSize: '1.5rem' }}>
                            S
                          </Typography>
                          <Typography
                            display="inline"
                            style={{ fontSize: '1.1rem', marginLeft: 7 }}
                          >
                            8.6
                          </Typography>
                        </Paper>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={1}
                        >
                          <Typography fontSize="1rem">2007</Typography>
                          <Divider orientation="vertical" variant="middle" flexItem />
                          <Typography fontSize="1rem">心温まる</Typography>
                          <Typography fontSize="1rem">人生</Typography>
                          <Typography fontSize="1rem">アナーキズム</Typography>
                          <Divider orientation="vertical" variant="middle" flexItem />
                          <Typography fontSize="0.9rem" color="text.secondary">
                            {formatDistance(subDays(new Date(), 3), new Date(), {
                              addSuffix: true,
                              locale: ja,
                            })}
                            に追加
                          </Typography>
                        </Stack>
                      </Stack>
                      <Box sx={{ flexGrow: 1, overflow: 'hidden', width: '100%' }}>
                        <Typography
                          noWrap
                          variant="h3"
                          sx={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginTop: 1,
                            marginBottom: 1,
                          }}
                        >
                          前向きな旅物語ではなく、どちらかというと主人公が悲観して自分を死に追い込んでいくネガティブな人間ドラマ
                        </Typography>

                        <Typography noWrap sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                          社会から、人々から逃げ回っていたらやがて地球の果てまで行ってしまう若者の悲しくも儚い自分探しの旅です。
                        </Typography>
                        <Typography noWrap sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                          しっかりと自分の考えを持って、決断し、責任を持った生きた方をしているからかもしれません。道中でどんな不運に襲われようと、どんないい出会いに恵まれようと最初の目的を失わず「なにがなんでもアラスカに行くんだ」という強い意志を見せれくれたことも関係しているのかもしれません。あれだけ強い覚悟がある人って他人が意見できる隙がないもんね。中途半端な奴だと突っ込みどころが多いから説教とかされそうなもんだけど、あそこまで突き進んでたら誰も何も言えないよね
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItemButton>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default MyList;
