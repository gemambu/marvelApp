import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import * as webservices from 'marvelApp/src/webservices/webservices'

export default class CharactersList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            selected: null
        }
        
    }

    componentWillMount(){
        const characters = webservices.fetchCharacters('1d62818073f1f77290d9cba5a0df3d8f');
        console.log('characters: ', characters)
        this.setState({list: characters})
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Comics</Text>
                {/* <FlatList
                
                    data={this.props.list}
                    ListHeaderComponent={() => this.renderHeader()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => item.id}
                    extraData={this.props}
                    numColumns={2}
                /> */}
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingTop: 40 
    }
});
