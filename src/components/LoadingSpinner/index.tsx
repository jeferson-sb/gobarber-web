import React from 'react';

import { Spinner, SpinnerInner, SpinnerLine, SpinnerCircle } from './styles';

const LoadingSpinner: React.FC = () => {
  return (
    <Spinner>
      <SpinnerInner>
        <SpinnerLine />
        <SpinnerLine />
        <SpinnerLine />
        <SpinnerCircle />
      </SpinnerInner>
    </Spinner>
  );
};

export default React.memo(LoadingSpinner);
