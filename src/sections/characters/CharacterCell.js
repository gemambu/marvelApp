import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'

export default class CharacterCell extends Component {

    static defaultProps = {
        onSelect: () => { },
        item: {},

    }

    render() {

        const { item, onSelect } = this.props
        const image = item && item.thumbnail ? { uri: item.thumbnail.path + '/landscape_amazing.jpg' } : null

        return (
            <TouchableOpacity onPress={() => onSelect(item)}>

                <Image source={image} style={styles.image} resizeMode={'cover'} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        margin: 10,
        width: Dimensions.get('window').width,
        height: 200,

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255,255,255,0.1)',
                shadowOpacity: 1,
                shadowOffset: { height: 4, width: 4 },
                shadowRadius: 2
            },
            android: {
                elevation: 4
            }
        })
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },

    name: {
        textAlign: 'right',
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    image: {
        width: '100%',
        height: 200,
    }
})