import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PasswordForm from './src/component/Form/PasswordForm';
import GoogleButton from './src/component/Button/GoogleButton';
import TextButton from './src/component/Button/TextButton';

export default function App() {
  return (
    <View style={styles.container}>
      <TextButton title="Lupa Password?"/>
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
