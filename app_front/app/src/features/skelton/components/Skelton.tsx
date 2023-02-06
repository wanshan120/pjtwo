import * as React from 'react';

import CircleRate from 'components/elements/CircleRate';

const Skelton = () => (
  <>
    <CircleRate size={100} serviceName="MyRate" rate={7} />
    <CircleRate size={100} serviceName="MyRate" />

    <CircleRate size={100} serviceName="MyService" rate={3.2} />
    <CircleRate size={100} serviceName="MyService" />
  </>
);

export default Skelton;
