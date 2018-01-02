import React, { Component } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from 'marvelApp/src/commons'

export default class Button extends Component {

    static defaultProps = {
        labelStyle: {},
        containerStyle: {},
        spinnerColor: 'black',
        label: '',
        onPress: () => { },
        isFetching: false,

    }

    _onPress() {
        if (!this.props.isFetching) {
            this.props.onPress()
        }
    }

    addSpinner() {

        const Spinner = require('react-native-spinkit')

        return (
            <View style={styles.spinner}>
                <Spinner type={'FadingCircleAlt'} color={colors.activityIndicator} size={60} />
            </View>
        )
    }
    render() {



        return (
            <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => this._onPress()} >
                <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                {this.props.isFetching ? this.addSpinner() : null}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(192,192,192,0.4)',
        borderRadius: 4,
        flexDirection: 'row',
    },

    label: {
        color: colors.title,
        fontWeight: '600',
        fontSize: 16,
    },
    
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',

    },
})