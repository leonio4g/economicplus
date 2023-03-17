import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import Button from '../../Components/Button';
import CardInfo from '../../Components/CardInfo';
import Input from '../../Components/Input';
import SafeBackground from '../../Components/SafeBackground';
import { maskDate } from '../../Utils/format'
import { Container, ViewInputs, ViewButton } from './styles';
import { getStorage, setStorage } from '../../Utils/Storage';
import moment from 'moment';

interface cardProps {
  //id: string;
  nameCard: string;
  maturity: string;
  closed: string;
}

const RegisterCard: React.FC = (props: any) => {
  const navigation = useNavigation();
  const [storeCard, setStoreCard] = useState<cardProps[]>([])
  const [storageCard, setStorageCard ] = useState<cardProps>([])
  const [name, setName] = useState('')
  const [venc, setVenc] = useState('')
  const [closed, setClosed] = useState('')

  useEffect(() => {
    setTimeout(() => {
      buscarDado().then(e => { });
    }, 1000)
  }, []);
  const buscarDado = async () => {
    const storageSave = await getStorage('dataCard');
    console.log(storageSave)
    if (storageSave) {
      setStoreCard(storageSave)
    }else{
      setStoreCard([])
    }
  };

  const handleName = (value: string) => {
    setName(value)
  }
  const handleVenc = (value: string) => {
    if (value.length <= 2) {
      setVenc(value)
    }
  }

  const handleClosed = (value: any) => {
    if (value.length <= 2) {
      setClosed(value)
    }
  }

  const handleRegister = () => {
    storeCard.push({
      nameCard: name,
      maturity: venc,
      closed: closed
    })
    setStorage('dataCard', storeCard)
    navigation.reset({
      index: 0,
      routes: [{ name: 'home' }],
  })
  }

  return (
    <SafeBackground isHome={false} title={props.route.params.title} >
      <CardInfo solo info='Vamos realizar o cadastro de seu cartão.' />
      <Container>
        <ViewInputs>
          <Input
            Label='Qual nome do Cartao ?'
            placeholder='Bradesco'
            keyboardType='default'
            placeholderTextColor='#999591'
            value={name}
            onChangeText={handleName}
          />
          <Input
            Label='Dia do vencimento:'
            placeholder='22'
            value={venc}
            onChangeText={handleVenc}
            keyboardType='numeric'
            placeholderTextColor='#999591'

          />
          <Input
            Label='Dia do Fechamento:'
            placeholder='13'
            keyboardType='numeric'
            placeholderTextColor='#999591'
            value={closed}
            onChangeText={handleClosed}
          />
        </ViewInputs>
        <ViewButton>
          <Button
            onPress={handleRegister}
            title='Cadastrar Cartão'
          />
        </ViewButton>

      </Container>
    </SafeBackground>
  );
}

export default RegisterCard;