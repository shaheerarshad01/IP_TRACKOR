import {StyleSheet} from 'react-native';
import React, {memo, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {ImagesJson} from '../json';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IpData} from '../screens/HomeScreen';
import CImage from './CImage';

function ImagesCarosel({ipData}: {ipData: IpData | null}) {
  const navigation = useNavigation<NavigationProp<any>>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    navigation.navigate('Details', {ipData, selectedImage: image});
  };

  return (
    <Carousel
      style={styles.carouselContainer}
      width={RFPercentage(50)}
      height={RFPercentage(50)}
      autoPlay={true}
      data={ImagesJson}
      scrollAnimationDuration={1000}
      renderItem={({index}) => (
        <CImage
          uri={ImagesJson[index].url}
          onPress={() => handleImageSelect(ImagesJson[index].url)}
        />
      )}
    />
  );
}

export default memo(ImagesCarosel);
const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  carouselContainer: {
    marginVertical: RFPercentage(2),
  },
});
