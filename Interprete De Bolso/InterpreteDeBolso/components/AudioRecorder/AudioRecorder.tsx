import React, { useState } from 'react';
import { TouchableOpacity, Text,StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';


interface AudioRecorderProps {
  onTranscription: (transcription: string) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscription }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        const { status } = await requestPermission();
        if (status !== 'granted') {
          console.log('Permission not granted');
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  const stopRecording = async () => {
    if (recording) {
      setRecording(null);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        sendAudioToAPI(uri);
      }
    }
  };

  const sendAudioToAPI = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('audio', blob, 'recording.m4a'); // Passando o blob e o nome do arquivo

    try {
      const apiResponse = await fetch('https://sua-api-url.com/speech-to-text', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await apiResponse.json();
      onTranscription(data.transcription); // Chame a função para enviar a transcrição para o componente pai
    } catch (error) {
      console.error('Erro ao enviar áudio para a API:', error);
    }
  };

  return (
    <TouchableOpacity
    onPress={recording ? stopRecording : startRecording}
    style={styles.button} // Adicione um estilo para o botão
  >
    <FontAwesome
      name={recording ? 'stop' : 'microphone'} // Use o ícone de microfone ou de parar
      size={24} // Tamanho do ícone
      color="white" // Cor do ícone
    />
    <Text style={styles.text}>{recording ? 'Parar' : 'Gravar'}</Text>
  </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFAA6D', // Cor de fundo do botão
      padding: 10,
      borderRadius: 5,
    },
    text: {
      color: 'white',
      marginLeft: 5, // Espaçamento entre o ícone e o texto
    },
  });

export default AudioRecorder;
