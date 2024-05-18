import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Appointments')
            .onSnapshot(querySnapshot => {
                const appointmentsData = [];
                querySnapshot.forEach(documentSnapshot => {
                    appointmentsData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setAppointments(appointmentsData);
            });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ margin: 10, padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.id}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold" }}>Appointments</Text>
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Appointments;
