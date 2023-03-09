import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import IconCheck from 'react-native-vector-icons/AntDesign'
import IconCircle from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/AntDesign'

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
      const getType = (value: string | undefined) => {
        const list = {
          'NUBANK':{
            color: '#9400d3'
          },
          'BRADESCO': {
            color: '#cc092f'
          },
          'WILL':{
            color: '#ffce30'
          },
          'NEON':{
            color: '#08f7fe'
          },
          'ITAU': {
            color: '#f28500'
          },
          'ITA': {
            color: '#f28500'
          },
          'C6BANK':{
            color: '#716842'
          }
        }
        return (
          list[value] || {
            color: '#ff9000'
          }
        );
  
      }
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
        <View style={{flexDirection: 'row'}} >
        <Icon name="creditcard" size={20} color={getType(title.toLocaleUpperCase()).color} />
          <TextTitle color={getType(title.toLocaleUpperCase()).color} >{title}</TextTitle>
        </View>
          <TextTotal>Valor : {formatMoney(value)}</TextTotal>
          <TextTotal>Data da compra : {dateSpeding}</TextTotal>
          {installments > 1 ?
          <TextTotal>Parcelas : {numberInstallment}/{installments}</TextTotal>
          :
          <TextTotal>Pagamento : {datePayment}</TextTotal>
          }
        </ViewText>
        
        
        </Content>
      </Container>
      )
    }


export default ListDetails;