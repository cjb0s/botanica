import moment from 'moment';
import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import styles from './Home.style';

export default function Home({ userPlants }) {
  const checkSchedule = (plants) => {
    const filtered = plants.filter(
      (plant) =>
        moment(plant.next_water).add(1, 'days').format('Do MMM YYYY') ===
        moment().format('Do MMM YYYY'),
    );
    return filtered.length;
  };

  const renderNotice = () => {
    if (!userPlants.length) {
      return (
        <Text style={styles.notice}>You don't have any plants yet! 🪴</Text>
      );
    } else if (checkSchedule(userPlants)) {
      return <Text style={styles.notice}>Your plants need some love! ❤️</Text>;
    } else {
      return <Text style={styles.notice}>Your plants are all happy! 😊</Text>;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Today</Text>
          {renderNotice()}
        </View>
        <View style={styles.image_container}>
          <Image
            source={require('../../assets/AloeVera.jpeg')}
            style={styles.image}
          />
        </View>
        <View style={styles.topTip}>
          <Text style={styles.topTip_header}>Top Tip</Text>
          <Text style={styles.topTip_text}>
            Most plants prefer for their soil to dry out before rewatering
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
