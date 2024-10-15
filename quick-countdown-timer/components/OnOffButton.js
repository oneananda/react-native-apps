import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_TIME = 59; // Starting time in seconds
//const DEFAULT_SELECTED_TIME = 4;

export default function OnOffButton(props) {
  const [isOn, setIsOn] = useState(false);
  const [selectedTime, setSelectedTime] = useState(4);
  const [countDownSeconds, setCountDownSeconds] = useState(INITIAL_TIME);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME); // Starting time in seconds
  const [isRunning, setIsRunning] = useState(false); // To control if the timer is running

  const seconds = 60;

  const toggleButton = () => {
    fetchInitialTime();
    setIsOn(!isOn);
    setIsRunning(!isOn);
    console.log(isOn ? 'Button turned OFF' : 'Button turned ON');
  };

  const changeTime = (type) => {
    const times = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    const currentIndex = times.indexOf(selectedTime);

    if (type === 'increase') {
      const nextIndex = (currentIndex + 1) % times.length;
      setSelectedTime(selectedTime + 1);
    } else if (type === 'decrease') {
      const prevIndex = (currentIndex - 1 + times.length) % times.length;
      if (selectedTime > 0) {
        setSelectedTime(selectedTime - 1);
      }
    }
    storeInitialTime();
    startTimer();
  };

  const storeInitialTime = async () => {
    try {
      await AsyncStorage.setItem('INITIAL_TIME', selectedTime.toString());
    } catch (error) {
      console.error('Error storing initial time:', error);
    }
  };

  const fetchInitialTime = async () => {
    try {
      const storedTime = await AsyncStorage.getItem('INITIAL_TIME');
      if (storedTime == null) {
        storedTime = "4";
      }
      setSelectedTime(parseInt(storedTime));
    } catch (error) {
      console.error('Failed to fetch initial time from storage:', error);
    }
  };


  useEffect(() => {
    //fetchInitialTime();
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1); // Decrease time by 1 second
      }, 1000);
    } else if (!isRunning) {
      console.log("Timer finished 2");
    } else if (timeLeft === 0) {
      if (selectedTime > 0) {
        setSelectedTime(selectedTime - 1);
        setTimeLeft(INITIAL_TIME);
        setIsRunning(true);
      } else {
        console.log("Timer finished");
        alert("Timer finished!");
        setIsRunning(false); // Stop the timer when it reaches zero
      }
    }
    return () => clearTimeout(timer); // Cleanup the timer on unmount or time change
  }, [isRunning, timeLeft]);


  const startTimer = () => {
    //setSelectedTime(selectedTime - 1);
    setIsRunning(true);
  };

  return (
    <View style={styles.container}>
      {isOn && (
        <>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Timer: {selectedTime} : {timeLeft} </Text>
          </View>
          <View style={styles.timerContainer}>

            <Pressable style={styles.timerButton} onPress={() => changeTime('decrease')}>
              <Text style={styles.timerButtonText}>-</Text>
            </Pressable>

            <Pressable style={styles.timerButton} onPress={() => changeTime('increase')}>
              <Text style={styles.timerButtonText}>+</Text>
            </Pressable>

          </View>
        </>
      )}

      <Pressable
        style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]}
        onPress={toggleButton}>
        <Text style={styles.text}>{isOn ? 'Timer ON' : 'Timer OFF'}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  timerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  timerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  timerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonOn: {
    backgroundColor: 'green',
  },
  buttonOff: {
    backgroundColor: 'red',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  logo: {
    height: 128,
    width: 128,
  }
});

