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
    ActivityIndicator
} from "react-native";
import { styles } from "./searchscreen.styles"; 
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

export const SearchScreen = () => {
    const API_KEY = "519ddb13511ef15123d5a8f8b5290d82";
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }
        
        setLoading(true);
        setError(null);
        
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

    const getWeatherIcon = () => {
        if (!weather) return null;
        
        const condition = weather.weather[0].main.toLowerCase();
        
        if (condition.includes('clear')) return 'sunny';
        if (condition.includes('cloud')) return 'cloudy';
        if (condition.includes('rain')) return 'rainy';
        if (condition.includes('snow')) return 'snow';
        if (condition.includes('thunder')) return 'thunderstorm';
        return 'partly-sunny'; // default
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
                        <Text style={styles.title}>Search</Text>
                        
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
                                    <Ionicons name={getWeatherIcon()} size={60} color="skyblue" />
                                    <Text style={styles.conditionText}>
                                        {weather.weather[0].main}
                                    </Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="thermometer" size={24} color="#fff" />
                                        <Text style={styles.detailLabel}>Temperature</Text>
                                        <Text style={styles.detailValue}>{weather.main.temp}°C</Text>
                                    </View>

                                    <View style={styles.detailItem}>
                                        <Ionicons name="water" size={24} color="#fff" />
                                        <Text style={styles.detailLabel}>Humidity</Text>
                                        <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};