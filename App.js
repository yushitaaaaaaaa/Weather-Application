import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './components/home/homescreen';
// npm install @react-navigation/bottom-tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// npm install @react-navigation/native
import { NavigationContainer } from '@react-navigation/native';
import { SearchScreen } from './components/search/searchscreen';
import { ForecastScreen } from './components/forecast/forecastscreen';
import TempConvScreen from './components/tempconv/tempconvscreen';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Search" component={SearchScreen}/>
        <Tab.Screen name="Forecast" component={ForecastScreen}/>
        <Tab.Screen name="Convert Temperature" component={TempConvScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 50
  }
});
