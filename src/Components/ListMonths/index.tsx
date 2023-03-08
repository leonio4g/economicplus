import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import IconCalendar from 'react-native-vector-icons/Ionicons'
import IconArrow from 'react-native-vector-icons/Entypo'
import {
  Container,
  ViewIcon,
  ViewText,
  TextTitle,
  TextTotal,
  ViewButton,
  Content
} from './styles';

interface listProps {
  title: string
  speding: number
  onPress: () => void
}

const ListMonths: React.FC<listProps> = ({ title, speding, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <Container>
        <Content>
          <ViewIcon>
            <IconCalendar name="calendar-outline" size={40} color="#ff9000" />
          </ViewIcon>
          <ViewText>
            <TextTitle>{title}</TextTitle>
          </ViewText>
          <ViewButton>
            <IconArrow name="chevron-right" size={40} color="#ff9000" />
          </ViewButton>
        </Content>
      </Container>
    </TouchableOpacity>
  );
}

export default ListMonths;