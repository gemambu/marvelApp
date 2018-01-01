import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import * as CharactersAction from 'marvelApp/src/redux/actions/characters'
import { colors } from 'marvelApp/src/commons'

class CharacterDetail extends Component {
    render() {

        const { character } = this.props
        const image = character && character.thumbnail ? { uri: character.thumbnail.path + '/landscape_amazing.jpg' } : null

        const description = character && character.description ? character.description : 'No description added yet'
        return (
            <View style={styles.container}>
                <Image source={image} style={styles.image} resizeMode={'cover'} />
                <Text style={styles.text}>{description}</Text>                
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

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    text: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: colors.title,
        alignItems: 'center',
        padding: 10
    },

    image: {
        width: '100%',
        height: 200,
    },

    buttonContainer: {
        margin: 20,
    },
});