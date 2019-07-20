import React from "react";
import { View, Text } from "react-native";
import * as Contacts from "expo-contacts";
import * as Permissions from "expo-permissions";
// import { Contacts, Permissions } from "expo";

export default class ContactsScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: "Select contact",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "#047a6c"
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "#fff",
      fontSize: 18
    }
  });

  contactPermission = async () => {
    const status = await Permissions.getAsync(Permissions.CONTACTS);
    if (status !== "granted") return;
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

    if (data.length > 0) {
      const contact = data[0];
      console.log(contact);
    }
  };

  async componentWillMount() {
    console.log("mounted");
    this.contactPermission();
  }

  render() {
    return (
      <View>
        <Text>hi</Text>
      </View>
    );
  }
}
