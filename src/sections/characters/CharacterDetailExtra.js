import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import { colors } from 'marvelApp/src/commons'

export default class CharacterDetailExtra extends Component {

    static defaultProps = {
        items: {},
        info: ''
    }

    renderItem(item, index) {

        return <Text style={styles.itemInfo}>{'- ' + item.name}</Text>
    }

    render() {

        const { items, info } = this.props

        return (<View>
            <Text style={styles.typeTitle}>{info}</Text>
            {<FlatList
                style={styles.list}
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
        color: colors.title,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    list: {
        padding: 5
    },

    itemInfo: {
        color: colors.text,
        fontSize: 13
    }

})