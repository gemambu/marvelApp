import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as CharactersActions from 'marvelApp/src/redux/actions/characters'
import CharacterCell from './CharacterCell'
import * as Constants from '../../commons/constants'

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
            let newOffset = this.props.offset + Constants.LIST_CHARACTERS_OFFSET
            this.props.fetchCharacters(newOffset)
        }
    }

    render() {

        return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Comics</Text>
                { <FlatList
                
                    data={this.props.list}
                    //ListHeaderComponent={() => this.renderHeader()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    onEndReached = { this.onEndReached }
                    keyExtractor={(item, index) => item.id}
                    extraData={this.props}
                    numColumns={1}
                /> }
        </View>)
    }
}

const mapStateToProps = (state) => {

    return {
        list: state.characters.list,
        isFetching: state.characters.isFetching
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingTop: 40,
        backgroundColor: 'black'
    }
});
