import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #3e3b47;
  border-radius: 12px
  margin-horizontal: 15px
  padding: 10px
  margin-top: 5px
  margin-bottom: 5px
`;
export const Content = styled.View`
flex-direction: row;
width: 100%
`;
export const ViewIcon = styled.View`
  border-right-color: #ff9000;
  border-right-width: 1;
  padding-right: 10px;
  margin-left: 10px;
  width: 17%;
`;
export const ViewText = styled.View`
  margin-left: 15px
  align-items: center
  justify-content: center
  width: 62%
`;
export const TextTitle = styled.Text`
  color: #ffffff
  font-size: 15px
  font-weight: bold
  text-transform: uppercase

`;
export const TextTotal = styled.Text`
color: #ffffff
font-size: 15px
`;
export const ViewButton = styled.View`
width: 20%
`;
