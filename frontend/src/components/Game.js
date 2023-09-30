import React, { useRef, useEffect, useState } from 'react';
import { 
    Input,
    Button,
    Heading,
    Text,
    Box,
    VStack,
    HStack,
    Flex,
    keyframes,
    useColorModeValue
 } from '@chakra-ui/react'
import axios from 'axios'

const Game = ({whichRound, numberRounds, updateRound, totalAttempts, setTotalAttemps, startNewGameCallback}) => {
    const [scrambled, setScrambled] = useState("");
    const [unscrambled, setUnscrambled] = useState("");
    const previousUnscrambledRef = useRef('');
    const [userGuess, setUserGuess] = useState(""); 
    const [score, setScore] = useState("");
    const [displayFeedback, setDisplayFeedback] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [readyNewRound, setReadyNewRound] = useState(false);
    const [isLoadingWord, setisLoadingWord] = useState(false);

    const black = useColorModeValue('black', 'white')
    const white = useColorModeValue('white', 'black')
    const green = useColorModeValue('green', 'green.300')
    const red = useColorModeValue('red', 'red.300')
    
    async function fetchWord(){
        setisLoadingWord(true);
        try{
            const response = await axios.get('http://localhost:3000/api/getword');
            setScrambled(response.data.scrambled);
            setUnscrambled(response.data.unscrambled);
            setisLoadingWord(false);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        previousUnscrambledRef.current = unscrambled;
    }, [unscrambled]);
    
    async function updateScore(clientScoreUpdate){
        try{
            const response = await axios.post('http://localhost:3000/api/score', {
                scoreUpdate: clientScoreUpdate
            });
            setScore(response.data.newScore);
        }catch(error){
            console.error(error);
        }
    }

    function handleUserResponse(isCorrect){
        setDisplayFeedback(true);
        setUserGuess("");
        setTotalAttemps(totalAttempts+1);
        if(isCorrect){
            updateScore(1); 
            setFeedback(true);
        }else{
            setFeedback(false);
            setAttemptsLeft(attemptsLeft-1);
        }
    }

    async function isCorrectWord(){
        try{
            const response = await axios.post('http://localhost:3000/api/guess',{
                guess: userGuess
            })
            handleUserResponse(response.data.isCorrect);
        } catch(error) {
            console.error(error);
        }
    }

    // Start Game - runs everytime a new game is started/page is refreshed
    useEffect(() => {
        startNewGameCallback(); // Call the function via the prop
        startNewGame();
     }, []);     

    function startNewGame(){
        setScrambled(""); // Clear the scrambled word
        setUnscrambled(""); // Clear the unscrambled word
        previousUnscrambledRef.current = '';
        setUserGuess(""); // Clear the user's guess
        setDisplayFeedback(false); // Hide any feedback
        setFeedback(""); // Clear the feedback
        setAttemptsLeft(3); // Reset attempts left
        setReadyNewRound(false); // Not ready for a new round
        setisLoadingWord(false); // Stop loading word
        updateRound(0);
        updateScore(0);
        fetchWord();
    }

    function newRound(){
        fetchWord();
        updateRound(1);
        setAttemptsLeft(3);
        setDisplayFeedback(false);
        setReadyNewRound(false);
    }

    useEffect(() => {
        if(attemptsLeft === 0){
            setReadyNewRound(true);
        }
    }, [attemptsLeft, readyNewRound])
    
    const GuessButton = () =>{
        return(
            <Button 
                bg={black}
                color={white}
                onClick={() => {isCorrectWord();}}
                _hover={{
                    bg: 'teal.500', // Change the color on hover
                    color: 'white'
                  }}>
            Guess</Button>
        )
    }

    const Feedback = () => {
        return(
            <Heading className="feedback" 
                color={feedback ? green : red}>
            {feedback ? "Correct! The answer is " + "'" + previousUnscrambledRef.current + "'" + "!" : "Nope, that's not right."}</Heading>
        )
    } // Have it display until the next word is fetched. Or press enter to continue
    /*
    If you want responsiveness: use clamp{} css
    */

    const scrambleAnimation = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
    `;

    const NextRoundPage = () => {
        return(
            <Flex h="100%" justify="center" align="center">
                <VStack className="enterWord" spacing={6} mb="200px" textAlign="center">
                    <Heading>Aw darn, you ran out of guesses!</Heading>
                    <Heading> {"The answer was " + "'" + previousUnscrambledRef.current + "'" + "!"}</Heading>
                    <Heading as="h2" size="md">Ready for a new round?</Heading>
                    <Button 
                        bg={black}
                        color={white}
                        onClick={newRound}
                        __hover={{
                            bg: 'teal.500', // Change the color on hover
                            color: 'white'
                          }}
                    > Let's go! </Button>
                </VStack>
            </Flex>
        )  
    }

    function feedbackButton(){
        if (feedback) {
            newRound();
        }
        setDisplayFeedback(false);
    }

    return(
        <Box className="App" width="100%" height='100%'>
            <Box
                border="2px"// Adjust border width and color as needed
                borderColor = {black}
                borderRadius="20px"    // Adjust border radius as needed
                padding="40px"         // Add padding to control the spacing between the content and border
                textAlign="center"
                mb="200px"
                mt="32px"
                height="90%"
                >
                    <Flex width="100%" top={0} justify="right">
                        <HStack spacing={4}> 
                            <Text fontWeight="bold" fontSize="lg">Score: {score}</Text> 
                            <Text fontWeight="bold" fontSize="lg">Round: {whichRound}/{numberRounds}</Text>
                        </HStack>
                    </Flex>
                    {readyNewRound && <NextRoundPage/>}
                    {!readyNewRound && <Flex h="100%" justify="center" align="center">
                        <VStack className="enterWord" spacing={6} mb="100px">
                            {displayFeedback && <Feedback/>}
                            {!displayFeedback && 
                                <VStack align="center" spacing={6}> 
                                    {isLoadingWord && <Heading
                                        css={{
                                            animation: `${scrambleAnimation} 0.5s linear infinite`,
                                        }}
                                    >Scrambling...</Heading>}
                                    {!isLoadingWord && <Heading>{scrambled}</Heading>}
                                    <HStack>
                                        <Input className='guessInput'
                                            width="m"
                                            placeholder='Enter your guess'
                                            size='md'
                                            type='text'
                                            borderColor={black}
                                            borderWidth="2px"
                                            focusBorderColor={black}
                                            focusBorderWidth='4px'
                                            value={userGuess}
                                            onChange={(e) => {setUserGuess(e.target.value)}}
                                            onKeyDown={(e) => {
                                                if(e.key === "Enter"){
                                                    isCorrectWord(); 
                                                }
                                            }}
                                            autoFocus    
                                        />
                                        <GuessButton/>
                                    </HStack>
                                    <Text fontWeight="bold" fontSize='lg'>Attempts left: {attemptsLeft}</Text>
                                </VStack>}
                            {displayFeedback && 
                                <Button
                                bg={black}
                                color={white}
                                onClick={() => {
                                    feedbackButton();
                                }}
                                _hover={{
                                    bg: 'teal.500', // Change the color on hover
                                    color: 'white'
                                  }}
                                >{feedback ? "Next Word!" : "Try Again!"} </Button>
                            }
                        </VStack>   
                    </Flex>}
            </Box>
        </Box>
    );
}

export default Game