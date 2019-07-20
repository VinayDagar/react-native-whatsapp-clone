import React from "react";
import { View, Text, TouchableOpacity, CameraRoll } from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerVisible: false
  };
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  capturePhoto = async () => {
    console.log('capture',this.camera)
    if(this.camera){
      const photo = await this.camera.takePictureAsync();
      // console.log('clicked', photo)
      CameraRoll.saveImageWithTag(photo)
      this.props.navigation.navigate("viewPhoto", {photo})
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={(ref) => this.camera = ref} flashMode={this.state.flashMode} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", right: 15, bottom: 15 }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <AntDesign name="retweet" color="#fff" size={35} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{left: 140, bottom: 15, position: 'absolute'}}
                onPress={ () => {this.capturePhoto()}}
              >
                <Entypo name="circle" size={45} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ position: "absolute", left: 15, bottom: 15 }}
                onPress={() => {
                  this.setState({
                    flashMode:
                      this.state.flashMode === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                  });
                }}
              >
                <FontAwesome name="flash" color="#fff" size={35} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
