import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../utils/colors';

interface CImageProps {
  onPress?: () => void;
  uri: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  loaderStyle?: StyleProp<ViewStyle>;
}

const CImage: React.FC<CImageProps> = ({
  onPress,
  uri,
  containerStyle,
  imageStyle,
  loaderStyle,
}) => {
  const [loader, setLoader] = useState<boolean>(true);

  const onLoadEnd = () => {
    setLoader(false);
  };

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <View style={[styles.imageContainer, containerStyle]}>
        {loader && (
          <View style={[styles.loader, loaderStyle]}>
            <ActivityIndicator size="large" color={colors.purple} />
          </View>
        )}
        <Image
          onLoadEnd={onLoadEnd}
          source={{uri}}
          style={[styles.image, imageStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: RFPercentage(45),
    height: RFPercentage(45),
  },
  image: {
    width: '100%',
    height: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default CImage;
