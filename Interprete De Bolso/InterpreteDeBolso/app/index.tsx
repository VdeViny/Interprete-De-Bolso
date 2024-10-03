import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { InterruptionModeAndroid, Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Index() {
  const [text, setText] = useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState('');

  const [videosUris, setVideosUris] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPausedVideo, setShowPausedVideo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const videoMap = {
    'gatorebolando': require('../assets/videos/GATOREBOLANDO.mp4'),
    'waza': require('../assets/videos/waza.mp4'),
    'nome': require('../assets/videos/NOME.mp4'),
    'tarde': require('../assets/videos/TARDE.mp4'),
    'boa_noite': require('../assets/videos/BOA_NOITE.mp4'),
    'bom_dia': require('../assets/videos/BOM_DIA.mp4'),
    'bom': require('../assets/videos/BOM(a).mp4'),
    'boa': require('../assets/videos/BOM(a).mp4'),
    'tudo_bem': require('../assets/videos/TUDO_BEM.mp4'),
    'chuva': require('../assets/videos/CHUVA.mp4'),
    'chovendo': require('../assets/videos/CHUVA.mp4'),
    'chover': require('../assets/videos/CHUVA.mp4'),
    'tempestade': require('../assets/videos/TEMPESTADE.mp4'),
    '?': require('../assets/videos/INTERROGACAO.mp4'),
    'nada': require('../assets/videos/NADA.mp4'),
    'ola': require('../assets/videos/OLA.mp4'),
    'olá': require('../assets/videos/OLA.mp4'),
    'oi': require('../assets/videos/OI.mp4'),
    'mais': require('../assets/videos/MAIS.mp4'),
    '+': require('../assets/videos/MAIS.mp4'),
    'menos': require('../assets/videos/MENOS.mp4'),
    '-': require('../assets/videos/MENOS.mp4'),
    'igual': require('../assets/videos/IGUAL.mp4'),
    '=': require('../assets/videos/IGUAL.mp4'),
    'entendido': require('../assets/videos/ENTENDIDO.mp4'),
    'entendi': require('../assets/videos/ENTENDIDO.mp4'),
    'entender': require('../assets/videos/ENTENDER.mp4'),
    'fome': require('../assets/videos/FOME.mp4'),
    'diarreia': require('../assets/videos/DIARREIA.mp4'),
    'diarréia': require('../assets/videos/DIARREIA.mp4'),
    'seu': require('../assets/videos/SEU.mp4'),
    'qual': require('../assets/videos/QUAL.mp4'),
    'comer': require('../assets/videos/COMER.mp4'),
    'como_vai_voce': require('../assets/videos/COMO_VAI_VOCÊ.mp4'),
    'como': require('../assets/videos/COMO.mp4'),
    'desculpa': require('../assets/videos/DESCULPA.mp4'),
    'dormir': require('../assets/videos/DORMIR.mp4'),
    'fazer': require('../assets/videos/FAZER.mp4'),
    'feliz': require('../assets/videos/FELIZ.mp4'),
    'ir': require('../assets/videos/IR.mp4'),
    'nao': require('../assets/videos/NÃO.mp4'),
    'nervoso': require('../assets/videos/NERVOSO.mp4'),
    'o_que': require('../assets/videos/O_QUE.mp4'),
    'obrigado': require('../assets/videos/OBRIGADO.mp4'),
    'onde': require('../assets/videos/ONDE.mp4'),
    'por_favor': require('../assets/videos/POR_FAVOR.mp4'),
    'porque': require('../assets/videos/PORQUÊ.mp4'),
    'quando': require('../assets/videos/QUANDO.mp4'),
    'quem': require('../assets/videos/QUEM.mp4'),
    'sim': require('../assets/videos/SIM.mp4'),
    'tchau': require('../assets/videos/TCHAU.mp4'),
    'triste': require('../assets/videos/TRISTE.mp4'),
    'ajuda': require('../assets/videos/AJUDA.mp4'),
    'socorro': require('../assets/videos/SOCORRO.mp4'),
    'azul': require('../assets/videos/AZUL.mp4'),
    'verde': require('../assets/videos/VERDE.mp4'),
    'vermelho': require('../assets/videos/VERMELHO.mp4'),
    'preto': require('../assets/videos/PRETO.mp4'),
    'branco': require('../assets/videos/BRANCO.mp4'),
    'gato': require('../assets/videos/GATO.mp4'),
    'cachorro': require('../assets/videos/CACHORRO.mp4'),
    'mamão': require('../assets/videos/MAMAO.mp4'),
    'animal': require('../assets/videos/ANIMAL.mp4'),
    '1': require('../assets/videos/1.mp4'),
    '2': require('../assets/videos/2.mp4'),
    '3': require('../assets/videos/3.mp4'),
    '4': require('../assets/videos/4.mp4'),
    '5': require('../assets/videos/5.mp4'),
    '6': require('../assets/videos/6.mp4'),
    '7': require('../assets/videos/7.mp4'),
    '8': require('../assets/videos/8.mp4'),
    '9': require('../assets/videos/9.mp4'),
    '10': require('../assets/videos/DEZ.mp4'),
    'a': require('../assets/videos/A.mp4'),
    'b': require('../assets/videos/B.mp4'),
    'c': require('../assets/videos/C.mp4'),
    'd': require('../assets/videos/D.mp4'),
    'e': require('../assets/videos/E.mp4'),
    'f': require('../assets/videos/F.mp4'),
    'g': require('../assets/videos/G.mp4'),
    'H': require('../assets/videos/H.mp4'),
    'i': require('../assets/videos/I.mp4'),
    'j': require('../assets/videos/J.mp4'),
    'k': require('../assets/videos/K.mp4'),
    'l': require('../assets/videos/L.mp4'),
    'm': require('../assets/videos/M.mp4'),
    'n': require('../assets/videos/N.mp4'),
    'o': require('../assets/videos/O.mp4'),
    'p': require('../assets/videos/P.mp4'),
    'q': require('../assets/videos/Q.mp4'),
    'r': require('../assets/videos/S.mp4'),
    't': require('../assets/videos/T.mp4'),
    'u': require('../assets/videos/U.mp4'),
    'v': require('../assets/videos/V.mp4'),
    'w': require('../assets/videos/W.mp4'),
    'x': require('../assets/videos/X.mp4'),
    'y': require('../assets/videos/Y.mp4'),
    'z': require('../assets/videos/Z.mp4'),
  };

  const videoPausado = require('../assets/videos/CHUVA.mp4');

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#7a8088',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: '250%',
      height: 450,
      marginBottom: 10,
    },
    caixa: {
      margin: 10,
      width: 240,
      padding: 10,
      borderColor: '#00ffa1',
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    botao: {
      backgroundColor: '#FFAA6D',
      borderRadius: 10,
      height: 52.5,
      width: '26%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    botaoper: {
      color: '#00ffa1',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 37.5,
    },
    juntar: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
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
    setShowPausedVideo(false);
    setIsPlaying(true);
    setText('');
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      const nextIndex = currentVideoIndex + 1;

      if (nextIndex < videosUris.length) {
        setCurrentVideoIndex(nextIndex);
      } else {
        setIsPlaying(false);
        setShowPausedVideo(true);
      }
    }
  };

  return (
    <View style={styles.container}>

      {showPausedVideo && (
        <Video
          ref={videoRef}
          source={videoPausado}
          shouldPlay={false} // Este vídeo ficará sempre pausado
          resizeMode="contain"
          style={styles.video}
        />
      )}


      {!showPausedVideo && isPlaying && videosUris.length > 0 && (
        <Video
          ref={videoRef}
          source={videosUris[currentVideoIndex]}
          shouldPlay={isPlaying}
          isLooping={false}
          resizeMode='contain'
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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

      <View style={styles.juntar}>
        <TouchableOpacity onPress={playVideo} style={styles.botao}>
          <FontAwesome6 name="hands-asl-interpreting" style={styles.botaoper} />
        </TouchableOpacity>

        {/*  <TouchableOpacity onPress={limpar} style={styles.botaolixo}>
      <FontAwesome name={'trash'} size={24} color="white" />
    </TouchableOpacity> */}

        {/*<Text style={styles.tebotao}>Interpretar</Text> */}
      </View>
    </View>
  );
}
