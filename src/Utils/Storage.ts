import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setStorage(NameObject: string, Object: any) {
  try {
    await AsyncStorage.setItem(`@${NameObject}`, JSON.stringify(Object));
  } catch (error) {
    console.warn(error);
  }
}

export const getStorage = async (NameObject: string) => {
  try {
    const getObject = await AsyncStorage.getItem(`@${NameObject}`)
    return JSON.parse(<string>getObject)
  } catch (e) {
    console.error(e)
  }
}
