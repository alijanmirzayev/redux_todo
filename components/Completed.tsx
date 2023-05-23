import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import { useDispatch, useSelector } from 'react-redux'

export default function Completed() {

    let dispatch = useDispatch()
    const data = useSelector(state => state)
    const [statusTrueData, setStatusTrueData] = useState([])

    useEffect(() => {
        const statusTrueData = data?.filter((e: any) => e.status == true)
        setStatusTrueData(statusTrueData)
    }, [data])

    const handleTask = (item: any) => {
        let newItem = {
            id: item.id,
            text: item.text,
            status: false
        }
        dispatch({ type: 'STATUS_CHANGE', payload: newItem })
    }


    const renderItem = ({ item }: any) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                    value={true}
                    onValueChange={() => handleTask(item)}
                />
                <Text style={{ color: 'gray', fontSize: 21 }}>{item.text}</Text>
            </View>
        )
    }

    return (
        <View>
            <View>
                <Text style={styles.completed}>Completed</Text>
            </View>
            <FlatList
                data={statusTrueData}
                renderItem={renderItem}
                style={{ height: 250 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    completed: {
        color: 'white',
        fontSize: 22,
        marginBottom: 8
    }
})