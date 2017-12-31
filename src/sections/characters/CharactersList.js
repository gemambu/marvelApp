import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import * as CharactersActions from 'marvelApp/src/redux/actions/characters'
import CharacterCell from './CharacterCell'
import { colors, constants } from 'marvelApp/src/commons'

class CharactersList extends Component {

    constructor(props){
        super(props)

        // with this
        this.renderItem = this.renderItem.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentWillMount(){
       this.props.initCharactersList()
    }

    onSelect(character){
        this.props.updateCharacterSelected(character)
    }

    renderItem(item, index) {

        return (
            <CharacterCell
                item={item}
                onSelect={(character) => this.onSelect(character)}
            />
        )
    }

    onEndReached(){
        console.log('ON END REACHED')

        if (this.props.list.length < this.props.total && !this.props.isFetching) {
            let newOffset = this.props.offset + constants.LIST_CHARACTERS_OFFSET
            this.props.fetchCharacters(newOffset)
        }
    }

    renderHeader() {
        if(this.props.isFetching){
            return (
                <View>
                    <ActivityIndicator
                    animating={this.props.isFetching}
                    size='large'
                    color='#FABADA'
                    style={styles.activityIndicator} />
                </View>
            )
        } else {
            return null
        }
        
    }

    render() {

        return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Comics</Text>
                { <FlatList
                
                    data={this.props.list}
                    ListHeaderComponent={() => this.renderHeader()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    onEndReached = {() => this.onEndReached()}
                    keyExtractor={(item, index) => item.id}
                    extraData={this.props}
                    numColumns={1}
                /> }
        </View>)
    }

    
}

const mapStateToProps = (state) => {

    return {
        list        : state.characters.list,
        isFetching  : state.characters.isFetching,
        total       : state.characters.total,
        offset      : state.characters.offset,
    }
}

const mapDispatchToProps = (dispatch, props) => {

    return {
        initCharactersList: () => {
            dispatch(CharactersActions.initCharactersList())
        },
        fetchCharacters: (offset) => {
            dispatch(CharactersActions.updateCharactersListOffset(offset))
            dispatch(CharactersActions.fetchCharactersList())
        },
        updateCharacterSelected: (character) => {
            dispatch(CharactersActions.updateCharacterSelected(character))
            Actions.CharacterDetail( { title: character.name} )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingTop: 40,
        backgroundColor: 'black'
    },

    activityIndicator: {
        marginVertical: 50
    }
});
