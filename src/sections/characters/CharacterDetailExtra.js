import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import { colors } from 'marvelApp/src/commons'

export default class CharacterDetailExtra extends Component {

    static defaultProps = {
        items: {},
        info: ''
    }

    renderItem(item, index) {

        return (
            <Text style={styles.itemInfo}>{item.name}</Text>
        )
    }

    render() {

        const { items, info } = this.props

        return (<View>
            <Text style={styles.typeTitle}>{info}</Text>
            {<FlatList

                data={this.props.items}
                renderItem={({ item, index }) => this.renderItem(item, index)}
                keyExtractor={(item, index) => index}
                extraData={this.props}
                numColumns={1}
            />
            }
        </View>)

    }
}

const styles = StyleSheet.create({

    typeTitle: {
        color: 'rgb(255,0,0)',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    itemInfo: {
        color: 'rgb(255,0,0)',
        fontSize: 12,

    }

})