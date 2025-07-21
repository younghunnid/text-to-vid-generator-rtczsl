import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';

export default function PreviewScreen() {
  const params = useLocalSearchParams();
  const { text, style, music, duration } = params;
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleSave = async () => {
    console.log('Saving video...');
    setIsSaving(true);
    
    // Simulate saving process
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Success', 'Video saved to your library!', [
        { text: 'OK', onPress: () => router.push('/videos') }
      ]);
    }, 2000);
  };

  const handleShare = async () => {
    console.log('Sharing video...');
    setIsSharing(true);
    
    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false);
      Alert.alert('Shared', 'Video link copied to clipboard!');
    }, 1500);
  };

  const handleCreateAnother = () => {
    router.push('/create');
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={commonStyles.subtitle}>Video Preview</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={commonStyles.videoContainer}>
          <Icon name="play-circle" size={60} style={{ color: colors.primary, marginBottom: 10 }} />
          <Text style={[commonStyles.text, { color: colors.textSecondary }]}>
            Video Preview
          </Text>
          <Text style={[commonStyles.text, { fontSize: 12, color: colors.textSecondary }]}>
            {duration}s • {style} style
          </Text>
        </View>

        <View style={commonStyles.card}>
          <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 10 }]}>
            Video Details
          </Text>
          <View style={{ marginBottom: 10 }}>
            <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginBottom: 2 }]}>
              Original Text:
            </Text>
            <Text style={commonStyles.textLeft}>
              {text}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginBottom: 2 }]}>
              Style:
            </Text>
            <Text style={commonStyles.textLeft}>
              {style?.charAt(0).toUpperCase() + style?.slice(1)}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginBottom: 2 }]}>
              Music:
            </Text>
            <Text style={commonStyles.textLeft}>
              {music === 'none' ? 'No Music' : music?.charAt(0).toUpperCase() + music?.slice(1)}
            </Text>
          </View>
          <View>
            <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginBottom: 2 }]}>
              Duration:
            </Text>
            <Text style={commonStyles.textLeft}>
              {duration} seconds
            </Text>
          </View>
        </View>

        <View style={commonStyles.buttonContainer}>
          <Button
            text={isSaving ? "Saving..." : "Save Video"}
            onPress={handleSave}
            style={[buttonStyles.primary, isSaving && { opacity: 0.7 }]}
            disabled={isSaving}
          />
        </View>

        <View style={commonStyles.buttonContainer}>
          <Button
            text={isSharing ? "Sharing..." : "Share Video"}
            onPress={handleShare}
            style={[buttonStyles.accent, isSharing && { opacity: 0.7 }]}
            disabled={isSharing}
          />
        </View>

        <View style={commonStyles.buttonContainer}>
          <Button
            text="Create Another Video"
            onPress={handleCreateAnother}
            style={buttonStyles.outline}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}