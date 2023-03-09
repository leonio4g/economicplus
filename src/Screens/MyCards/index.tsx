import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import SafeBackground from '../../Components/SafeBackground';
import Icon from 'react-native-vector-icons/AntDesign'
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons'
import CardInfo from '../../Components/CardInfo';
import { getStorage } from '../../Utils/Storage';


import { 
  Container,
  Content,
  ViewIcon,
  TextTitle,
  ViewText,
  ViewDelete,
  ViewSubText,
  TextSubTitle
 } from './styles';
import LoadingApp from '../../Components/LoadingApp';

interface cardProps {
  id: string;
  nameCard: string;
  maturity: string;
  closed: string;
}

const MyCards: React.FC = () => {

  const [storeCard, setStoreCard] = useState<cardProps[]>([])
  const [modalLoading, setModalLoading ] = useState(false)

  useEffect(() => {
    setModalLoading(true)
    setTimeout(() => {
      buscarDado().then(e => { setModalLoading(false)});
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

  const ListRender = (item: cardProps) => {
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
      <Container color={getType(item.nameCard.toLocaleUpperCase()).color} >
            <Content>
              <ViewIcon color={getType(item.nameCard.toLocaleUpperCase()).color} >
              <Icon name="creditcard" size={40} color={getType(item.nameCard.toLocaleUpperCase()).color} />
              </ViewIcon>
              <ViewText>
                <TextTitle>{item.nameCard}</TextTitle>
                <ViewSubText>
                <TextSubTitle>Venc. dia : {item.maturity}</TextSubTitle>
                <TextSubTitle>Fecha. dia : {item.closed}</TextSubTitle>
                </ViewSubText>
              </ViewText>
              <ViewDelete>
              <IconDelete name="delete-outline" size={30} color="#be2929" />
              </ViewDelete>
            </Content>
          </Container>
    )
  }

  return (
    <SafeBackground isHome={false} title='Meus Cartões' >
      <LoadingApp modalVisible={modalLoading} />
        <CardInfo solo info='Segue lista de seus cartões cadastrados' />

      <FlatList
        data={storeCard}
        extraData={storeCard}
        style={{marginTop: 15}}
        renderItem={({item}) => ListRender(item)}
        keyExtractor={item => item.id}
      />


    </SafeBackground>
  );
}

export default MyCards;