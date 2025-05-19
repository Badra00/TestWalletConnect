import "@walletconnect/react-native-compat";
import {WagmiProvider} from "wagmi";
import {polygonAmoy} from "@wagmi/core/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppKit, createAppKit, defaultWagmiConfig,} from "@reown/appkit-wagmi-react-native";
import Test from "./components/test";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Linking from 'expo-linking';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.reown.com
const projectId = "projectId";

// 2. Create config
const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "exp://192.168.0.93:8081"
  },
};

const chains = [polygonAmoy] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: polygonAmoy, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Test} />
    </Stack.Navigator>
  );
}

const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix]
};

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKit />
        <NavigationContainer linking={linking}>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
