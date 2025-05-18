import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { 
    ActivityIndicator, 
    Text, 
    View, 
    FlatList, 
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    RefreshControl
} from "react-native";
import { styles } from "./forecastscreen.styles";
import { Ionicons } from '@expo/vector-icons';

export const ForecastScreen = () => {
    const API_KEY = "519ddb13511ef15123d5a8f8b5290d82";
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [location, setLocation] = useState(null);

    const fetchWeather = async (lat, lon) => {
        try {
            setLoading(true);
            const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            let response = await fetch(URL);
            let data = await response.json();
            console.log("Fetching forecast data:", URL);
            setWeather(data);
        } catch (error) {
            alert("Error while fetching data");
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        if (location) {
            fetchWeather(location.coords.latitude, location.coords.longitude);
        } else {
            getCurrentLocation();
        }
    };

    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert("Permission Denied");
                setLoading(false);
                return;
            }

            let locationData = await Location.getCurrentPositionAsync({});
            setLocation(locationData);
            const lat = locationData.coords.latitude;
            const lon = locationData.coords.longitude;
            console.log("Coordinates:", lat, lon);
            fetchWeather(lat, lon);
        } catch (error) {
            console.error("Error getting location:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const groupByDay = () => {
        if (!weather || !weather.list) return [];
        
        const days = {};
        weather.list.forEach(item => {
            const dateObj = new Date(item.dt * 1000);
            const dateKey = dateObj.toISOString().split('T')[0];
            
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

    const getWeatherIcon = (condition) => {
        condition = condition.toLowerCase();
        
        if (condition.includes('clear')) return 'sunny';
        if (condition.includes('cloud')) return 'cloudy';
        if (condition.includes('rain')) return 'rainy';
        if (condition.includes('snow')) return 'snow';
        if (condition.includes('thunder')) return 'thunderstorm';
        return 'partly-sunny'; 
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
            <StatusBar barStyle="light-content" />
            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="skyblue" />
                    <Text style={styles.loadingText}>Fetching forecast data...</Text>
                </View>
            ) : (
                <View style={styles.forecastContainer}>
                    <View style={styles.headerContainer}>
                        {weather && (
                            <Text style={styles.locationText}>
                                {weather.city.name}, {weather.city.country}
                            </Text>
                        )}
                        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
                            <Ionicons name="refresh" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        data={groupByDay()}
                        renderItem={renderDayItem}
                        keyExtractor={(item) => item.date.toString()}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={["skyblue"]}
                                tintColor="skyblue"
                            />
                        }
                    />
                </View>
            )}
        </ImageBackground>
    );
};
