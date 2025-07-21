import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function MainScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        <View style={commonStyles.content}>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Icon name="videocam" size={80} style={{ marginBottom: 20 }} />
            <Text style={commonStyles.title}>Text to Video</Text>
            <Text style={commonStyles.text}>
              Transform your text into engaging videos with AI-powered generation
            </Text>
          </View>

          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Features</Text>
            <View style={{ alignItems: 'flex-start', width: '100%' }}>
              <Text style={commonStyles.textLeft}>• AI-powered video generation</Text>
              <Text style={commonStyles.textLeft}>• Multiple video styles and themes</Text>
              <Text style={commonStyles.textLeft}>• Background music selection</Text>
              <Text style={commonStyles.textLeft}>• Custom video duration</Text>
              <Text style={commonStyles.textLeft}>• High-quality output</Text>
            </View>
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="Create Video"
              onPress={() => router.push('/create')}
              style={buttonStyles.primary}
            />
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="My Videos"
              onPress={() => router.push('/videos')}
              style={buttonStyles.outline}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}