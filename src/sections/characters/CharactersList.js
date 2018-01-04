import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import * as CharactersActions from 'marvelApp/src/redux/actions/characters'
import CharacterCell from './CharacterCell'
import { colors, constants } from 'marvelApp/src/commons'
import Search from 'react-native-search-box'


class CharactersList extends Component {

    constructor(props) {
        super(props)

        // with this
        this.renderItem = this.renderItem.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentWillMount() {
        this.props.initCharactersList()
    }

    onSelect(character) {
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

    onEndReached() {
        console.log('ON END REACHED')

        if (this.props.list.length < this.props.total && !this.props.isFetching) {
            let newOffset = this.props.offset + constants.LIST_CHARACTERS_OFFSET
            this.props.fetchCharacters(newOffset)
        }
    }

    renderHeader() {

        if (this.props.isFetching) {

            const Spinner = require('react-native-spinkit');

            return (
                <View style={styles.spinner}>
                    <Spinner type={'FadingCircleAlt'} color={colors.activityIndicator} size={60} />
                </View>
            )
        } else {
            return null
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <Search
                    ref="search_box" 
                    onCancel={() => this.onCancel()}
                    onChangeText={(text) => this.onChangeText(text)} />
                <FlatList

                    data={this.props.list}
                    ListHeaderComponent={() => this.renderHeader()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    onEndReached={() => this.onEndReached()}
                    keyExtractor={(item, index) => item.id}
                    extraData={this.props}
                    numColumns={1}
                />
            </View>)
    }

    /* ********** SEARCH METHODS *********** */

    onChangeText = (e) => {

        // Filter with 3 or more characters written
        if (e && e.length > 2) {
            console.log('analizo el filter')
            
            let text = e.toLowerCase()
            
            if (!text || text === '') {
                //this.props.filterName = null
                this.render()
            } 
            else {
                this.props.filterName = text
                this.props.updateCharactersFiltered(text)
                
            }
        } else {
            this.props.filterName = null
            this.render()
        }

    }

    // Important: You must return a Promise
    beforeFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('beforeFocus');
            resolve();
        });
    }

    // Important: You must return a Promise
    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onFocus', text);
            resolve();
        });
    }

    // Important: You must return a Promise
    afterFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('afterFocus');
            resolve();
        });
    }

    onCancel = () => {
        return new Promise((resolve, reject) => {
            console.log('Cancel Pressed');

            this.props.reloadCharacterList()

            resolve();
        });
    }
    

}

const mapStateToProps = (state) => {

    return {
        list: state.characters.list,
        filterName: state.characters.filterName,
        initialList: state.characters.initialList,
        isFetching: state.characters.isFetching,
        total: state.characters.total,
        offset: state.characters.offset,
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
            Actions.CharacterDetail({ title: character.name })
        },
        updateCharactersFiltered: (filterName) => {
            dispatch(CharactersActions.updateCharactersListOffset(0))
            dispatch(CharactersActions.fetchCharactersFiltered(filterName))
        },
        reloadCharacterList: () => {
            dispatch(CharactersActions.updateCharactersListOffset(0))
            dispatch(CharactersActions.reloadCharactersList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingTop: 20,
        backgroundColor: colors.backgroundColor
    },

    spinner: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.title,
        textAlign: 'center'
    },

    activityIndicator: {
        marginVertical: 50
    },

});
