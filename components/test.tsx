import {AppKitButton} from "@reown/appkit-wagmi-react-native";
import {View, Text} from "react-native";
import {useAccount} from "wagmi";

const Test = () => {
  const account = useAccount();

  console.log("ACCOUNT", account);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <AppKitButton />

      <Text>Chain Id: {account.chain?.id ?? 'no chain'}</Text>
    </View>
  )
}

export default Test;
