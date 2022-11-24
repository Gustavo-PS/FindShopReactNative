import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import NavMapa from "./navMapa";
import Lista from "./lista";

export function ListaStackRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false}}>
            <Screen
                name='Lista'
                component={Lista}
            />
            <Screen
                name='NavMapa'
                component={NavMapa}
            />
        </Navigator>
    )
}