import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import styles from "./styles"; // Import the external stylesheet

const API_URL = "https://random-data-api.com/api/users/random_user?size=80";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const user = users[currentIndex];

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>
        {user.first_name} {user.last_name}
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.info}>{user.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>UID:</Text>
          <Text style={styles.info}>{user.uid}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.info}>{user.password}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info}>{user.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={({ pressed }) => [
            styles.button,
            currentIndex === 0 && styles.disabledButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          disabled={currentIndex === users.length - 1}
          style={({ pressed }) => [
            styles.button,
            currentIndex === users.length - 1 && styles.disabledButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default App;
