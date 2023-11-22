import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text,StyleSheet} from 'react-native';
import TypeWriter from './Typewriter';

const TypewriterComponent = () => {
  // const navigation = useNavigation();
  // const lines = [
  //   'We are creating your wallet',
  //   'Fetching Mainnet data',
  //   'We are encrypting your data',
  //   'Your wallet is now ready',
  // ];
  // const [currentLine, setCurrentLine] = useState(0);
  // const [displayedLines, setDisplayedLines] = useState([]);
  // const [currentText, setCurrentText] = useState('');
  // const [typing, setTyping] = useState(true);

  // useEffect(() => {
  //   if (currentLine < lines.length && typing) {
  //     const timer = setTimeout(() => {
  //       setCurrentText(lines[currentLine].substring(0, currentText.length + 1));
  //     }, 100); // Typing speed (adjust as needed)

  //     if (currentText.length === lines[currentLine].length) {
  //       setTyping(false);
  //       setDisplayedLines(prevLines => [...prevLines, currentText]);
  //       setTimeout(() => {
  //         setCurrentLine(currentLine + 1);
  //         setCurrentText('');
  //         setTyping(true);
  //       }, 0.1); // Delay between lines (adjust as needed)
  //     }

  //     return () => clearTimeout(timer);
  //   } else if (currentLine === lines.length && !typing) {
  //     console.log('completed');
  //   }
  // }, [currentLine, currentText, typing, lines]);

  return (
    <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 25}}>    
    {/* <Typewriter 
    text={`We are creating your wallet\nFetching Mainnet data\nWe are encrypting your data\nYour wallet is now ready...`} 
    typingColors={['#999', '#888', '#777', '#666']} 
    fontSizes={[22, 22, 22, 22]} 
/> */}
 {/* "We are creating your wallet",
    "Fetching Mainnet data",
    "We are encrypting your data",
    "Your wallet is now ready..." */}
 <TypeWriter
        textArray={['We are creating your wallet', 'Fetching wallet data', 'We are encrypting your data', 'Your wallet is now ready!']}
        loop={false}
        speed={70}
        delay={100}
        textStyle={styles.typeWriterText}
        //cursorStyle={styles.typeWriterCursorText}
      />
    </View>
  );
};

export default TypewriterComponent;

const styles = StyleSheet.create({


  typeWriterText: {
    color: "#36cabd",
    fontSize: 23,
    fontWeight:'500',
    lineHeight:45
  },
  // typeWriterCursorText: {
  //   color:"#ccc",
  //   fontSize: 22,
  // },
})
