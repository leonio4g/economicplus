import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import SafeBackground from '../../Components/SafeBackground';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getStorage } from '../../Utils/Storage';
import CardInfo from '../../Components/CardInfo';
import ListDetails from '../../Components/ListDetails';
import LoadingApp from '../../Components/LoadingApp';


// import { Container } from './styles';

interface pucharseMensalProps {
  id: number;
  nameCard: string;
  installment: number;
  datePurchase: string;
  valuePurchase: number;
  valueInstallment: number;
  payment: boolean;
  numberInstallment: number;
  dateSequentialMensal: string;
  months: string;
  datePayment: string;
}


const PurchaseIncome: React.FC = (props: any) => {
  const [dateMonth, setDataMonth] = useState<pucharseMensalProps[]>([])
  const [pusharseMensal, setPucharseMensal] = useState<pucharseMensalProps[]>([])
  const [spendingMonth, setSpendingMonth] = useState(0)
  const [remaining, setRemaining] = useState(0)

  const [modalLoading, setModalLoading ] = useState(false)

  useEffect(() => {
    setModalLoading(true)
    //console.log(moment(test, 'DD/MM/YYYY').format("MMMM"))
    setTimeout(() => {
      //console.log(parseInt(Math.random() * 99999999))
      buscarDado().then(e => { setModalLoading(false)});
    }, 1000)
  }, []);

const buscarDado = async () => {
  const storeSaveListMensal = await getStorage('PucharseMensal')
  if (storeSaveListMensal) {
    //console.log(storeSaveListMensal)
    setPucharseMensal(storeSaveListMensal)
  } else {
    setPucharseMensal([])
  }

};
useEffect(() => {
  if(pusharseMensal){
    const payments = pusharseMensal.filter(item => item.payment === true)
    setDataMonth(payments)
  }
}, [pusharseMensal]);
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
          Ainda não existe contas pagas,
        </Text>
        <Text style={{ color: '#fff', textAlign: 'center', }}>
          Verifique as datas de pagamentos, e se já pagou não esqueça de marca-las como pagas.
        </Text>
      </View>
    </View>
  );
}
  return (
    <SafeBackground isHome={false} title='Reporte ou Melhorias' >
      <LoadingApp modalVisible={modalLoading} />
        <CardInfo solo info='Segue lista de suas contas pagas.' />
        <FlatList
          data={dateMonth}
          extraData={dateMonth}
          ListEmptyComponent={EmptyList}
          style={{marginTop: 20}}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item, index }) => (
            <ListDetails
              value={item.valueInstallment}
              title={item.nameCard}
              payments
              dateSpeding={item.datePurchase}
              installments={item.installment}
              numberInstallment={item.numberInstallment}
              datePayment={item.datePayment}
              paid={item.payment}
              onPress={() => {}}
            />
          )}
          keyExtractor={(item) => `${item.valuePurchase}`}
        />
    </SafeBackground>
  );
}

export default PurchaseIncome;