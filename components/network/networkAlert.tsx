import { COLORS } from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import { Snackbar, Text } from 'react-native-paper';

export interface NetworkAlertProps {
  isConnected: boolean | undefined;
}

const NetworkAlert: React.FC<NetworkAlertProps> = ({ isConnected }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isConnected === undefined) {
      return;
    }

    setMessage(isConnected ? 'You are online' : 'You are offline');
    setVisible(true);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isConnected === undefined) {
      return;
    }

    setMessage(isConnected ? 'You are back online' : 'You lost connection');
    setVisible(true);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isConnected]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={3000}
      style={{
        position: 'absolute',
        bottom: 57,
        alignSelf: 'center',
        maxWidth: 250,
        zIndex: 1000,
        elevation: 5,
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        paddingHorizontal: 4,
        paddingVertical: 4,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 15,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </Snackbar>
  );
};

export default NetworkAlert;
