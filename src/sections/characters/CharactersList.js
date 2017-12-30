import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as CharactersActions from 'marvelApp/src/redux/actions/characters'
import CharacterCell from './CharacterCell'

class CharactersList extends Component {

    componentWillMount(){
       this.props.fetchCharacters()
    }

    renderItem(item, index) {

        return (
            <CharacterCell
                item={item}
                onSelect={(character) => this.onSelect(character)}
            />
        )
    }

    render() {

        return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Comics</Text>
                { <FlatList
                
                    data={this.props.list}
                    //ListHeaderComponent={() => this.renderHeader()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
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
        fetchCharacters: () => {
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
