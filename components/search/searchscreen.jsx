import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import { styles } from "./searchscreen.styles";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

export const SearchScreen = () => {
  const API_KEY = "519ddb13511ef15123d5a8f8b5290d82";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    
    setLoading(true);
    setError(null);
    setShowForecast(false);
    setForecast(null);
    
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      let response = await fetch(URL);
      let data = await response.json();
      
      if (data.cod === "404") {
        setError("City not found. Please try again.");
        setWeather(null);
      } else {
        console.log("Data from weather API:", data);
        setWeather(data);
        setError(null);
      }
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    if (!weather) return;
    
    setForecastLoading(true);
    
    try {
      const { lat, lon } = weather.coord;
      const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      let response = await fetch(URL);
      let data = await response.json();
      
      console.log("Fetching forecast data:", URL);
      setForecast(data);
      setShowForecast(true);
    } catch (error) {
      setError("Error fetching forecast data. Please try again.");
      console.error(error);
    } finally {
      setForecastLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return 'partly-sunny';
    
    condition = condition.toLowerCase();
    
    if (condition.includes('clear')) return 'sunny';
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('rain')) return 'rainy';
    if (condition.includes('snow')) return 'snow';
    if (condition.includes('thunder')) return 'thunderstorm';
    return 'partly-sunny'; 
  };

  const groupByDay = () => {
    if (!forecast || !forecast.list) return [];
    
    const days = {};
    forecast.list.forEach(item => {
      const dateObj = new Date(item.dt * 1000);
      const dateKey = dateObj.toISOString().split('T')[0]; // Use ISO date format as key (YYYY-MM-DD)
      
      if (!days[dateKey]) {
        days[dateKey] = {
          timestamp: item.dt * 1000, 
          items: []
        };
      }
      days[dateKey].items.push(item);
    });
    
    return Object.keys(days).map(dateKey => ({
      date: days[dateKey].timestamp, 
      items: days[dateKey].items,
      avgTemp: (days[dateKey].items.reduce((sum, item) => sum + item.main.temp, 0) / days[dateKey].items.length).toFixed(1)
    }));
  };

  const renderDayItem = ({ item }) => {
    const mainCondition = item.items[0].weather[0].main;
    const date = new Date(item.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });

    return (
      <View style={styles.dayContainer}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayText}>{date}</Text>
          <View style={styles.dayAvgTemp}>
            <Ionicons name="thermometer" size={20} color="#fff" />
            <Text style={styles.avgTempText}>Avg: {item.avgTemp}°C</Text>
          </View>
        </View>
        
        <View style={styles.weatherIconContainer}>
          <Ionicons name={getWeatherIcon(mainCondition)} size={40} color="skyblue" />
          <Text style={styles.weatherCondition}>{mainCondition}</Text>
        </View>
        
        <FlatList
          data={item.items}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(forecast) => forecast.dt.toString()}
          renderItem={({ item: forecast }) => (
            <View style={styles.hourlyItemContainer}>
              <Text style={styles.hourText}>
                {new Date(forecast.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
              <Ionicons 
                name={getWeatherIcon(forecast.weather[0].main)} 
                size={30} 
                color="skyblue" 
              />
              <Text style={styles.temperatureText}>{forecast.main.temp.toFixed(1)}°C</Text>
              <View style={styles.humidityContainer}>
                <Ionicons name="water" size={16} color="#fff" />
                <Text style={styles.humidityText}>{forecast.main.humidity}%</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <ImageBackground 
      source={require('../../assets/temp-bg.jpg')} 
      style={styles.container}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            
            <View style={styles.inputContainer}>
              <Ionicons name="search" size={20} color="#34495E" style={styles.searchIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter City"
                placeholderTextColor="#7f8c8d"
                onChangeText={setCity}
                value={city}
              />
            </View>

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <TouchableOpacity 
              style={styles.weatherButton} 
              onPress={fetchWeather}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons name="cloud" size={20} color="#fff" />
                  <Text style={styles.weatherButtonText}>Get Weather</Text>
                </>
              )}
            </TouchableOpacity>

            {weather && (
              <View style={styles.resultContainer}>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={24} color="skyblue" />
                  <Text style={styles.locationText}>
                    {weather.name}, {weather.sys.country}
                  </Text>
                </View>

                <View style={styles.iconContainer}>
                  <Ionicons name={getWeatherIcon(weather.weather[0].main)} size={60} color="skyblue" />
                  <Text style={styles.conditionText}>
                    {weather.weather[0].main}
                  </Text>
                </View>

                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Ionicons name="thermometer" size={24} color="#fff" />
                    <Text style={styles.detailLabel}>Temperature</Text>
                    <Text style={styles.detailValue}>{weather.main.temp}°C</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons name="body" size={24} color="#fff" />
                    <Text style={styles.detailLabel}>Feels Like</Text>
                    <Text style={styles.detailValue}>{weather.main.feels_like}°C</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons name="water" size={24} color="#fff" />
                    <Text style={styles.detailLabel}>Humidity</Text>
                    <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons name="speedometer" size={24} color="#fff" />
                    <Text style={styles.detailLabel}>Wind Speed</Text>
                    <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.forecastButton} 
                  onPress={fetchForecast}
                  disabled={forecastLoading}
                >
                  {forecastLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="calendar" size={20} color="#fff" />
                      <Text style={styles.forecastButtonText}>Get 5-Day Forecast</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {showForecast && forecast && (
              <View style={styles.forecastContainer}>
                <Text style={styles.forecastTitle}>5-Day Forecast</Text>
                <FlatList
                  data={groupByDay()}
                  renderItem={renderDayItem}
                  keyExtractor={(item) => item.date.toString()}
                  scrollEnabled={false} 
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};