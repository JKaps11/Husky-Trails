// hooks/useLiveNetworkState.ts
import { getNetworkStateAsync, NetworkState } from 'expo-network';
import { useState, useEffect } from 'react';

export function useLiveNetworkState(): boolean | undefined {
  const [isConnected, setIsConnected] = useState<boolean | undefined>(
    undefined,
  );

  useEffect((): (() => void) => {
    const check = async (): Promise<void> => {
      const state: NetworkState = await getNetworkStateAsync();
      setIsConnected(state.isConnected);
    };

    // Initial check
    check();

    // Poll every 3 seconds
    const intervalId: NodeJS.Timeout = setInterval(check, 3000);

    return (): void => {
      clearInterval(intervalId);
    };
  }, []);

  return isConnected;
}
