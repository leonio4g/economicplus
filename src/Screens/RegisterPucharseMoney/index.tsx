import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Button from '../../Components/Button';
import CardInfo from '../../Components/CardInfo';
import Input from '../../Components/Input';
import SafeBackground from '../../Components/SafeBackground';
import { maskDate } from '../../Utils/format';
import { getStorage, setStorage } from '../../Utils/Storage';

import { Container, ViewInputs, ViewButton } from './styles';

interface pucharseProps {
  id: number;
  datePurchase: string;
    valuePucharse: number;
    datePayment: string;
    payment: boolean;
}
interface pucharseMensalProps {
  id: number
  nameCard: string;
  installment: number;
  datePurchase: string;
  valuePucharse: number;
  valueInstallment: number;
  payment: boolean;
  numberInstallment: number;
  months: string;
  datePayment: string;
  dateSequentialMensal: string;
}

const RegisterPucharseMoney: React.FC = (props: any) => {
    const navigation = useNavigation();
    const [storeMoney, setStoreMoney] = useState<pucharseProps[]>([])
    const [pusharseMensal, setPucharseMensal] = useState<pucharseMensalProps[]>([])

    const [valuePucharse, setValuePucharse] = useState('')
    const [datePucharse, setDatePucharse] = useState('')
    const [datePayment, setDatePayment] = useState('')
  
    useEffect(() => {
        setTimeout(() => {
            buscarDado().then(e => { });
        }, 1000)
    }, []);

    const buscarDado = async () => {

        const storeSaveMoney = await getStorage('PucharseMoney');
        const storeSaveListMensal = await getStorage('PucharseMensal')

        console.log(storeSaveMoney)        
        if(storeSaveMoney){
            setStoreMoney(storeSaveMoney)
        }

        if(storeSaveListMensal){
          setPucharseMensal(storeSaveListMensal)
        }else{
          setPucharseMensal([])
        }
    };
  
    const handleValuePucharse = (value: string) => {
      console.log(value)
      setValuePucharse(value)
    }
    const handleDatePucharse = (value: string) => {
      if(value.length <= 10){
        setDatePucharse(maskDate(value))
      }
    }
  
    const handleDatePayment = (value: any) => {
      if(value.length <= 10){
        setDatePayment(maskDate(value))
      }
    }
    const handleRegister = () => {
        storeMoney.push({
          id: parseInt(Math.random() * 99999999),
          valuePucharse: parseInt(valuePucharse),
          datePurchase: datePucharse,
          datePayment: datePayment,
          payment: false
        })

        pusharseMensal.push({
          id: parseInt(Math.random() * 99999999),
          valuePucharse: parseInt(valuePucharse),
          datePurchase: datePucharse,
          payment: false,
          nameCard: 'DINHEIRO',
          installment: 0,
          datePayment: datePayment,
          valueInstallment: parseInt(valuePucharse),
          numberInstallment: 1,
          months:`${moment(datePayment, 'DD/MM/YYYY').format("MM")} - ${moment(datePayment, 'DD/MM/YYYY').format("MMMM")}`,
          dateSequentialMensal: datePayment
        })
        console.log(pusharseMensal)
        setStorage('PucharseMoney', storeMoney)
        setStorage('PucharseMensal', pusharseMensal)
        navigation.reset({
          index: 0,
          routes: [{ name: 'home' }],
        })
      }

  return (
    <SafeBackground isHome={false} title={props.route.params.title} >
        <CardInfo solo info='Vamos realizar o cadastro de sua compra.' />
    <Container>
      <ViewInputs>
        <Input
          Label='Qual valor da compra ?'
          placeholder='320'
          keyboardType='numeric'
          placeholderTextColor='#999591'
          value={valuePucharse}
          onChangeText={handleValuePucharse}
        />
        <Input
          Label='Data da compra :'
          placeholder='22/02/2023'
          onChangeText={handleDatePucharse}
          value={datePucharse}
          keyboardType='numeric'
          placeholderTextColor='#999591'

        />
        <Input
          Label='Data de pagamento :'
          placeholder='23/03/2023'
          keyboardType='numeric'
          placeholderTextColor='#999591'
          value={datePayment}
          onChangeText={handleDatePayment}
        />
      </ViewInputs>
      <ViewButton>
        <Button
          onPress={handleRegister}
          title='Cadastrar Compra'
        />
      </ViewButton>

    </Container>
    </SafeBackground>
  );
}

export default RegisterPucharseMoney;