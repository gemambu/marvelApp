import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import * as CharactersAction from 'marvelApp/src/redux/actions/characters'

class CharacterDetail extends Component {
    render() {

        const { character } = this.props
         console.log('character: ', character)
        return (
            <View>
                <Text>{'Nombre: ' + character.name}</Text>
                <Text>{'Description: ' + character.description}</Text>
                
            </View>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}



export default connect(mapStateToProps, null)(CharacterDetail)