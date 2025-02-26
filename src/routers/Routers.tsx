import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen/ForgotPassScreen';
import HomeScreen from '../screens/MainScreen/MainScreen';
import OnBoardSceeen from '../screens/OnBoardScreen/OnBoardScreen';
import VerifyEmailScreen from '../screens/RegisterScreen/VerifyEmailScreen';
import VerifyOtpScreen from '../screens/RegisterScreen/VerifyOtpScreen';
import MainScreen from '../screens/MainScreen/MainScreen';

const Routers = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard">
        <Stack.Screen
          name="OnBoard"
          component={OnBoardSceeen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {backgroundColor: '#000000'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {backgroundColor: '#000000'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmailScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {backgroundColor: '#000000'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtpScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {backgroundColor: '#000000'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: '#000000'},
            headerTintColor: '#FFFFFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
