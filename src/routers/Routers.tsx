import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import ForgotPassScreen from "../screens/ForgotPassScreen/ForgotPassScreen";
import HomeScreen from "../screens/MainScreen/MainScreen";
import OnBoardSceeen from "../screens/OnBoardScreen/OnBoardScreen";
import VerifyEmailScreen from "../screens/RegisterScreen/VerifyEmailScreen";
import VerifyOtpScreen from "../screens/RegisterScreen/VerifyOtpScreen";
import MainScreen from "../screens/MainScreen/MainScreen";
import MovieDetail from "../screens/MovieDetail/MovieDetail";
import TicketScreen from "../screens/TicketScreen/TicketScreen";
import ProfileInfoScreen from "../screens/ProfileInfoScreen/ProfileInfoScreen";
import SeatScreen from "../screens/SeatScreen/SeatScreen";
import PaymentScreen from "../screens/PaymentScreen/PaymentScreen";
import SuccessScreen from "../screens/PayFlow/SuccessScreen";
import ErrorScreen from "../screens/PayFlow/ErrorScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen/ChangePasswordScreen";

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
            headerTitle: "",
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
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
            headerTitle: "",
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtpScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="TicketScreen"
          component={TicketScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="ProfileInfoScreen"
          component={ProfileInfoScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="SeatScreen"
          component={SeatScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="ErrorScreen"
          component={ErrorScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="LogInScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
