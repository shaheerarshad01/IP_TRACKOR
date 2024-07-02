import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import IPData from '../components/IPData';
import CImage from '../components/CImage';
import {RFPercentage} from 'react-native-responsive-fontsize';

type RouteParams = {
  Details: {
    ipData: {
      ip: string;
      connection: {
        isp: string;
      };
      city: string;
      country: string;
    };
    selectedImage: string;
  };
};

const DetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'Details'>>();
  const {ipData, selectedImage} = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <IPData ipData={ipData} />
      {selectedImage && (
        <View style={styles.imageContainer}>
          <CImage uri={selectedImage} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginVertical: RFPercentage(2),
  },
});

export default DetailsScreen;
