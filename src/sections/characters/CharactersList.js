import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as CharactersActions from 'marvelApp/src/redux/actions/characters'

class CharactersList extends Component {

    componentWillMount(){
       this.props.fetchCharacters()
    }

    renderItem(item, index) {

        return <View>
            <Text>
                {item.name}
            </Text>
            </View>
        // return (
        //     <HousesCell
        //         item={item}
        //         onSelect={(house) => this.onSelect(house)}
        //     />
        // )
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
                    numColumns={2}
                /> }
        </View>)
    }
}

const mapStateToProps = (state) => {
    console.log('State: ', state)
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
        paddingTop: 40 
    }
});
