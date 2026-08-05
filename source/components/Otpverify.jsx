import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

import OtpIcon from '../../assets/otp.svg';
import {Home} from '../screens/Home';

export const VerifyOtp = ({ onBack,email }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const [showHome, setShowHome] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => subscription.remove();
  }, [onBack]);

  const handleChange = (value, index) => {
    // Paste support
    if (value.length > 1) {
      const pastedOtp = value
        .replace(/[^0-9]/g, '')
        .slice(0, 6)
        .split('');

      const updatedOtp = [...otp];

      pastedOtp.forEach((digit, i) => {
        updatedOtp[i] = digit;
      });

      setOtp(updatedOtp);

      const nextIndex = Math.min(pastedOtp.length, 5);
      inputRefs.current[nextIndex]?.focus();

      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value.replace(/[^0-9]/g, '');

    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    if (!otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

 const verifyOtp = async () => {
  const enteredOtp = otp.join('');

  if (enteredOtp.length !== 6) {
    Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP');
    return;
  }

  try {
    const response = await fetch(
      'http://192.168.1.66:5000/verify-otp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      Alert.alert('Success', 'OTP Verified');

      setShowHome(true);
    } else {
      Alert.alert('Error', data.message);
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Unable to connect to server');
  }
};
if (showHome) {
  return <Home />;
}

  return (
    <View style={styles.container}>

      {/* <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity> */}


      <View style={styles.content}>

        <OtpIcon width={120} height={80} />

        <Text style={styles.title}>
          Enter the OTP sent to your email
        </Text>


        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.otpBox}
              value={digit}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              onChangeText={(value) =>
                handleChange(value, index)
              }
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
              autoFocus={index === 0}
            />
          ))}
        </View>


        <TouchableOpacity
          style={styles.button}
          onPress={verifyOtp}
        >
          <Text style={styles.buttonText}>
            Verify OTP
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '85%',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },

  backText: {
    fontSize: 18,
    fontFamily: 'times new roman',
  },

  title: {
    fontSize: 22,
    marginVertical: 20,
    textAlign: 'center',
    fontFamily: 'times new roman',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },

  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#3f3d3d',
    borderRadius: 8,
    fontSize: 22,
    fontFamily: 'times new roman',
    backgroundColor: '#fff',
  },

  button: {
    width: '100%',
    backgroundColor: '#f1f3f4',
    padding: 12,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#b7c3d0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontFamily: 'times new roman',
  },

});
