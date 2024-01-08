import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './src/component/PrimaryButton';

export default function App() {
  return (
    <View style={styles.container}>
      <PrimaryButton title="Edit Profil"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
