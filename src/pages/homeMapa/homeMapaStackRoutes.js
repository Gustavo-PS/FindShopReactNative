import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import NavMapa from "./navMapa";
import HomeMapa from "./homeMapa";

export function HomeMapaStackRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false}}>
            <Screen
                name='HomeMapa'
                component={HomeMapa}
            />
            <Screen
                name='NavMapa'
                component={NavMapa}
            />
        </Navigator>
    )
}