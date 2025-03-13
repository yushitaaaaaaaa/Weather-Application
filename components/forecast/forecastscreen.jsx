import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { ActivityIndicator, Text, View, FlatList } from "react-native";
import { styles } from "./forecastscreen.styles";

const Item = ({ temp }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Temperature: {temp}°C</Text>
    </View>
);

export const ForecastScreen = () => {
    const API_KEY = "519ddb13511ef15123d5a8f8b5290d82";
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWeather = async (lat, lon) => {
        try {
            const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            let response = await fetch(URL);
            let data = await response.json();
            console.log("Fetching forecast data:", URL);
            console.log("Forecast data:", data?.list?.[0]?.main || "No data");
            setWeather(data);
            setLoading(false);
        } catch (error) {
            alert("Error while fetching data");
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
                <View style={styles.forecastBox}>  
                    <Text style={styles.heading}>Temperature Forecast</Text>
                    <FlatList
                        data={weather?.list?.slice(0, 20) || []}
                        keyExtractor={(item, index) => item.dt?.toString() || index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.forecastItem}>
                                <Text style={styles.dateText}>{item.dt_txt}</Text>
                                <Text style={styles.temperatureText}>{item.main.temp}°C</Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};
