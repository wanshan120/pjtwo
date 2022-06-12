import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

import HomeButton from 'containers/molecules/HomeButton';

const Characters: FC = () => (
  <header>
    <h1>SLAM DUNK 登場人物</h1>
    <Outlet />
    <Divider hidden />
    <HomeButton />
  </header>
);

export default Characters;
