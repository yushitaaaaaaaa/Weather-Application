
import { StyleSheet } from 'react-native';
import { HomeScreen } from './components/home/homescreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SearchScreen } from './components/search/searchscreen';
import { ForecastScreen } from './components/forecast/forecastscreen';
import TempConvScreen from './components/tempconv/tempconvscreen';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Forecast') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Convert') {
              iconName = focused ? 'thermometer' : 'thermometer-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'skyblue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#1E272E' },
          tabBarLabelStyle: { fontSize: 12 },
          headerStyle: { backgroundColor: '#1E272E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Home',
            tabBarLabel: 'Home'
          }}
        />
        <Tab.Screen 
          name="Forecast" 
          component={ForecastScreen} 
          options={{ 
            title: '5-Day Forecast',
            tabBarLabel: 'Forecast' 
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ 
            title: 'Search Weather',
            tabBarLabel: 'Search' 
          }}
        />
        <Tab.Screen 
          name="Convert" 
          component={TempConvScreen} 
          options={{ 
            title: 'Temperature Converter',
            tabBarLabel: 'Converter' 
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E272E',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 50,
    color: '#fff'
  }
});