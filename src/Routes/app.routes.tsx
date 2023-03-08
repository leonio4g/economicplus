import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { Navigator, Screen } = createNativeStackNavigator();

import Home from '../Screens/Home'
import RegisterCard from "../Screens/RegisterCard"
import MonthsDetails from '../Screens/MonthsDetails';
import RegisterPucharseCard from '../Screens/RegisterPucharseCard';
import RegisterPucharseMoney from '../Screens/RegisterPucharseMoney'
import MyCard from '../Screens/MyCards'
import Report from '../Screens/Reporte'
import PurchaseIncome from '../Screens/PurchaseIncome'

export function AppRoutes() {
    return (
        <Navigator 
        initialRouteName='home'
        screenOptions={{ headerShown: false }}>
            <Screen
                name='home'
                component={Home}
            />

            <Screen
                name="registercards"
                component={RegisterCard}
            />
            <Screen
                name="MonthsDetails"
                component={MonthsDetails}
            />
            <Screen
                name="RegisterPucharseCard"
                component={RegisterPucharseCard}
            />
            <Screen
                name="RegisterPucharseMoney"
                component={RegisterPucharseMoney}
            />
            <Screen
                name="myCard"
                component={MyCard}
            />
            <Screen
                name="report"
                component={Report}
            />
            <Screen
                name="purchaseIncome"
                component={PurchaseIncome}
            />
        </Navigator>
    )
}
