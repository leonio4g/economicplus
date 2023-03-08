import React from 'react';
import { View, Text } from 'react-native';
import SafeBackground from '../../Components/SafeBackground';
import Icon from 'react-native-vector-icons/FontAwesome'


// import { Container } from './styles';

const MyCards: React.FC = () => {
  return (
    <SafeBackground isHome={false} title='Meus Cartões' >
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }} >
<Icon name="gears" size={100} color="#ff9000" />
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}} >Tela em Construção</Text>
            <Text style={{color: '#fff', fontSize: 16}} >Aguarde novidades</Text>
        </View>
    </SafeBackground>
  );
}

export default MyCards;