import {StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactNode, memo} from 'react';

interface CRowProps extends ViewProps {
  children: ReactNode;
}

const CRow: React.FC<CRowProps> = ({children, ...props}) => {
  return (
    <View style={styles.row} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(CRow);
