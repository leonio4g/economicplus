import React from 'react';
import { View } from 'react-native';

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
    valuePrimary1?: number;
    titleCardPrimary2?: string;
    valuePrimary2?: number;
    titleCardSecundary?: string,
    valueSecudary?: number
    info?: string
}

const CardInfo: React.FC<cardProps> = ({
    solo,
    titleCardPrimary1,
    valuePrimary1,
    titleCardPrimary2,
    valuePrimary2,
    titleCardSecundary,
    valueSecudary,
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
                                <TextValue>R$ {valuePrimary1}</TextValue>
                            </ViewText>
                        </ViewMensal>
                        {titleCardPrimary2 &&
                        <ViewSpeding>
                        <TextTitle>{titleCardPrimary2}</TextTitle>
                        <ViewText>
                            <TextValue>R$ {valuePrimary2}</TextValue>
                        </ViewText>
                    </ViewSpeding>
                        }
                    </Container>
                    <Container>
                        <ViewSpeding>
                            <TextTitle>{titleCardSecundary}</TextTitle>
                            <ViewText>
                                <TextValue>R$ {valueSecudary}</TextValue>
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