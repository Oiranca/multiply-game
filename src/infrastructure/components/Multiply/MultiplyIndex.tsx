import React, { FC } from 'react';

import { MultiplyWeb } from './MultiplyWeb/MultiplyWeb';
import { useWindowWidth } from '../../method/useWindowsWidth/useWindowWidth';
import { MultiplyMobile } from './MobileView/MultiplyMobile';

export const MultiplyIndex: FC = () => {
  return (
    <div className="w-full flex justify-center items-start p-4">
      {useWindowWidth() >= 820 ? <MultiplyWeb /> : <MultiplyMobile />}
    </div>
  );
};
