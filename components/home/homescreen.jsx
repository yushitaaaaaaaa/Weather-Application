import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./homescreen.styles";

export const HomeScreen = () => {
    const API_KEY = "519ddb13511ef15123d5a8f8b5290d82";
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

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#ff0000" />
            ) : (
                <View style={styles.contentContainer}>
                    <Text style={styles.heading}>Current Weather</Text>

                    {/* Temperature Label & Box */}
                    <Text style={styles.label}>Temperature:</Text>
                    <View style={styles.box}>
                        <Text style={styles.text}>{weather.main.temp}°C</Text>
                    </View>

                    {/* Location Label & Box */}
                    <Text style={styles.label}>Current Location:</Text>
                    <View style={styles.box}>
                        <Text style={styles.text}>{weather.name}, {weather.sys.country}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};
