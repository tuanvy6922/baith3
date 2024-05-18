import React, { useState } from "react"
import { View, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import firestore from '@react-native-firebase/firestore'
import storage from "@react-native-firebase/storage"
import ImagePicker from "react-native-image-crop-picker"
import { useMyContextProvider } from "../index"

const AddNewService = ({ navigation }) => {
    const [controller, dispatch] = useMyContextProvider()
    const { userLogin } = controller
    const [imagePath, setImagePath] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const SERVICES = firestore().collection("Services")

    const handleAddNewService = () => {
        SERVICES.add({
            title,
            price,
            create: userLogin.email
        })
        .then(response => {
            const refImage = storage().ref("/services/" + response.id + ".png")
            refImage.putFile(imagePath)
            .then(() => 
                refImage.getDownloadURL()
                .then(link => {
                    SERVICES.doc(response.id).update({
                        id: response.id,
                        image: link
                    })
                    navigation.navigate("Services")
                })
            )
            .catch(e => console.log(e.message))
        })
    }

    const handleUploadImage = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300,
            cropping: true
        })
        .then(image => setImagePath(image.path))
        .catch(e => console.log(e.message))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Service name *</Text>
                    <Button textColor="black" buttonColor="pink" style={{ margin: 10 }} mode="contained" onPress={handleUploadImage}>
                        Upload Image
                    </Button>
                    {imagePath !== "" && (
                        <Image source={{ uri: imagePath }} style={{ height: 300 }} />
                    )}
                    <TextInput
                        placeholder="Input a service name"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.textInput}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Price *</Text>
                    <TextInput
                        placeholder="0"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <Button buttonColor="pink" textColor="black" mode="contained" onPress={handleAddNewService}>Add</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    textInput: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
})

export default AddNewService
