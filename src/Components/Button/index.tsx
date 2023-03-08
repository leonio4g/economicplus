import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Container, TextButton, Content } from './styles';

interface buttonProps {
    title: string
    onPress: () => void
}

const Button: React.FC <buttonProps> = ({title, onPress}) => {
  return (
    <Container onPress={onPress} >
        <Content>
        <TextButton>{title}</TextButton>
        </Content>
    </Container>
  );
}

export default Button;