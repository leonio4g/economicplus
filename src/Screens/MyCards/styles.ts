import styled from 'styled-components/native';

export const Container = styled.View<{color: string}>`
background-color: #3e3b47;
border-radius: 12px
margin-horizontal: 15px
padding: 10px
margin-top: 10px
margin-bottom: 5px
border-color: ${({color}) => color ? color : '#ff9000'}
border-width: 1;
`;
export const Content = styled.View`
flex-direction: row;
width: 100%
`;
export const ViewIcon = styled.View<{color: string}>`
justify-content: center
border-right-color: ${({color}) => color ? color : '#ff9000'}
border-right-width: 1;
padding-right: 10px;
margin-left: 10px;
width: 17%;
`;
export const TextTitle = styled.Text`
color: #ffffff
font-size: 15px
font-weight: bold
`;
export const ViewText = styled.View`
margin-left: 15px
width: 66%
`;
export const ViewDelete = styled.View`
width: 20%
justify-content: center
`;
export const ViewSubText = styled.View`
flex-direction: row
`;
export const TextSubTitle = styled.Text`
margin-right: 10
color: #ffffff
font-size: 12px
`;