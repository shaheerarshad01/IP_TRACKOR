import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import WS from 'react-native-websocket';
import {LineChart} from 'react-native-chart-kit';
import {debounce} from 'lodash';
import {colors} from '../utils/colors';
import {socket_url} from '../utils/url';

type MarketData = {
  p: string;
  q: string;
};

const screenWidth = Dimensions.get('window').width;

const MarketScreen: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const ref = useRef<WS>(null);

  const handleWebSocketMessage = useCallback(
    debounce((event: {data: string}) => {
      const message = JSON.parse(event.data);
      if (message.e === 'aggTrade') {
        const newMarketData = {
          p: message.p,
          q: message.q,
        };
        setMarketData(prevData => {
          const updatedData = [newMarketData, ...prevData.slice(0, 99)];
          setChartData(updatedData.map(data => parseFloat(data.p)));
          return updatedData;
        });
      }
    }, 300),
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: MarketData}) => (
      <View style={styles.marketDataItem}>
        <Text style={styles.marketDataText}>Price: {item.p}</Text>
        <Text style={styles.marketDataText}>Quantity: {item.q}</Text>
      </View>
    ),
    [],
  );

  const chartConfig = useMemo(
    () => ({
      backgroundColor: '#fff',
      backgroundGradientFrom: colors.purple,
      backgroundGradientTo: colors.purple,
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '1',
        strokeWidth: '1',
        stroke: '#ffa726',
      },
      fillShadowGradient: colors.purple,
      fillShadowGradientOpacity: 0.1,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <WS
        ref={ref}
        url={socket_url}
        onOpen={() => {
          ref.current.send(
            JSON.stringify({
              method: 'SUBSCRIBE',
              params: ['btcusdt@aggTrade'],
              id: 1,
            }),
          );
        }}
        onMessage={handleWebSocketMessage}
        onError={console.error}
        onClose={() => {
          ref.current.send(
            JSON.stringify({
              method: 'UNSUBSCRIBE',
              params: ['btcusdt@aggTrade'],
              id: 1,
            }),
          );
        }}
        reconnect
      />
      {marketData.length > 0 ? (
        <View style={styles.contentContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: [],
                  datasets: [
                    {
                      data: chartData,
                    },
                  ],
                }}
                width={Math.max(screenWidth, chartData.length * 10)} // Adjust the width based on the data points
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                }}
                withHorizontalLabels={false}
                withVerticalLabels={false}
                withInnerLines={false}
                withOuterLines={false}
              />
            </View>
          </ScrollView>
          <FlatList
            data={marketData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
            inverted
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color={colors.purple} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    backgroundColor: colors.white,
  },
  marketDataItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  marketDataText: {
    fontSize: 16,
    color: colors.black,
  },
});

export default MarketScreen;
