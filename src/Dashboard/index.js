import React, {useState, useReducer} from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    SafeAreaView,
    StyleSheet,
    Modal,
    Alert,
    TextInput
} from 'react-native';


const Dashboard = ({navigation}) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Cat Tee Black T-Shirt',
            rate: 100,
            quality: 2,
        },
        {
            id: 2,
            name: 'Dark Thug Blue-Navy T-Shirt',
            rate: 200,
            quality: 3,
        },
        {
            id: 3,
            name: 'Sphynx Tie Dye Wine T-Shirt',
            rate: 300,
            quality: 4,
        },
        {
            id: 4,
            name: 'Skuul',
            rate: 400,
            quality: 4,
        },
        {
            id: 5,
            name: 'Wine Skul T-Shirt',
            rate: 400,
            quality: 4,
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);

    const [newProduct, setNewProduct] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: "",
            rate: "",
            quality: ""
        }
    );

    const _addProduct = () => {
        if (!newProduct.name || !newProduct.rate || !newProduct.quality){
            alert('All fields required');
        }
        let newProducts = products.concat({...newProduct, id: Math.floor((Math.random() * 100) + 1) });
        setProducts(newProducts);
        setModalVisible(!modalVisible)
    };

    const _deleteProduct = index => {
        let array = [...products];
        if (index !== -1) {
            array.splice(index, 1);
            setProducts(array);
        }
    }

    const {username} = navigation.state.params;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.user}> Welcome: {username ? username.split('@')[0] : null}</Text>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btn}>
                    <Text style={styles.textWhite}>Add Products</Text>
                </TouchableOpacity>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {products && products.map((item, index) => (
                        <View style={styles.row} key={item.id}>

                            <View style={styles.contLeft}>
                                <Text>{item.name}</Text>
                                <Text>price: {item.rate}</Text>
                                <Text>quantity: {item.quality}</Text>
                            </View>
                            <View style={styles.contRight}>
                                <TouchableOpacity onPress={()=>  Alert.alert(
                                    "Info",
                                    "Are you sure you want to delete?",
                                    [
                                        { text: "OK", onPress: () => _deleteProduct(index) },
                                        {text: "Cancel", style: "cancel"}
                                    ],
                                    { cancelable: false }
                                )} style={styles.deleteBtn}>
                                    <Text style={styles.textWhite}>Delete</Text>
                                </TouchableOpacity >
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>Add Products</Text>

                        <TextInput placeholder="Name" placeholderColor={'#333'} style={styles.input}
                                   onChangeText={text => setNewProduct({ ['name']: text })}/>
                        <TextInput placeholder="Price" placeholderColor={'#333'} style={styles.input} keyboardType={'phone-pad'}
                                   onChangeText={text => setNewProduct({ ['rate']: text })}/>
                        <TextInput placeholder="Quality" placeholderColor={'#333'} style={styles.input} keyboardType={'phone-pad'}
                                   onChangeText={text => setNewProduct({ ['quality']: text })}/>

                        <View style={[styles.row, {borderBottomColor: '#fff'}]}>
                            <TouchableOpacity
                                style={styles.btnAdd}
                                onPress={_addProduct}
                            >
                                <Text style={styles.textStyle}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnCancel}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>


        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
    },
    welcomeTxt: {
        color: '#676767',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    user: {
        color: '#676767',
        fontSize: 18,
        marginTop: 15,
        textAlign: 'center',
    },
    btn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3487f5',
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 4,
    },
    textWhite: {
        color: '#fff',
        fontSize: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 15,
        padding: 10
    },
    deleteBtn:{
        backgroundColor: 'red',
        padding: 5,
        marginBottom:5,
        borderRadius: 4,
    },
    updateBtn:{
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 4,
        // marginBottom:5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        width: '80%',
        height: 350,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 4,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    btnAdd:{
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3487f5',
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 4,
        marginRight: 10,
    },
    btnCancel:{
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f53434',
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 4,
    },
    input: {
        width: '100%',
        height: 50,
        fontSize: 16,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        marginBottom: 15,
    },
});

export default Dashboard;
