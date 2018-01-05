import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { colors, constants } from 'marvelApp/src/commons'
import { Input, Button } from 'marvelApp/src/widgets'
import ImagePicker from 'react-native-image-picker'

// redux
import { connect } from 'react-redux'
import * as CharactersActions from 'marvelApp/src/redux/actions/characters'

class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            nameError: '',

            description: '',
            descriptionError: '',

            image: null,
        }
    }

    validateForm() {
        let valid = true
        let errors = {}

        if (!this.state.name) {
            errors.name = constants.ERROR_NAME
            valid = false
        }

        if (!this.state.description) {
            errors.description = constants.ERROR_DESCRIPTION
            valid = false
        }

        this.setState({
            nameError: errors.name ? errors.name : '',
            descriptionError: errors.description ? errors.description : '',
        })

        return valid
    }

    onSubmit() {

        if (this.validateForm()) {

            const characterData = {
                name: this.state.name,
                image: this.state.image ? 'data:image/jpeg;base64,' + this.state.image.data : null,
                description: this.state.description
            }

            console.log('Trying to save character: ', characterData)

            this.showAlert()

        }
    }

    showAlert() {
        Alert.alert(
            constants.ALERT_TITLE,
            constants.ALERT_MESSAGE,
            [
                { text: constants.ALERT_OK_BUTTON },
            ],
            { cancelable: false }
        )
    }

    onSelectImageTapped() {

        const options = {
            title: constants.IMAGE_PICKER_MESSAGE,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else {
                let source = { uri: response.uri }

                this.setState({
                    image: response
                });
            }
        });
    }

    render() {

        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? this.state.image.fileName : constants.IMAGE_PICKER_BUTTON

        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'} />
                    <TouchableOpacity style={styles.button} onPress={() => this.onSelectImageTapped()}>
                        <Text style={styles.textButton}>{imageButtonText}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <Input
                            onChangeText={(v) => this.setState({ name: v })}
                            value={this.state.name}
                            error={this.state.nameError}
                            label={constants.NAME_LABEL}
                            placeHolder={constants.NAME_LABEL_EXAMPLE}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Input
                            inputStyle={{ height: 100 }}
                            onChangeText={(v) => this.setState({ description: v })}
                            value={this.state.description}
                            error={this.state.descriptionError}
                            maxLength={100}
                            multiline={true}
                            numberOfLines={4}
                            label={constants.DESCRIPTION_LABEL}
                            placeHolder={constants.DESCRIPTION_LABEL_EXAMPLE}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label={constants.SAVE_BUTTON}
                            onPress={() => this.onSubmit()}
                            isFetching={this.props.isFetching}
                        />
                    </View>
                </ScrollView>


            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postCharacter: (data) => {
            dispatch(CharactersActions.postCharacter(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    imageContainer: {
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: colors.imageBackground,
        justifyContent: 'center'
    },

    imageContainerBackground: {
        position: 'absolute',
        backgroundColor: colors.mainBackground,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    button: {
        padding: 10,
        borderColor: colors.buttonBorder,
        borderWidth: 1,
        borderRadius: 6,
    },

    textButton: {
        color: colors.buttonText,
        fontWeight: '600',
        backgroundColor: colors.transparent
    },

    inputContainer: {
        margin: 20,
    },

    buttonContainer: {
        margin: 20,
    },
})
