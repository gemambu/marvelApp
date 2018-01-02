import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { colors } from 'marvelApp/src/commons'

export default class Input extends Component {

    static defaultProps = {
        labelStyle: {},
        inputStyle: {},
        errorStyle: {},
        label: '',
        value: '',
        error: '',
        maxLength: 20,
        multiline: false,
        numberOfLines: 1,
        placeHolder: '',
        onChangeText: () => { }

    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                <TextInput
                    style                   = { [styles.input, this.props.inputStyle] }
                    onChangeText            = { (v) => this.props.onChangeText(v) }
                    placeholder             = { this.props.placeHolder }
                    placeholderTextColor    = { 'grey' }
                    maxLength               = { this.props.maxLength }
                    multiline               = { this.props.multiline }
	                numberOfLines           = { this.props.numberOfLines }
                    value                   = { this.props.value }
                    underlineColorAndroid   = { 'transparent' }
                />

                { this.props.error ? <Text style={[styles.error, this.props.errorStyle]}>{this.props.error}</Text> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

    },

    error: {
        color: colors.warningInput,
        textAlign: 'right',
        marginTop: 4,
    },

    input: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        fontSize: 16,
        color: 'black',

    },

    label: {
        color: 'black',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '600',
    },
})