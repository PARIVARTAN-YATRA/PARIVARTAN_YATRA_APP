 
 import React from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, View, Text, TextInput,  StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import GoogleIcon from './assets/google.svg';
import GmailIcon from './assets/gmail.svg';
import auth from '@react-native-firebase/auth';
import {EmailLogin} from './source/components/Email';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [text, setText] = useState('');
  const [confirm, setConfirm] = useState(null);
 const [otp, setOtp] = useState('');
 const [showEmailLogin, setShowEmailLogin] = useState(false);

if (showEmailLogin) {
  return <EmailLogin />;
}
 

  const sendOTP = async () => {
    try {
       const confirmation = await auth().signInWithPhoneNumber(
        '+91' + text
          );

     setConfirm(confirmation);

    alert('OTP Sent');
  } catch (e) {
    alert(e.message);
  }
};
  
  return (
    
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.label1}>Enter your Mobile Number </Text>
        <View style={styles.inputContainer}>
         <View style={styles.countryCodeContainer}>
                  <Text style={styles.countryCode}>+91</Text>
          </View>
          <TextInput
           style={styles.input}
            placeholder="Enter your Mobile Number"
            keyboardType="phone-pad"
            value={text}
            onChangeText={setText}
            maxLength={10}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            title="Continue"
            onPress={ () => {
              if (text.length === 10) {
              
                sendOTP();
              } else {
                alert('Invalid Mobile Number');
              }}
            }

          >
            <Text style={styles.label}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
           
            style={styles.button}
          >
             <GoogleIcon  width={24} height={24}  style={{ marginRight: 10 }} />
            <Text style={styles.label}>Login With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={styles.button}
           onPress={() => setShowEmailLogin(true)}
          >
             <GmailIcon width={24} height={24} style={{ marginRight: 10 }} />
            <Text style={styles.label}>Login With Email</Text>
            
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
    
  },
  countryCodeContainer: {
  width: 60,
  height: 50,
  borderWidth: 1,
  borderColor: '#3f3d3d',
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
},

countryCode: {
  fontSize: 20,
  fontFamily: 'times new roman',
},
  input: {
    borderWidth: 1,
    borderColor: '#3f3d3d',
    padding: 8,
    fontFamily: 'times new roman',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    width: '80%',
    height: 50,
    fontFamily: 'times new roman',
  },
  button: {
    backgroundColor: '#f1f3f4',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 50,
    marginTop: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#b7c3d0',
  },
  
  label: {
    fontSize: 16,
     
    fontFamily: 'times new roman',
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label1: {
    fontSize: 25,
    width: '100%',
    marginBottom: 16,
    alignSelf: 'flex-start',
    fontFamily: 'times new roman',
  },
  buttonContainer: {
     
    width: '100%',
  },
}); 

export default App;
