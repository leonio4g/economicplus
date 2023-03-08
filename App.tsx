import React from 'react';
import { Routes } from './src/Routes';
import { StatusBar } from 'react-native'

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <>
    <StatusBar backgroundColor={"#28262e"} />
    <Routes />
    </>

  );
}

export default App;