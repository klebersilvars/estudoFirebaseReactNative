import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function Listagem({ data }) {
    return (
        <ScrollView>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                <Text> Nome do usuário: {data.nome}</Text>
                <Text> Cargo do usuário: {data.cargo}</Text>
                <Text> Identificador do user: {data.key}</Text>
            </View>
        </ScrollView>
    )
}