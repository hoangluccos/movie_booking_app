import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./tabs/HomeScreen";
import ProfileScreen from "./tabs/ProfileScreen";
import MovieScreen from "./tabs/MovieScreen";
import { Image } from "react-native";
import MyTicketScreen from "./tabs/MyTicketScreen";

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#FCC434",
        tabBarInactiveTintColor: "#CCCCCC",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/images/home_icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#FCC434" : "#CCCCCC",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My ticket"
        component={MyTicketScreen}
        options={{
          headerShown: false,
          title: "My ticket",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/images/ticket_icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#FCC434" : "#CCCCCC",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          headerShown: false,
          title: "Movie",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/images/movie_icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#FCC434" : "#CCCCCC",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/images/profile_icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#FCC434" : "#CCCCCC",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
