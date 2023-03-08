import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Header from '../Header';

import { Container } from './styles';

interface SafeProps {
  children: React.ReactNode;
  isHome: boolean;
  title?: string;
  name?: string
  onPressPlus?: () => void
  onPressMenu?: () => void
}

const SafeBackground: React.FC <SafeProps> = ({children, isHome, title, onPressMenu, onPressPlus, name}) => {
  return (
    <Container>
      <Header isHome={isHome} name={name} title={title} onPressPlus={onPressPlus} onPressMenu={onPressMenu} />
      {children}
    </Container>
  );
}

export default SafeBackground;