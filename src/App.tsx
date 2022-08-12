import * as React from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {AuthProvider} from "./AuthContext";
import MasterScreen from "./screens/MasterScreen";

const App = () => (
    <AuthProvider>
        <GestureHandlerRootView style={{flex: 1}}>
            <MasterScreen/>
        </GestureHandlerRootView>
    </AuthProvider>
)


export default App;