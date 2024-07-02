import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import ImagesCarosel from '../components/ImagesCarosel';
import IPData from '../components/IPData';
import {base_url} from '../utils/url';
import IPTextInput from '../components/IPTextInput';
export type IpData = {
  ip: string;
  connection: {
    isp: string;
  };
  city: string;
  country: string;
};

const HomeScreen: React.FC = () => {
  const [ipData, setIpData] = useState<IpData | null>(null);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  useEffect(() => {
    const fetchIpData = async () => {
      try {
        const response = await axios.get(base_url);
        setIpData(response.data);
      } catch (error) {
        console.error(error);
        showAlertMessage('Failed to fetch IP data.');
      }
    };
    fetchIpData();
  }, []);

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IPTextInput setIpData={setIpData} showAlertMessage={showAlertMessage} />
      <IPData ipData={ipData} />

      <ImagesCarosel ipData={ipData} />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Error"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={hideAlert}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
});

export default HomeScreen;
