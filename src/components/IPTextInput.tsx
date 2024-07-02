import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CRow from './CRow';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {ipRegex} from '../utils/helpers';
import axios from 'axios';
import {base_url} from '../utils/url';
import {colors} from '../utils/colors';

interface IPTextInputProps {
  showAlertMessage: (message: string) => void;
  setIpData: (data: any) => void;
}

const IPTextInput: React.FC<IPTextInputProps> = ({
  showAlertMessage,
  setIpData,
}) => {
  const [inputIp, setInputIp] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const handleIpLookup = async () => {
    if (!ipRegex.test(inputIp)) {
      setValidationError('Please enter a valid IP address.');
      return;
    }
    setValidationError('');

    try {
      setLoader(true);
      const response = await axios.get(`${base_url}/${inputIp}`);
      if (response.data.success === false) {
        showAlertMessage(response.data.message);
      } else {
        setIpData(response.data);
        setInputIp('');
      }
    } catch (error: any) {
      console.error('Error', error);
      if (error && error.response) {
        showAlertMessage(error.response.data.message);
      } else {
        showAlertMessage('An unknown error occurred.');
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <View
      style={{
        marginVertical: RFPercentage(2),
        alignItems: 'center',
      }}>
      <CRow>
        <TextInput
          style={[
            styles.input,
            {borderColor: validationError ? colors.red : colors.border},
          ]}
          placeholder="Enter IP"
          value={inputIp}
          onChangeText={setInputIp}
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity
          disabled={loader}
          onPress={handleIpLookup}
          style={styles.button}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <AntDesign
              name="search1"
              size={RFPercentage(3)}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </CRow>
      {validationError ? (
        <Text style={styles.errorText}>{validationError}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: RFPercentage(8),
    borderWidth: 1,
    marginVertical: RFPercentage(2),
    paddingHorizontal: 15,
    width: '95%',
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.black,
  },
  errorText: {
    color: colors.red,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    right: RFPercentage(1),
    backgroundColor: colors.purple,
    padding: RFPercentage(1),
    borderRadius: RFPercentage(5),
  },
});

export default IPTextInput;
