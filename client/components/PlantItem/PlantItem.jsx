import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import styles from './PlantItem.style';
import ApiService from '../../services/ApiService';

export default function PlantItem({ userPlant }) {
  const [remainingDays, setRemainingDays] = useState(
    moment(userPlant.next_water).diff(moment(), 'days') + 1,
  );

  useEffect(() => {
    const intervalID = setInterval(() => {
      setRemainingDays(moment(userPlant.next_water).diff(moment(), 'days') + 1);
    }, 1800000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const waterMe = () => {
    const update = {
      next_water: moment().add(userPlant.water_days, 'd'),
    };
    console.log(update);
    ApiService.updateNextWater(userPlant._id, update).then((updatedPlant) => {
      setRemainingDays(
        moment(updatedPlant.next_water).diff(moment(), 'days') + 1,
      );
      Alert.alert('Your plant has been watered 🎉');
    });
  };

  const handlePress = () => {
    if (remainingDays > 0) {
      const unit = remainingDays === 1 ? 'day' : 'days';
      Alert.alert(
        `This plant still has ${remainingDays} ${unit} left... Are you sure?`,
        '🤔',
        [
          {
            text: 'Yes',
            onPress: () => waterMe(),
          },
          {
            text: 'No',
          },
        ],
      );
    } else {
      Alert.alert(`Are you sure?`, '💦🪴', [
        {
          text: 'Yes',
          onPress: () => waterMe(),
        },
        {
          text: 'No',
        },
      ]);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Image
          source={require('../../assets/AloeVera.jpeg')}
          style={styles.image}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <MaterialCommunityIcons
            name="watering-can-outline"
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>Water me!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <Text style={styles.header}>{userPlant.common_name}</Text>
        <Text style={styles.subheader}>{userPlant.scientific_name}</Text>
        <AnimatedCircularProgress
          size={90}
          width={4}
          backgroundWidth={10}
          fill={(remainingDays / userPlant.water_days) * 100}
          tintColor="#5da8a0"
          backgroundColor="#3e5586"
          rotation={0}
          lineCap="butt"
          style={styles.progress}
        >
          {(fill) => (
            <View>
              <Text style={[styles.timer, styles.header]}>{remainingDays}</Text>
              {remainingDays === 1 ? (
                <Text>day left</Text>
              ) : (
                <Text>days left</Text>
              )}
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
}
