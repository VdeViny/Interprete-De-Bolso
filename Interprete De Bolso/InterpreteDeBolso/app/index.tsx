import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { InterruptionModeAndroid, Video } from 'expo-av';
import { Audio } from 'expo-av';
import Voice from '@react-native-voice/voice';
import { FontAwesome } from '@expo/vector-icons';

export default function Index() {
  const [text, setText] = useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState('');

  const [videosUris, setVideosUris] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const videoMap = {
    'pessoa': require('../assets/videos/pessoa.mp4'),
    'gato': require('../assets/videos/gato.mp4'),
    'waza': require('../assets/videos/waza.mp4'),
    'calabreso': require('../assets/videos/calabreso.mp4'),
  };


  /* const [isRecording, setIsRecording] = React.useState(false);

  useEffect(() => {
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (granted) {
        Audio.setAudioModeAsync({
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true
        })
      }
    })
  }, []);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = err => setError(err.error);
  Voice.onSpeechResults = result => setResult(result.value[0]);

  const startRecording = async () => {
    try {
      await Voice.start('pt-BR');
      setError('');
    } catch (err) {
      setError(err.message || 'Erro ao iniciar a gravação.');
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      setError(err.message || 'Erro ao parar a gravação.');
    }
  };*/

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#7a8088',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: 200,
      marginBottom: 20,
    },
    caixa: {
      margin: 15,
      width: 235,
      padding: 10,
      borderColor: '#ffffff',
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    botao: {
      backgroundColor: '#FFAA6D',
      padding: 10,
      borderRadius: 5,
      height: 40,
      width: '40%',
      alignItems: 'center',
    },
    fontbutton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFAA6D',
      padding: 10,
      borderRadius: 5,
    },
    fonttext: {
      color: 'white',
      marginLeft: 5,
    },
    videoContainer: {
      marginTop: 20,
      width: '100%',
    }
  });

  const playVideo = () => {
    if (text.trim() === '') {
      setError('Por favor, insira alguma palavra.');
      return;
    }

    const words = text.toLowerCase().split(' ').filter(word => word !== '');
    console.log('Palavras extraídas:', words);

    const videosToPlay = words.map(word => {
      const video = videoMap[word];
      if (!video) {
        console.log(`Nenhum vídeo com esse nome: "${word}"`);
      }
      return video;
    }).filter(uri => uri !== undefined);

    console.log('Videos que serão reproduzidos: ', videosToPlay);

    if (videosToPlay.length === 0) {
      setError('Nenhum vídeo correspondente às palavras inseridas.');
      return;
    }

    setVideosUris(videosToPlay);
    setCurrentVideoIndex(0);
    setIsPlaying(true);
  };
  
  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      const nextIndex = currentVideoIndex + 1;

      if (nextIndex < videosUris.length) {
        setCurrentVideoIndex(nextIndex);
      } else {
        setIsPlaying(false);
        setVideosUris([]);
      }
    }
  };

  return (
    <View style={styles.container}>
    
    {isPlaying && videosUris.length > 0 && (
        <Video
          ref={videoRef}
          source={videosUris[currentVideoIndex]} // Toca o vídeo atual
          shouldPlay
          isLooping={false}
          resizeMode='contain'
          onPlaybackStatusUpdate={onPlaybackStatusUpdate} // Monitora o status de reprodução
          style={styles.video}
        />
      )}

      {/* <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={styles.fontbutton}>
<FontAwesome name={isRecording ? 'stop' : 'microphone'} size={24} color="white" />
<Text style={styles.fonttext}>{isRecording ? 'Parar' : 'Gravar'}</Text>
</TouchableOpacity> */}

      <TextInput
        placeholder="Escreva aqui"
        style={styles.caixa}
        onChangeText={setText}
        value={text}
      />

      <TouchableOpacity onPress={playVideo} style={styles.botao}>
        <Text style={{ color: 'white' }}>Interpretar</Text>
      </TouchableOpacity>
    </View>
  );
}
