import React from 'react';
import { View, Text,TextInput,StyleSheet , TouchableOpacity} from 'react-native';
import EmailIcon from '../../assets/Email.svg';
import { useState } from 'react';

export const EmailLogin = () => {
    const [text, setText] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    
    return (
         <View style={styles.container}> 
         <View style={styles.content}>
                 <Text style={styles.label1}>Enter your Email Address</Text>
            <View style={styles.inputContainer}>
                 <View style={styles.countryCodeContainer}>
                        <EmailIcon width={'80%'} height={50}   />
                 </View>
                  <TextInput
                   style={styles.input}
                    placeholder="Enter your Email"
                    keyboardType="email-address"
                    value={text}
                    autoCapitalize="none"
                   onChangeText={(value) => {
                                    setText(value);
                                        if (value.length === 0) {
                                          setEmailError('');
                                         }
                                          else if (!validateEmail(value)) {
                                               setEmailError('Please enter a valid email address');
                                            } else {
                                                 setEmailError('');
                                                 }
                    }}
                    maxLength={100}
                  />
                   
            </View>
            {emailError ? (
                        <Text style={styles.errorText}>{emailError}</Text>
                  ) : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                            style={styles.button}
                            title="Send OTP"
                           onPress={() => {
                              if (!validateEmail(text.trim())) {
                                  setEmailError('Please enter a valid email address');
                                   return;
                                    }

                                alert('Email is valid');
                                      // Send OTP
                              }}
                          >
                            <Text style={styles.label}>Send OTP</Text>
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
  errorText: {
  color: 'red',
  width: '100%',
  fontSize: 14,
  alignSelf: 'flex-start',
  marginTop: -10,
  marginBottom: 10,
},
}); 