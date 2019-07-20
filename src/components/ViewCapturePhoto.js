import React from 'react';
import { View, Image, Text } from "react-native";

export default class ViewCapturePhoto extends React.Component {
    constructor(props) {
        super(props)
    };

    render(){
        let photo = this.props.navigation.getParam("photo", "empty")
        return(
            <View>
                <Text>Hi camera {photo}</Text>
                {/* <Image resizeMode="contain" source={{uri: props.navigation.getParam("photo", "empty")}} /> */}
            </View>
        )
    }
}