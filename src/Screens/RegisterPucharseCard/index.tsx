import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Button from '../../Components/Button';
import CardInfo from '../../Components/CardInfo';
import Input from '../../Components/Input';
import { maskDate } from '../../Utils/format';
import Dropdown from 'react-native-input-select';
import SelectDropdown from 'react-native-select-dropdown'
import SafeBackground from '../../Components/SafeBackground';

import { Container, ViewInputs, ViewButton, TextTitleDrop } from './styles';
import { getStorage, setStorage } from '../../Utils/Storage';
import moment from 'moment';


interface cardProps {
    nameCard: string;
    maturity: string;
    closed: string;
}

interface pucharseProps {
    id: number;
    nameCard: string;
    installment: number;
    datePurchase: string;
    valuePurchase: string;
    valueInstallment: number;
    payment: boolean;
}
interface pucharseMensalProps {
    id: number;
    nameCard: string;
    installment: number;
    datePurchase: string;
    datePayment: string;
    valuePurchase: string;
    valueInstallment: number;
    payment: boolean;
    numberInstallment: number;
    dateSequentialMensal: string;
    months: string;
}

const RegisterPucharseCard: React.FC = (props: any) => {
    const navigation = useNavigation();
    const [storeCard, setStoreCard] = useState<cardProps[]>([])
    const [storePucharse, setStoragePucharse] = useState<pucharseProps[]>([])
    const [pusharseMensal, setPucharseMensal] = useState<pucharseMensalProps[]>([])

    const [valuePucharse, setValuePucharse] = useState('')
    const [installments, setInstallments] = useState('')
    const [datePucharse, setDatePucharse] = useState('')
    const [selectCard, setSelectCard] = useState('')
    const [optionsCard, setOptionsCard] = useState([''])


    useEffect(() => {
        setTimeout(() => {
            buscarDado().then(e => { });
        }, 1000)
    }, []);


    const buscarDado = async () => {

        const storeSaveCard = await getStorage('dataCard');
        const storeSavePurcharse = await getStorage('PucharseCard');
        const storeSaveListMensal = await getStorage('PucharseMensal')
        console.log(storeSaveCard)
        console.log(storeSavePurcharse)
        if (storeSaveCard) {
            setStoreCard(storeSaveCard)
            const namesCard: Array<string> = storeSaveCard.map(item => item.nameCard)
            setOptionsCard(namesCard)
        }
        if (storeSavePurcharse) {
            setStoragePucharse(storeSavePurcharse)
        }
        if (storeSaveListMensal) {
            setPucharseMensal(storeSaveListMensal)
        }
        console.log(pusharseMensal)
    };


    useEffect(() => {
        console.log(selectCard)
    }, [selectCard])

    const handleValuePucharse = (value: string) => {
        console.log(value)
        setValuePucharse(value)
    }
    const handleDatePucharse = (value: string) => {
        setDatePucharse(maskDate(value))
    }

    const handleInstallments = (value: any) => {
        if (value.length <= 10) {
            setInstallments(value)
        }
    }

    const handleRegister = () => {
        storePucharse.push({
            id: parseInt(Math.random() * 99999999),
            nameCard: selectCard,
            installment: parseInt(installments),
            datePurchase: datePucharse,
            valuePurchase: valuePucharse,
            valueInstallment: (parseInt(valuePucharse) / parseInt(installments)),
            payment: false
        })
        setStorage('PucharseCard', storePucharse)

        for (var i = 1; i <= parseInt(installments); i++) {
            const mesAtual = storeCard.filter(item => item.nameCard == selectCard)
            const day = moment().format("DD")
            var active = false
            if (parseInt(day) >= parseInt(mesAtual[0].closed)) {
                active = true
            } else {
                active = false
            }
            pusharseMensal.push({
                id: parseInt(Math.random() * 99999999),
                nameCard: selectCard,
                installment: parseInt(installments),
                datePurchase: datePucharse,
                valuePurchase: valuePucharse,
                valueInstallment: (parseInt(valuePucharse) / parseInt(installments)),
                payment: false,
                datePayment:`${mesAtual[0].maturity}/${moment().format("MM/yyyy")}` ,
                numberInstallment: i,
                dateSequentialMensal: i == 1 ? moment().format("DD/MM/yyyy") : !active ? moment().add(i - 1, 'month').format("DD/MM/yyyy") : moment().add(i, 'month').format("DD/MM/yyyy"),
                months: i == 1 ? moment().format("MMMM") : !active ? moment().add(i - 1, 'month').format("MMMM") : moment().add(i, 'month').format("MMMM"),
            })
        }
        console.log(pusharseMensal)
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
                    <View style={{ marginHorizontal: 18, marginTop: 15 }} >
                        <SelectDropdown
                            data={optionsCard}
                            defaultButtonText='Qual cartão foi usado ?'
                            buttonStyle={{ backgroundColor: "#28262e", borderRadius: 12, width: "100%", justifyContent: 'flex-start' }}
                            buttonTextStyle={{ color: "#ffff" }}
                            onSelect={(selectedItem, index) => {
                                setSelectCard(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {

                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                    <Input
                        Label='Qual valor da compra ?'
                        placeholder='320'
                        keyboardType='numeric'
                        placeholderTextColor='#999591'
                        onChangeText={handleValuePucharse}
                        value={valuePucharse}
                    />
                    <Input
                        Label='Quantidade de parcelas ?'
                        placeholder='3'
                        keyboardType='numeric'
                        placeholderTextColor='#999591'
                        onChangeText={handleInstallments}
                        value={installments}
                    />
                    <Input
                        Label='Data da compra :'
                        placeholder='22/02/2023'
                        onChangeText={handleDatePucharse}
                        value={datePucharse}
                        keyboardType='numeric'
                        placeholderTextColor='#999591'

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

export default RegisterPucharseCard;