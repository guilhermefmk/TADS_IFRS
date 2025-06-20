import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { verifyInstallation } from 'nativewind';
import { AuthProvider } from './src/contexts/AuthContext'; // Corrigido o caminho
import RootNavigator from './src/navigation/RootNavigator'; // Corrigido o caminho

const Stack = createNativeStackNavigator();

export default function App() {
  verifyInstallation(); // Se você estiver usando NativeWind

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
