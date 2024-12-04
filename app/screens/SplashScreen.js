import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Expo icons
import { COLORS } from '../theme/colors';

export default function SplashScreen({ navigation }) {
  const logoScale = new Animated.Value(0);
  const fadeText = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(fadeText, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Gallery after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Gallery');
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Animated Icon */}
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: logoScale }] }]}>
        <MaterialIcons name="camera-alt" size={80} color={COLORS.ACCENT} />
      </Animated.View>

      {/* App Title */}
      <Animated.Text style={[styles.title, { opacity: fadeText }]}>
        SnapShot
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text style={[styles.subtitle, { opacity: fadeText }]}>
        Your memories, beautifully captured.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_DARK,
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    padding: 20,
    borderRadius: 50,
    shadowColor: COLORS.TEXT_WHITE,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_WHITE,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
