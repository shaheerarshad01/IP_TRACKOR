import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {IpData} from '../screens/HomeScreen';
import {colors} from '../utils/colors';

function IPData({ipData}: {ipData: IpData | null}) {
  return ipData ? (
    <View style={styles.ipInfoContainer}>
      <Text style={styles.ipInfoText}>IP: {ipData.ip}</Text>
      <Text style={styles.ipInfoText}>ISP: {ipData.connection.isp}</Text>
      <Text style={styles.ipInfoText}>
        Location: {ipData.city}, {ipData.country}
      </Text>
    </View>
  ) : (
    <View style={[styles.ipInfoContainer, styles.loadingContainer]}>
      <ActivityIndicator color={'red'} />
    </View>
  );
}

export default memo(IPData);

const styles = StyleSheet.create({
  ipInfoContainer: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.0,
    elevation: 5,
    padding: RFPercentage(2),
    width: '100%',
  },

  ipInfoText: {
    fontSize: 16,
    color: colors.black,
    marginBottom: RFPercentage(1),
  },

  loadingContainer: {
    height: RFPercentage(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
