import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./searchscreen.styles"; 

export const SearchScreen = () => {
    const API_KEY = "519ddb13511ef15123d5a8f8b5290d82";
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        try {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            let response = await fetch(URL);
            let data = await response.json();
            console.log("Fetching from:", URL);
            console.log("Data from weather API:", data);
            setWeather(data);
        } catch (error) {
            alert("Error while fetching weather data");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Search Weather</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter City"
                    onChangeText={setCity}
                />

                {/* Custom Touchable Button */}
                <TouchableOpacity style={styles.weatherButton} onPress={fetchWeather}>
                    <Text style={styles.weatherButtonText}>Get Weather</Text>
                </TouchableOpacity>

                {weather && (
                    <Text style={styles.resultText}>
                        {`Temp: ${weather.main.temp}°C`}
                    </Text>
                )}
            </View>
        </View>
    );
};
