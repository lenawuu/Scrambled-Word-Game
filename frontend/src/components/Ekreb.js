import React, { useState, useEffect } from 'react';
import {Heading, Button} from '@chakra-ui/react'
import './animations.css';

const Ekreb = ({ words }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [animationState, setAnimationState] = useState('playing');

  useEffect(() => {
    const currentWord = words[wordIndex];
    const wordLength = currentWord.length;

    let timeoutId;

    if (animationState === 'playing') {
      // Typing animation
      if (text.length < wordLength) {
        timeoutId = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, 100);
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          setText('');
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1000); // Pause before starting next word
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isTyping, words, wordIndex, animationState]);

  return (
    <Heading size="4xl" position="relative">
      <span className="typewriter-text">{text}</span>
      <span className={`cursor ${isTyping ? 'blink' : ''}`}></span>
    </Heading>
  );
};

export default Ekreb;
