import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useMyContextProvider, login } from '../index';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [showPassword, setShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;

  useEffect(() => {
    setDisableLogin(email.trim() === '' || password.trim() === '' || hasErrorEmail() || hasErrorPassword());
  }, [email, password]);

  const handleLogin = () => {
    login(dispatch, email, password);
  };

  useEffect(() => {
    console.log(userLogin);
    if (userLogin != null) {
      if (userLogin.role === 'admin') navigation.navigate('Admin');
      else if (userLogin.role === 'customer') navigation.navigate('Customer');
    }
  }, [userLogin]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          alignSelf: 'center',
          color: 'black',
          marginTop: 100,
          marginBottom: 50,
        }}
      >
        Login
      </Text>
      <TextInput label={'Email'} value={email} onChangeText={setEmail} />
      <HelperText type='error' visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
      <TextInput
        label={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            icon={() => (
              <Image
                source={showPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
                style={{ width: 24, height: 24 }}
              />
            )}
          />
        }
      />
      <HelperText type='error' visible={hasErrorPassword()}>
        Password có ít nhất 6 ký tự
      </HelperText>
      <Button mode='contained' textColor='white' buttonColor='blue' onPress={handleLogin} disabled={disableLogin}>
        Login
      </Button>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Don't have an account?</Text>
        <Button onPress={() => navigation.navigate('Register')}>Create new account</Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password</Button>
      </View>
    </View>
  );
};

export default Login;
