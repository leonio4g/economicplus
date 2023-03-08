import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import IconCheck from 'react-native-vector-icons/AntDesign'
import IconCircle from 'react-native-vector-icons/Entypo'

import IconArrow from 'react-native-vector-icons/Entypo'
import { formatMoney } from '../../Utils/format';
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
  title: string;
  value: number;
  onPress: () => void;
  paid: boolean;
  dateSpeding: string;
  installments: number;
  numberInstallment: number;
  datePayment: string;
}

const ListDetails: React.FC <listProps> = ({
  title, 
  value, 
  onPress, 
  paid, 
  dateSpeding, 
  installments,
   numberInstallment,
    datePayment
  }) => {
  return (
    <Container opacity={paid} >
      <Content>
      <ViewIcon>
        <TouchableOpacity onPress={onPress} >
        {paid ?
        <IconCheck name="checkcircle" size={40} color="#ff9000" />
        :
        <IconCircle name="circle" size={40} color="#ff9000" />  
      }
        </TouchableOpacity>
      </ViewIcon>
      <ViewText>
        <TextTitle>{title}</TextTitle>
        <TextTotal>Valor : {formatMoney(value)}</TextTotal>
        <TextTotal>Data da compra : {dateSpeding}</TextTotal>
        {installments > 1 ?
        <TextTotal>Parcelas : {numberInstallment}/{installments}</TextTotal>
        :
        <TextTotal>Data de Pagamento : {datePayment}</TextTotal>
        }
      </ViewText>
      
      
      </Content>
    </Container>
  );
}

export default ListDetails;