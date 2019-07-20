import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Overlay } from 'react-native-elements';

import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

import ChatScreen from "./src/components/ChatScreen";
import StatusScreen from "./src/components/StatusScreen";
import CallScreen from "./src/components/CallScreen";
import CameraScreen from "./src/components/CameraScreen";
import ContactsScreen from "./src/components/ContactsScreen";
import ViewCapturePhoto from "./src/components/ViewCapturePhoto";

export default class App extends React.Component {
  state = {
    isVisible: false,
  }
  render() {
    if(this.state.isVisible) (<Overlay isVisible={this.state.isVisible}>
      <Text>Hello from Overlay!</Text>
    </Overlay>)
    return <AppContainer />;
  }
}

const topTabBar = createMaterialTopTabNavigator(
  {
    camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-camera" color="#fff" size={28} />
        ),
        showLabel: () => {
          return null
        },
        tabBarOptions:{
          showLabel: false
        },
        headervisible: false
      }
    },
    chat: ChatScreen,
    status: StatusScreen,
    calls: CallScreen
  },
  {
    initialRouteName: "chat",
    tabBarOptions: {
      showIcon: true,
      style: {
        backgroundColor: "#047a6c"
      },
    }
  }
);

const stackNavigator = createStackNavigator(
  {
    home: topTabBar,
    contacts: ContactsScreen,
    viewPhoto: ViewCapturePhoto
  },
  {
    initialRouteName: "home",
    defaultNavigationOptions: {
      title: "WhatsApp",
      headerStyle: {
        backgroundColor: "#047a6c",
        justifyContent: "space-between"
      },
      headerBackTitle: null,
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff"
      },
      headerTitleContainerStyle: {
        elevation: 0,
        borderBottomWidth: 0
      },
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="md-search" color="#fff" size={28} />
          <Entypo
            style={{ marginLeft: 10 }}
            onPress={() => this.setState({isVisible: true})}
            name="dots-three-vertical"
            color="#fff"
            size={25}
          />
        </View>
      )
    }
  }
);

const AppContainer = createAppContainer(stackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
