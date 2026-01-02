import React from 'react';
import * as kit from '@rabjs/kit';

// Add all utility functions from @rabjs/kit to React Live scope
const ReactLiveScope = {
  React,
  ...React,
  ...kit,
};

export default ReactLiveScope;
