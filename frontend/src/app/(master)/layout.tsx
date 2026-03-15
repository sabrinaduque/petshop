'use client';

import { PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { MasterLayoutContainer, MasterLayoutContent } from './styles';

const MasterLayout = ({ children }: PropsWithChildren) => {
  return (
    <MasterLayoutContainer>
      <Header />
      <MasterLayoutContent>{children}</MasterLayoutContent>
    </MasterLayoutContainer>
  );
};

export default MasterLayout;
