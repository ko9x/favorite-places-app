import { FlatList, StyleSheet } from "react-native"

import PlaceItem from "./PlaceItem"


export default function PlacesList({places}) {

    if (!places || places.length === 0) {
        <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
        </View>
    }

    function renderItems({item}) {
        <PlaceItem 
            place={item}
        />
    };

    return 
    <FlatList 
        data={places} 
        renderItem={} 
        keyExtractor={(item) => item.id} 
    />
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
    }
})