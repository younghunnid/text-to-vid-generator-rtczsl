import { Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';

interface VideoStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface MusicOption {
  id: string;
  name: string;
  genre: string;
}

const videoStyles: VideoStyle[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary style', icon: 'phone-portrait' },
  { id: 'cinematic', name: 'Cinematic', description: 'Movie-like dramatic style', icon: 'film' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant', icon: 'remove' },
  { id: 'dynamic', name: 'Dynamic', description: 'Energetic and vibrant', icon: 'flash' },
];

const musicOptions: MusicOption[] = [
  { id: 'upbeat', name: 'Upbeat Pop', genre: 'Pop' },
  { id: 'ambient', name: 'Ambient Chill', genre: 'Ambient' },
  { id: 'corporate', name: 'Corporate', genre: 'Business' },
  { id: 'cinematic', name: 'Epic Cinematic', genre: 'Orchestral' },
  { id: 'none', name: 'No Music', genre: 'Silent' },
];

export default function CreateScreen() {
  const [text, setText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [selectedMusic, setSelectedMusic] = useState('upbeat');
  const [duration, setDuration] = useState('30');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please enter some text to generate a video');
      return;
    }

    console.log('Generating video with:', { text, selectedStyle, selectedMusic, duration });
    setIsGenerating(true);

    // Simulate video generation process
    setTimeout(() => {
      setIsGenerating(false);
      router.push({
        pathname: '/preview',
        params: {
          text: text.trim(),
          style: selectedStyle,
          music: selectedMusic,
          duration,
        },
      });
    }, 3000);
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={commonStyles.subtitle}>Create Video</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={commonStyles.card}>
          <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 10 }]}>
            Enter your text
          </Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Type your text here... The AI will transform it into an engaging video with visuals and animations."
            placeholderTextColor={colors.textSecondary}
            value={text}
            onChangeText={setText}
            multiline
            maxLength={500}
          />
          <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginTop: 5 }]}>
            {text.length}/500 characters
          </Text>
        </View>

        <View style={commonStyles.card}>
          <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 15 }]}>
            Video Style
          </Text>
          {videoStyles.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                commonStyles.optionCard,
                selectedStyle === style.id && commonStyles.selectedOption,
              ]}
              onPress={() => setSelectedStyle(style.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Icon name={style.icon as any} size={20} style={{ marginRight: 12 }} />
                <View>
                  <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 2 }]}>
                    {style.name}
                  </Text>
                  <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginBottom: 0 }]}>
                    {style.description}
                  </Text>
                </View>
              </View>
              {selectedStyle === style.id && (
                <Icon name="checkmark-circle" size={20} style={{ color: colors.primary }} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={commonStyles.card}>
          <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 15 }]}>
            Background Music
          </Text>
          {musicOptions.map((music) => (
            <TouchableOpacity
              key={music.id}
              style={[
                commonStyles.optionCard,
                selectedMusic === music.id && commonStyles.selectedOption,
              ]}
              onPress={() => setSelectedMusic(music.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Icon name="musical-notes" size={20} style={{ marginRight: 12 }} />
                <View>
                  <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 2 }]}>
                    {music.name}
                  </Text>
                  <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginBottom: 0 }]}>
                    {music.genre}
                  </Text>
                </View>
              </View>
              {selectedMusic === music.id && (
                <Icon name="checkmark-circle" size={20} style={{ color: colors.primary }} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={commonStyles.card}>
          <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 15 }]}>
            Video Duration
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {['15', '30', '60', '90'].map((dur) => (
              <TouchableOpacity
                key={dur}
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    marginHorizontal: 4,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: 'center',
                  },
                  duration === dur && {
                    borderColor: colors.primary,
                    backgroundColor: colors.primary + '10',
                  },
                ]}
                onPress={() => setDuration(dur)}
              >
                <Text style={[
                  commonStyles.textLeft,
                  { textAlign: 'center', marginBottom: 0 },
                  duration === dur && { color: colors.primary, fontWeight: '600' },
                ]}>
                  {dur}s
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={commonStyles.buttonContainer}>
          <Button
            text={isGenerating ? "Generating Video..." : "Generate Video"}
            onPress={handleGenerate}
            style={[buttonStyles.primary, isGenerating && { opacity: 0.7 }]}
            disabled={isGenerating}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}