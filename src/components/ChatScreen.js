import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class ChatScreen extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text> Chat list component </Text>
                <View style={styles.contactIcon}>
                    <MaterialIcons onPress={() => this.props.navigation.navigate('contacts')} name="chat" color="#fff" size={28} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contactIcon: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: '#047a6c',
        color: "#fff",
        bottom: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    }
})