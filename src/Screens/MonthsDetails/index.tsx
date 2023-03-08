import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import CardInfo from '../../Components/CardInfo';
import SafeBackground from '../../Components/SafeBackground';
import Icon from 'react-native-vector-icons/AntDesign'
import IconNot from 'react-native-vector-icons/Entypo'
import { ViewLegend, ViewText, TextLegend, ViewIndice, ViewItem, TextItem,ViewFlat } from './styles';
import ListDetails from '../../Components/ListDetails';
import { getStorage, setStorage } from '../../Utils/Storage';


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

const MonthsDetails: React.FC = (props: any) => {

  const [dateMonth, setDataMonth] = useState<pucharseMensalProps[]>([])
  const [pusharseMensal, setPucharseMensal] = useState<pucharseMensalProps[]>([])
  const [spendingMonth, setSpendingMonth] = useState(0)
  const [remaining, setRemaining] = useState(0)

useEffect(() => {
  setTimeout(() => {
    buscarDado().then(e => { });
  }, 1000)
  setDataMonth(props.route.params.data.sort(function(a:any, b:any){return a.payment - b.payment}))
},[])

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
  if(dateMonth){
    setSpendingMonth(dateMonth.reduce(function (accumulator: any, value: pucharseMensalProps) {
      return accumulator + value.valueInstallment
    }, 0))
    setDataMonth(props.route.params.data.sort(function(a:any, b:any){return a.payment - b.payment}))
  }
},[dateMonth])

useEffect(() => {
  if(spendingMonth){
    setRemaining((props.route.params.income.income - spendingMonth))
  }
},[spendingMonth])


const handleIncome = (item: pucharseMensalProps, index: number) => {
let paymentUp = [item.id]
const itemPayment = pusharseMensal.filter(itens => itens.id === item.id)
console.log(itemPayment)
  if(itemPayment[0].payment === false){
    let result = pusharseMensal.reduce((acc, o) => {

      let obj = paymentUp.includes(o.id) ? Object.assign(o, itemPayment[0].payment === false ? { payment: true } : { payment: true }  ) : o;
  
      acc.push(obj);
  
      return acc;
  
  }, []);
  setStorage('PucharseMensal', result)
  let result1 = dateMonth.reduce((acc, o) => {
  
    let obj = paymentUp.includes(o.id) ? Object.assign(o, { payment: true }) : o;
  
    acc.push(obj);
  
    return acc;
  
  }, []);
  setDataMonth([])
  setDataMonth(result1)
  }else{
    let result = pusharseMensal.reduce((acc, o) => {

      let obj = paymentUp.includes(o.id) ? Object.assign(o, { payment: false }) : o;
  
      acc.push(obj);
  
      return acc;
  
  }, []);
  setStorage('PucharseMensal', result)
  let result1 = dateMonth.reduce((acc, o) => {
  
    let obj = paymentUp.includes(o.id) ? Object.assign(o, { payment: false }) : o;
  
    acc.push(obj);
  
    return acc;
  
  }, []);
  setDataMonth([])
  const test = result1.sort(function(a:any, b:any){return a.payment - b.payment})
  setDataMonth(test)
  }
}

  return (
    <SafeBackground isHome={false} title={props.route.params.title} >
      <CardInfo
        titleCardPrimary1={`Gasto total do mês de ${props.route.params.title}`}
        valuePrimary1={spendingMonth}
        titleCardSecundary='Saldo restante para gastos'
        valueSecudary={remaining}
      />

      <ViewLegend>
        <ViewText>
          <TextLegend>Lista detalhada :</TextLegend>
        </ViewText>
        <ViewIndice>
          <ViewItem>
            <Icon name="checkcircle" size={14} color="#ff9000" />
            <TextItem>Pagas</TextItem>
          </ViewItem>
          <ViewItem>
            <IconNot name="circle" size={14} color="#ff9000" />
            <TextItem>Não Pagas</TextItem>
          </ViewItem>
        </ViewIndice>
      </ViewLegend>

      <ViewFlat>
        <FlatList
          data={dateMonth}
          extraData={dateMonth}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item, index }) => (
            <ListDetails
              value={item.valueInstallment}
              title={item.nameCard}
              dateSpeding={item.datePurchase}
              installments={item.installment}
              numberInstallment={item.numberInstallment}
              datePayment={item.datePayment}
              paid={item.payment}
              onPress={() => handleIncome(item, index)}
            />
          )}
          keyExtractor={(item) => `${item.valuePurchase}`}
        />

      </ViewFlat>
    </SafeBackground>
  );
}

export default MonthsDetails;