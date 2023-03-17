import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, LogBox, Text, View, Image } from 'react-native';
import CardInfo from '../../Components/CardInfo';
import ListMonths from '../../Components/ListMonths';
import SafeBackground from '../../Components/SafeBackground';
import { Container, TextTitleMonths, ViewTitleMonths } from './styles';
import ModalAlert from '../../Components/ModalAlert';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import ItemPay from '../../Components/ItemPay';

import { getStorage, setStorage } from '../../Utils/Storage'
import 'moment/locale/pt-br'
import moment from 'moment';
import { formatMoney, formatNumber, formatPrice } from '../../Utils/format';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import LoadingApp from '../../Components/LoadingApp';


interface storeProps {
    name: string;
    income: Double;
}
interface pucharseCardProps {
  nameCard: string;
  installment: number;
  datePurchase: string;
  valuePucharse: string;
  valueInstallment: number
}

interface pucharseMoneyProps {
  datePucharse: string;
  valuePucharse: number;
  datePayment: string
}

interface pucharseMensalProps {
  nameCard: string;
  installment: number;
  datePucharse: string;
  valuePucharse: number;
  valueInstallment: number;
  payment: boolean;
  numberInstallment: number;
  dateSequentialMensal: string;
  months: string;
}

interface cardProps {
  nameCard: string;
  maturity: string;
  closed: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const [storePucharseCard, setStoragePucharseCard] = useState<pucharseCardProps[]>([])
  const [storePucharseMoney, setStoragePucharseMoney] = useState<pucharseMoneyProps[]>([])
  const [pusharseMensal, setPucharseMensal] = useState<pucharseMensalProps[]>([])
  const [storeCard, setStoreCard] = useState<cardProps[]>([])
  const [monthsList, setMonthsList] = useState([])
  const [visibleModalPayment, setVisibleModalPayment] = useState(false)
  const [visibleModalInitial, setVisibleModalInitial] = useState(false)
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)

  const [textName, setTextName] = useState('')
  const [textValue, setTextValue] = useState('')
  const [textValueAdd, setTextValueAdd] = useState('')
  const [income, setIncome ] = useState(0)
  const [store, setStore] = useState<storeProps>()
  const [totalCard, setTotalCard] = useState(0);
  const [totalMonthante, setTotalMonthAnte] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);

  const [totalMonth, setTotalMonth] = useState(0);
  const [checkCard, setCheckCard] = useState(false);
  const [checkMoney, setCheckMoney] = useState(false);
  const [checkNew, setCheckNew] = useState(false);
const [modalLoading, setModalLoading ] = useState(false)


  useEffect(() => {
    return LogBox.ignoreAllLogs();
  }, []);

  useEffect(() => {
    setModalLoading(true)
    //console.log(moment().add( 1, 'month').format("MM"))
    setTimeout(() => {
      //console.log(parseInt(Math.random() * 99999999))
      buscarDado().then(e => { setModalLoading(false)});
    }, 1000)
  }, []);

  useEffect(() => {

  }, [])

  const buscarDado = async () => {
    const storageSaveDataInicial = await getStorage('DataInicial');
    const storeSaveListMensal = await getStorage('PucharseMensal');
    const storageSaveCard = await getStorage('dataCard');
    const storageSavePucharseCard = await getStorage('PucharseCard');
    const storageSavePucharseMoney = await getStorage('PucharseMoney');

    if (storageSaveDataInicial) {
      setStore(storageSaveDataInicial)
    } else {
      setVisibleModalInitial(true)
    }

    if (storageSaveCard) {
      setStoreCard(storageSaveCard)
    } else {
      setStoreCard([])
    }


    if (storeSaveListMensal) {
      //console.log(storeSaveListMensal)
      setPucharseMensal(storeSaveListMensal)
    } else {
      setPucharseMensal([])
    }
    //pusharseMensal.map(item => console.log(item.dateSequentialMensal))




  };

  useEffect(() => {
    if (pusharseMensal) {
      const notPayment = pusharseMensal.filter((item) => item.payment == false)
      const payment = pusharseMensal.filter((item) => item.payment == true)
      const monthAnte = moment().subtract(1, 'month').format("MMMM")
      const itemMonthAnte = payment.filter(item => item.months.slice(5) === monthAnte)
      setTotalMonthAnte(itemMonthAnte.reduce(function (accumulator: number, value: pucharseMensalProps) {
        return accumulator + value.valueInstallment
      }, 0))
      const monthss = notPayment.map((item) => item.months)
      const monthsUnique: any = monthss.filter((este, i) => monthss.indexOf(este) === i)
      setMonthsList(monthsUnique.sort())
    } else {
      monthsList([])
    }
  }, [pusharseMensal])

  useEffect(() => {
    if(store){
      setIncome(store.income)
    }
  }, [store])

  useEffect(() => {
    if (pusharseMensal) {
      const result = pusharseMensal.filter(item => item.months === `${moment().format("MM")} - ${moment().format("MMMM")}` && item.payment != true )
      setTotalMonth(result.reduce(function (accumulator: any, value: pucharseMensalProps) {
        return accumulator + value.valueInstallment
      }, 0))
    }
  },[pusharseMensal])

  const handleNavigation = (item: string, screen: string) => {
    setVisibleModalPayment(false)
    const dataMonth = pusharseMensal.filter(items => items.months === item)
    
    if (checkCard) {
      navigation.navigate(screen, { title: item, view: 'card' })
    } else if (checkMoney) {
      navigation.navigate(screen, { title: item, view: 'money' })
    } else if (checkNew) {
      navigation.navigate(screen, { title: item, view: 'newCard' })
    } else {
      navigation.navigate(screen, { title: item, data: dataMonth, income: store })
    }

  }

  const handleOpenModal = () => {
    setVisibleModalPayment(!visibleModalPayment)
  }

  const handleMenu = () => {
    navigation.openDrawer()
  }

  const handleCard = () => {
    if (checkMoney) {
      setCheckMoney(!checkMoney)
    }
    if (checkNew) {
      setCheckNew(!checkNew)
    }
    setCheckCard(!checkCard)
  }
  const handleMoney = () => {
    if (checkCard) {
      setCheckCard(!checkCard)
    }
    if (checkNew) {
      setCheckNew(!checkNew)
    }
    setCheckMoney(!checkMoney)
  }
  const handleNew = () => {
    if (checkCard) {
      setCheckCard(!checkCard)
    }
    if (checkMoney) {
      setCheckMoney(!checkMoney)
    }
    setCheckNew(!checkNew)
  }
  const handleAdd = (value: any) => {
    const number = formatPrice(value)
    setTextValueAdd(number)
  }
  const handleMensal = (value: any) => {
    const number = formatPrice(value)
    setTextValue(number)
  }
  const handleSetDataInicial = () => {
    const data = {
      name: textName,
      income: textValue.replace(/([^\d])+/gim, '')
    }
    setStorage('DataInicial', data)
    setStore(data)
    setVisibleModalInitial(false)
  }
const handleAddMoney = () => {
  let valueActual = parseInt(store?.income)
  let valuleAdd = textValueAdd.replace(/([^\d])+/gim, '')
  //console.log(test + parseInt(test1))
  let some = valueActual + parseInt(valuleAdd)
  const data = {
    name: textName,
    income: some
  }
  setStorage('DataInicial', data)
  setStore(data)
  setTextValueAdd('')
  setVisibleModalAdd(!visibleModalAdd)
}
  const EmptyList = () => {
    return (

      <View style={{ width: '100%', paddingHorizontal: 24, alignItems: 'center', marginVertical: 20 }} >
        <View style={{ marginBottom: 19, marginTop: 32 }}>
          <Image
            style={{ width: 134, height: 170, resizeMode: 'contain' }}
            source={require('../../assets/notFound1.png')}
          />
        </View>
        <View style={{ marginBottom: 26 }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
            Ainda não existe contas adicionadas,
          </Text>
          <Text style={{ color: '#fff', textAlign: 'center', }}>
            Se e sua primeira vez no EconomicPlus primeiramente deve-se adicionar os cartões no botão + no canto supeior direito.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Container>
      <SafeBackground isHome onPressPlus={handleOpenModal} onPressMenu={handleMenu} name={store ? store.name : ""} >

        <ModalAlert modalVisible={visibleModalPayment} onClose={() => setVisibleModalPayment(false)} title="Qual meio de pagamento ?">
          {storeCard.length != 0 ?
            <>
              <ItemPay title='Cartão' check={checkCard} onPress={handleCard} />
              <ItemPay title='dinheiro' check={checkMoney} onPress={handleMoney} />
              <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }} >
                <View style={{ borderWidth: 1, borderColor: "#ff9000", width: "35%", marginRight: 15 }} />
                <Text style={{ color: "#fff" }} >OU</Text>
                <View style={{ borderWidth: 1, borderColor: "#ff9000", width: "35%", marginLeft: 15 }} />
              </View>
            </>
            : null
          }
          <ItemPay title='Novo Cartão' check={checkNew} onPress={handleNew} />
          <View style={{ marginVertical: 20 }} >
            <Button
              title="Prosseguir"
              onPress={() => {
                if (checkCard) {
                  handleNavigation("cadastrar compra", "RegisterPucharseCard")
                } else if (checkMoney) {
                  handleNavigation("cadastrar compra", "RegisterPucharseMoney")
                } else {
                  handleNavigation("cadastrar Cartão", "registercards")
                }
              }}
            />
          </View>
        </ModalAlert>

        <LoadingApp modalVisible={modalLoading} />

        <ModalAlert modalVisible={visibleModalInitial} onClose={() => setVisibleModalInitial(false)} title="Para iniciarmos :">
          <View>
            <Text></Text>
          </View>
          <Input
            Label='Qual seu nome ?'
            placeholder='fulano da silva'
            keyboardType='default'
            placeholderTextColor='#999591'
            value={textName}
            onChangeText={setTextName}
          />
          <Input
            Label='Qual sua renda mensal ?'
            placeholder='2954,00'
            keyboardType='numeric'
            placeholderTextColor='#999591'
            value={textValue}
            onChangeText={handleMensal}
          />
          <View style={{ marginVertical: 25 }} >
            <Button
              title="Enviar"
              onPress={handleSetDataInicial}
            />
          </View>
        </ModalAlert>


        <ModalAlert modalVisible={visibleModalAdd} onClose={() => setVisibleModalAdd(false)} title="Valor adicional:">
        <Input
            Label='Qual valor a ser acrescentado ?'
            placeholder='200,00'
            keyboardType='numeric'
            placeholderTextColor='#999591'
            value={textValueAdd}
            onChangeText={handleAdd}
          />
          <View style={{ marginVertical: 25 }} >
            <Button
              title="Adicionar"
              onPress={handleAddMoney}
            />
          </View>
        </ModalAlert>

        <CardInfo
          titleCardPrimary1="Renda mensal"
          valuePrimary1={`R$ ${formatPrice(income)}`}
          titleCardPrimary2='Gasto mês anterior'
          valuePrimary2={formatMoney(totalMonthante)}
          titleCardSecundary='Total a pagar no mês atual'
          valueSecudary={formatMoney(totalMonth)}
          addMoney={() => setVisibleModalAdd(!visibleModalAdd)}
        />

        {monthsList.length != 0 &&
          <ViewTitleMonths>
            <TextTitleMonths>Meses :</TextTitleMonths>
          </ViewTitleMonths>
        }
        <FlatList
          data={monthsList}
          extraData={monthsList}
          ListEmptyComponent={EmptyList}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <ListMonths
              onPress={() => handleNavigation(item, "MonthsDetails")}
              title={item.slice(5)}
              speding={1212}
            />
          )}
          keyExtractor={item => item}
        />
      </SafeBackground>
    </Container>
  );
}

export default Home;