import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    ToastAndroid,
} from 'react-native';

const errorToast = val => {
    ToastAndroid.showWithGravity(
        val,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    );
};

const Home = ({navigation}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const _handleLogin = () => {
        if (!username) {
            errorToast('Email is required');
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
            errorToast('Invalid email');
        } else if (!password) {
            errorToast('Password is required');
        } else if (!password.match(/[a-z]/) || !password.match(/[A-Z]/)) {
            errorToast('One letter must be uppercase');
        }else if(username === 'clarion@clarion.com' && password === 'Clarion123'){
            navigation.navigate('Dashboard', {
                username: username,
            });
        }else{
            errorToast('Invalid Credentials');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.welcomeTxt}>Login</Text>
                <TextInput placeholder="Email" placeholderColor={'#333'} style={styles.input}
                           onChangeText={text => setUserName(text)}/>
                <TextInput placeholder="Password" placeholderColor={'#333'} style={styles.input}
                           secureTextEntry={true}  onChangeText={text => setPassword(text)}/>
                <TouchableOpacity onPress={_handleLogin} style={styles.btn}>
                    <Text style={styles.textWhite}>Login</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeTxt: {
        color: '#676767',
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        fontSize: 16,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        marginBottom: 15,
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
});

export default Home;
