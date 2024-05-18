import React, { useState, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { createAccount } from '../index';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);

  const hasErrorFullName = () => fullName === "";
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => confirmPassword !== password;

  useEffect(() => {
    setDisableCreate(
      hasErrorFullName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      phone.trim() === '' ||
      address.trim() === ''
    );
  }, [fullName, email, password, confirmPassword, phone, address]);

  const handleRegister = () => {
    createAccount(email, password, fullName, phone, address, role);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        <Text style={{
          fontSize: 30,
          fontWeight: "bold",
          alignSelf: "center",
          color: "black",
          marginTop: 50,
          marginBottom: 50
        }}> Register New Account </Text>
        <TextInput
          label={"Full Name"}
          value={fullName}
          onChangeText={setFullname}
        />
        <HelperText type='error' visible={hasErrorFullName()}>
          Full name không được phép để trống
        </HelperText>
        <TextInput
          label={"Email"}
          value={email}
          onChangeText={setEmail}
        />
        <HelperText type='error' visible={hasErrorEmail()}>
          Địa chỉ email không hợp lệ
        </HelperText>
        <TextInput
          label={"Password"}
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
          Password ít nhất 6 kí tự
        </HelperText>
        <TextInput
          label={"Confirm Password"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              icon={() => (
                <Image
                  source={showConfirmPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
                  style={{ width: 24, height: 24 }}
                />
              )}
            />
          }
        />
        <HelperText type='error' visible={hasErrorPasswordConfirm()}>
          Confirm Password phải giống với Password
        </HelperText>
        <TextInput
          label={"Address"}
          value={address}
          onChangeText={setAddress}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label={"Phone"}
          value={phone}
          onChangeText={setPhone}
          style={{ marginBottom: 20 }}
        />
        <Button textColor='white' buttonColor='blue' mode='contained' onPress={handleRegister} disabled={disableCreate}>
          Create New Account
        </Button>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>Do you have an account?</Text>
          <Button onPress={() => navigation.navigate("Login")}>
            Login Account
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
