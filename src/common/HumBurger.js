import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export default class HamBurger extends Component {
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)} style={{marginLeft: 10,padding:10 }}>
                    <Image
                        source={require('../../assets/Images/Hamburger.png')}
                        style={{ height: 30, width: 30, }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}