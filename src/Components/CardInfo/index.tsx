import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import IconPlus from 'react-native-vector-icons/AntDesign'

import {
    Container,
    ViewMensal,
    TextTitle,
    TextValue,
    ViewSpeding,
    ViewText
} from './styles';

interface cardProps {
    solo?: boolean
    titleCardPrimary1?: string;
    valuePrimary1?: string;
    titleCardPrimary2?: string;
    valuePrimary2?: string;
    titleCardSecundary?: string,
    valueSecudary?: string
    info?: string
    addMoney?: () => void;
}

const CardInfo: React.FC<cardProps> = ({
    solo,
    titleCardPrimary1,
    valuePrimary1,
    titleCardPrimary2,
    valuePrimary2,
    titleCardSecundary,
    valueSecudary,
    addMoney,
    info
}) => {
    return (
        <>
            {!solo ?
                <>
                    <Container>
                        <ViewMensal>
                            <TextTitle>{titleCardPrimary1}</TextTitle>
                            
                            <ViewText>
                                <TextValue>{valuePrimary1}</TextValue>
                                <TouchableOpacity style={{marginLeft: 10}} onPress={addMoney} >
                                <IconPlus name="pluscircleo" size={20} color="#ff9000" />
                            </TouchableOpacity>
                            </ViewText>
                        </ViewMensal>
                        {titleCardPrimary2 &&
                            <ViewSpeding>
                                <TextTitle>{titleCardPrimary2}</TextTitle>
                                <ViewText>
                                    <TextValue>{valuePrimary2}</TextValue>
                                </ViewText>
                            </ViewSpeding>
                        }
                    </Container>
                    <Container>
                        <ViewSpeding>
                            <TextTitle>{titleCardSecundary}</TextTitle>
                            <ViewText>
                                <TextValue>{valueSecudary}</TextValue>
                            </ViewText>
                        </ViewSpeding>
                    </Container>
                </>
                :
                <Container>
                    <ViewSpeding>
                        <TextTitle>{info}</TextTitle>
                    </ViewSpeding>
                </Container>
            }
        </>
    );
}

export default CardInfo;