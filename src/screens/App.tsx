// import '../../expo-crypto-shim.js'; --> Only for Expo 48
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import {sessionParams, providerMetadata} from '../constants/Config';
import {BlockchainActions} from '../components/BlockchainActions';

export default function App() {
  const {isConnected, open, provider} = useWalletConnectModal();

  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <SafeAreaView style={styles.container}>
      {isConnected ? (
        <BlockchainActions onButtonPress={handleButtonPress} />
      ) : (
        <View style={styles.connectContainer}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.text}>
              {isConnected ? 'Disconnect' : 'Connect Wallet'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <WalletConnectModal
        projectId={'9f3a0f5256c5dfdd12e79e3eb891dfe7'}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3396FF',
    borderRadius: 20,
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
});
