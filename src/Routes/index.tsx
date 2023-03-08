import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './app.routeDrawer'
import { AppRoutes } from './app.routes';

export function Routes() {
    return (
        <NavigationContainer>
            <DrawerMenu />
        </NavigationContainer>
    )
}