import React from 'react';

import Providers from './navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';


export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Providers />
  </ApplicationProvider>
);