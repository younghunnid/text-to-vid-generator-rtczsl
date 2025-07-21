import { Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';

interface SavedVideo {
  id: string;
  title: string;
  duration: string;
  style: string;
  createdAt: string;
  thumbnail: string;
}

const sampleVideos: SavedVideo[] = [
  {
    id: '1',
    title: 'Welcome to our company presentation',
    duration: '30s',
    style: 'Corporate',
    createdAt: '2024-01-15',
    thumbnail: 'business',
  },
  {
    id: '2',
    title: 'Product launch announcement',
    duration: '60s',
    style: 'Modern',
    createdAt: '2024-01-14',
    thumbnail: 'rocket',
  },
  {
    id: '3',
    title: 'Team introduction video',
    duration: '45s',
    style: 'Cinematic',
    createdAt: '2024-01-13',
    thumbnail: 'people',
  },
];

export default function VideosScreen() {
  const [videos, setVideos] = useState<SavedVideo[]>(sampleVideos);

  const handleVideoPress = (video: SavedVideo) => {
    console.log('Opening video:', video.title);
    // In a real app, this would open the video player
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter(v => v.id !== videoId));
    console.log('Deleted video:', videoId);
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={commonStyles.subtitle}>My Videos</Text>
          <TouchableOpacity onPress={() => router.push('/create')}>
            <Icon name="add" size={24} />
          </TouchableOpacity>
        </View>

        {videos.length === 0 ? (
          <View style={[commonStyles.content, { justifyContent: 'center' }]}>
            <Icon name="videocam-off" size={60} style={{ color: colors.textSecondary, marginBottom: 20 }} />
            <Text style={[commonStyles.text, { color: colors.textSecondary, marginBottom: 20 }]}>
              No videos yet
            </Text>
            <Text style={[commonStyles.text, { color: colors.textSecondary, marginBottom: 30 }]}>
              Create your first video to get started
            </Text>
            <Button
              text="Create Video"
              onPress={() => router.push('/create')}
              style={buttonStyles.primary}
            />
          </View>
        ) : (
          <>
            <Text style={[commonStyles.textLeft, { marginBottom: 20, color: colors.textSecondary }]}>
              {videos.length} video{videos.length !== 1 ? 's' : ''}
            </Text>

            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={commonStyles.card}
                onPress={() => handleVideoPress(video)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{
                    width: 60,
                    height: 40,
                    backgroundColor: colors.backgroundAlt,
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}>
                    <Icon name="play" size={20} style={{ color: colors.primary }} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 2 }]}>
                      {video.title}
                    </Text>
                    <Text style={[commonStyles.textLeft, { fontSize: 12, color: colors.textSecondary, marginBottom: 0 }]}>
                      {video.duration} • {video.style} • {video.createdAt}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteVideo(video.id)}
                    style={{ padding: 8 }}
                  >
                    <Icon name="trash" size={20} style={{ color: colors.error }} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}

            <View style={commonStyles.buttonContainer}>
              <Button
                text="Create New Video"
                onPress={() => router.push('/create')}
                style={buttonStyles.primary}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}