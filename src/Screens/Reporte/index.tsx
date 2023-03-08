import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import SafeBackground from '../../Components/SafeBackground';
import Icon from 'react-native-vector-icons/FontAwesome'
import CardInfo from '../../Components/CardInfo';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import emailJS from '@emailjs/browser'


import { Container, ViewInputs, ViewButton } from './styles';

const Reporte: React.FC = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleName = (value: string) => {
    setName(value)
  }
  const handleEmail = (value: string) => {
    setEmail(value)
  }
  const handleMessage = (value: string) => {
    setMessage(value)
  }

  const handleSend = () => {
    const templeteEmail = {
      from_name: name,
      message: message,
      email: email
    }
    emailJS.send('service_mrm0qac', 'template_me4afoo', templeteEmail, 'jXYfwAyX8hq5c6-Fq')
    .then((res) => {
      console.log("email enviado", res.status, res.text)
      setName('')
      setEmail('')
      setMessage('')
    }, (err) => {
      console.log('Error : ', err)
    })
  }

  return (
    <SafeBackground isHome={false} title='Reporte ou Melhorias' >
      <CardInfo solo info='Nos descreva com maximo de detalhes possivel o que deseja rerpota ou melhorar.' />
      <Container>
        <ViewInputs>
          <Input
            Label='Qual seu nome ?'
            placeholder='Matheus Santos'
            keyboardType='default'
            placeholderTextColor='#999591'
            value={name}
            onChangeText={handleName}
          />
          <Input
            Label='Qual seu email ?'
            placeholder='matheus@gmail.com'
            value={email}
            onChangeText={handleEmail}
            keyboardType='email-address'
            placeholderTextColor='#999591'

          />
          <Input
            Label='Descrição :'
            placeholder='Descrição . . .'
            style={{ height: 100 }}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={Platform.OS === 'android' ? 6 : 3}
            keyboardType='default'
            placeholderTextColor='#999591'
            value={message}
            onChangeText={handleMessage}
          />
        </ViewInputs>
        <ViewButton>
          <Button
            onPress={handleSend}
            title='Enviar'
          />
        </ViewButton>
      </Container>
    </SafeBackground>
  );
}

export default Reporte;