import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import IconArrow from 'react-native-vector-icons/Entypo'

import {
  Container,
  HeaderText,
  HeaderButton,
  HeaderPlus,
  TextTitle,
  TextTitleSub,
  TextTitleName
} from './styles';
import ModalAlert from '../ModalAlert';

interface headerProps {
  isHome: boolean;
  title?: string;
  name?: string;
  onPressPlus?: () => void
  onPressMenu?: () => void
}

const Header: React.FC<headerProps> = ({ isHome, title, onPressPlus, onPressMenu, name }) => {
  const navigation = useNavigation();

const handleBack = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'home' }],
})
}

  return (
    <Container>
      {isHome ?
        <>
        <HeaderButton>
            <TouchableOpacity onPress={onPressMenu} >
              <HeaderPlus>
                <IconArrow name="menu" size={40} color="#ff9000" />
              </HeaderPlus>
            </TouchableOpacity>
          </HeaderButton>
          <HeaderText>
            <TextTitle>Bem vindo</TextTitle>
            <TextTitleName>Sr(a). {name ? name: ""}</TextTitleName>
          </HeaderText>
          <HeaderButton>
            <TouchableOpacity onPress={onPressPlus} >
              <HeaderPlus>
                <Icon name="pluscircle" size={40} color="#ff9000" />
              </HeaderPlus>
            </TouchableOpacity>
          </HeaderButton>
        </>
        :
        <>
        <TouchableOpacity onPress={handleBack} >
              <HeaderPlus>
              <IconArrow name="chevron-left" size={40} color="#ff9000" />
              </HeaderPlus>
            </TouchableOpacity>
          <HeaderText>
            <TextTitleSub>{title}</TextTitleSub>
          </HeaderText>
          <HeaderButton />

        </>
      }
    </Container>
  );
}

export default Header;