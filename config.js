const mysql=require('mysql');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});
con.connect((err)=>{
    if(err){
        console.log("not connected");
    }
    else{
        console.log("connected");
    }
})

// con.query("select * from user",(err,result)=>{
//     console.log(result);
// });
module.exports=con;

// here is react-native app development;
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';

const NewsApp = () => {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const weatherApiKey = 'd4c8088e25469279f51afae0e7304bd8'; // Add your OpenWeatherMap API key here

  useEffect(() => {
    fetchNews();
    fetchWeather();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'in', // India country code
          apiKey: 'e3af1b704f254557be4e80fc1ff42bba', // Your NewsAPI key
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: 'Delhi', // Replace with your desired city
          appid: weatherApiKey, // Your OpenWeatherMap API key
          units: 'metric', // For Celsius temperature
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to load weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews().then(() => setRefreshing(false));
    fetchWeather();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert(item.title)}>
      <View style={styles.card}>
        {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image} />}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Latest News</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={news}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          />
          
          {/* Weather Information */}
          {weather && (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherHeading}>Current Weather</Text>
              <Text style={styles.weatherText}>City: {weather.name}</Text>
              <Text style={styles.weatherText}>Temperature: {weather.main.temp}°C</Text>
              <Text style={styles.weatherText}>Weather: {weather.weather[0].description}</Text>
              <Text style={styles.weatherText}>Humidity: {weather.main.humidity}%</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  weatherContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  weatherHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  weatherText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default NewsApp;


