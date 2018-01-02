import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import * as CharactersAction from 'marvelApp/src/redux/actions/characters'
import CharacterDetailExtra from './CharacterDetailExtra'
import { colors } from 'marvelApp/src/commons'

class CharacterDetail extends Component {
    render() {

        
        const { character } = this.props
        console.log('character:', character)
        const image = character && character.thumbnail ? { uri: character.thumbnail.path + '/landscape_amazing.jpg' } : null
        const description = character && character.description ? character.description : null
        const comics = character && character.comics && character.comics.items ? character.comics.items : null
        const events = character && character.events && character.events.items ? character.events.items : null        
        const series = character && character.series && character.series.items ? character.series.items : null
        const stories = character && character.stories && character.stories.items ? character.stories.items : null
        
        return (
            <View style={styles.container}>
                <Image source={image} style={styles.image} resizeMode={'cover'} />
                { description ? <Text style={styles.description}>{description}</Text> : null }
                <View style={[styles.container, {padding: 5}]}>
                { comics && comics.length > 0 ? <CharacterDetailExtra items={comics} info='Comics'/> : null }
                { events && events.length > 0 ? <CharacterDetailExtra items={events} info='Events'/> : null }
                { series && series.length > 0 ? <CharacterDetailExtra items={series} info='Series'/> : null }
                { stories && stories.length > 0 ? <CharacterDetailExtra items={stories} info='Stories'/> : null }                 
                </View>
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

    description: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: colors.title,
        alignItems: 'center',
        padding: 5
    },

    image: {
        width: '100%',
        height: 200,
    },

    buttonContainer: {
        margin: 20,
    },
});