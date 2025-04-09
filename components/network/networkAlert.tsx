import { Snackbar } from 'react-native-paper';

interface NetworkAlertProps {
  isConnected: boolean | undefined;
}

const NetworkAlert: React.FC<NetworkAlertProps> = (
  isConnected: NetworkAlertProps,
) => {
  return (
    <Snackbar
      visible={!isConnected}
      onDismiss={() => {}}
      duration={Snackbar.DURATION_MEDIUM}
    >
      {isConnected ? 'You are online' : 'You are offline'}
    </Snackbar>
  );
};

export default NetworkAlert;
