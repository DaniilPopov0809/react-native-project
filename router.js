import React from "react";


import { View, StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import RegistrationScreen from "./src/Screens/auth/RegistrationScreen";
import LoginScreen from "./src/Screens/auth/LoginScreen";
import PostsScreen from "./src/Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./src/Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./src/Screens/mainScreen/ProfileScreen";

import LogoutButton from "./src/components/LogoutButton/LogoutBotton";
import BackButton from "./src/components/BackButton/BackBotton";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRouting = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#ffffff" },
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontWeight: "500",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.408,
          color: "#212121",
          // shadowColor: "#000",
          // shadowOffset: { width: 0, height: 0.5 },
          // shadowOpacity: 0.3,
          // shadowRadius: 1,
          // elevation: 2,
        },
      }}
    >

      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                backgroundColor: focused ? "#FF6C00" : "transparent",
                borderRadius: focused ? 20 : 0,
                paddingVertical: 8,
                paddingHorizontal: 23,
              }}
            >
              <Feather
                name="grid"
                size={size}
                color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
              />
            </View>
          ),
          // headerShown: route.name !== 'MapScreen' || route.name !== 'CommentsScreen',
          headerTitle: "Публикации",
          headerTitleAlign: "center",
          contentOptions: { backgroundColor: "#FFFFFF" },
          headerRight: () => <LogoutButton />,
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
      
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                backgroundColor: focused ? "#FF6C00" : "transparent",
                borderRadius: focused ? 20 : 0,
                paddingVertical: 8,
                paddingHorizontal: 23,
              }}
            >
              <Feather
                name="plus"
                size={size}
                color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
              />
            </View>
          ),
          headerTitle: "Создать публикацию",
          headerTitleAlign: "center",
          headerLeft: () => <BackButton />,
        }}
        name="CreatePost"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                backgroundColor: focused ? "#FF6C00" : "transparent",
                borderRadius: focused ? 20 : 0,
                paddingVertical: 8,
                paddingHorizontal: 23,
              }}
            >
              <Feather
                name="user"
                size={size}
                color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

