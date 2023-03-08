import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconCheck from 'react-native-vector-icons/AntDesign'
import IconCircle from 'react-native-vector-icons/Entypo'
import {
    Container,
    ViewIcon,
    ViewText,
    TextTitle,
    TextTotal,
    ViewButton,
    Content
  } from './styles';

  interface itemProps {
    title: string
    check: boolean
    onPress: () => void
  }

const ItemPay: React.FC<itemProps> = ({title, check, onPress}) => {
  return (
    <Container>
      <Content>
      <ViewIcon>
        <TouchableOpacity onPress={onPress} >
        {check ?
        <IconCheck name="checkcircle" size={30} color="#ff9000" />
        :
        <IconCircle name="circle" size={30} color="#ff9000" />  
      }
        </TouchableOpacity>
      </ViewIcon>
      <ViewText>
        <TextTitle>{title}</TextTitle>
      </ViewText>
      
      
      </Content>
    </Container>
  );
}

export default ItemPay;