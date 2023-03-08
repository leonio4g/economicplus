import React from 'react';
import { KeyboardTypeOptions, ReturnKeyTypeOptions, Text, View, TextInputProps } from 'react-native';

import { Container,TextLabel, TextInput, ViewTextInput } from './styles';

interface inputProps {
    secureTextEntry?: boolean;
    placeholder: string;
    placeholderTextColor: string;
    keyboardType?: KeyboardTypeOptions | undefined;
    returnKeyType?: ReturnKeyTypeOptions;
    Label: string;
    multiline?: boolean;
    //onChangeText: (text : string) => void
  }

const Input: React.FC<inputProps & TextInputProps> = ({
    secureTextEntry,
    returnKeyType,
    keyboardType,
    placeholder,
    Label,
    multiline,
    value,
    placeholderTextColor,
    //onChangeText,
    ...rest
}) => {
  return (
    <Container>
        <TextLabel>{Label}</TextLabel>
        <ViewTextInput>
        <TextInput 
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        ///onChangeText={onChangeText}
        {...rest}
        placeholderTextColor={placeholderTextColor}

        />
        </ViewTextInput>
    </Container>
  );
}

export default Input;