import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { ActivityIndicator, Text, View, ImageBackground, StatusBar, ScrollView } from "react-native";
import { styles } from "./homescreen.styles";
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = () => {
    const API_KEY = "{YOUR_API_KEY}";
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWeather = async (lat, lon) => {
        try {
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            let response = await fetch(URL);
            let data = await response.json();
            console.log("Fetching from:", URL);
            console.log("Data from weather API:", data);
            setWeather(data);
            setLoading(false);
        } catch (error) {
            alert("Error while fetching weather data");
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert("Permission Denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;
            console.log("Coordinates:", lat, lon);
            fetchWeather(lat, lon);
        })();
    }, []);


    const getWeatherIcon = () => {
        if (!weather) return null;
        
        const condition = weather.weather[0].main.toLowerCase();
        
        if (condition.includes('clear')) return 'sunny';
        if (condition.includes('cloud')) return 'cloudy';
        if (condition.includes('rain')) return 'rainy';
        if (condition.includes('snow')) return 'snow';
        if (condition.includes('thunder')) return 'thunderstorm';
        return 'partly-sunny'; 
    };

    return (
        <ImageBackground 
            source={require('../../assets/temp-bg.jpg')} 
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="skyblue" />
                        <Text style={styles.loadingText}>Fetching weather data...</Text>
                    </View>
                ) : (
                    <View style={styles.contentContainer}>
                        <Text style={styles.heading}>Current Weather</Text>
                        
                        <View style={styles.locationContainer}>
                            <Ionicons name="location" size={24} color="skyblue" />
                            <Text style={styles.locationText}>
                                {weather.name}, {weather.sys.country}
                            </Text>
                        </View>

                        <View style={styles.weatherIconContainer}>
                            <Ionicons name={getWeatherIcon()} size={80} color="skyblue" />
                            <Text style={styles.weatherCondition}>
                                {weather.weather[0].main}
                            </Text>
                        </View>

                        <View style={styles.detailsContainer}>
                            <View style={styles.detailBox}>
                                <Ionicons name="thermometer" size={30} color="#fff" />
                                <Text style={styles.detailLabel}>Temperature</Text>
                                <Text style={styles.detailValue}>{weather.main.temp}°C</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Ionicons name="body" size={30} color="#fff" />
                                <Text style={styles.detailLabel}>Feels Like</Text>
                                <Text style={styles.detailValue}>{weather.main.feels_like}°C</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Ionicons name="water" size={30} color="#fff" />
                                <Text style={styles.detailLabel}>Humidity</Text>
                                <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                            </View>

                            <View style={styles.detailBox}>
                                <Ionicons name="speedometer" size={30} color="#fff" />
                                <Text style={styles.detailLabel}>Wind Speed</Text>
                                <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </ImageBackground>
    );
};
