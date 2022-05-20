import React, { FC } from 'react';

import './MultiplyIndex.css';
import { MultiplyWeb } from './MultiplyWeb/MultiplyWeb';
import { useWindowWidth } from '../../method/useWindowWidth';
import { MultiplyMobile } from './MobileView/MultiplyMobile';

export const MultiplyIndex: FC = () => {
  return (
    <div className={'multiply-content'}>
      {useWindowWidth() > 640 ? <MultiplyWeb /> : <MultiplyMobile />}
    </div>
  );
};
