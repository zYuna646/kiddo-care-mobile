import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PasswordForm from './src/component/Form/PasswordForm';
import GoogleButton from './src/component/Button/GoogleButton';

export default function App() {
  return (
    <View style={styles.container}>
      <GoogleButton title="Masuk Menggunakan Google" />
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
