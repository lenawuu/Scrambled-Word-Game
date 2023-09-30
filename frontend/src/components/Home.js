import { Center, Heading, Box, Button, Text, VStack, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Game from './Game'
import Navbar from './Navbar'
import Ekreb from './Ekreb'
import axios from 'axios'

export default function Home() {
    const [isGamePlaying, setIsGamePlaying] = useState(false);
    const [whichRound, setWhichRound] = useState(1);
    const [numberRounds, setNumberRounds] = useState(10)
    const [isGameOver, setIsGameOver] = useState(false);
    const [totalAttempts, setTotalAttempts] = useState(1);
    const [score, setScore] = useState(0);

    const gameref = useRef();
    const buttonColor = useColorModeValue('black', 'white')
    const buttonTextColor = useColorModeValue('white', 'black')

    const HomePage = () => {
        const words = ['ekreb.', 'berke.', 'rekeb.', 'kreeb.'];

        return(
            <Flex className="App" width="100%" height='100%' align="center" justify="center">

                    <VStack position='absolute' top='40%'><Ekreb words={words}/></VStack>
                    <VStack position='absolute' top='50%' textAlign="center" spacing={4}>
                        <Text fontSize="2xl">a game of unscrambling.</Text>
                        <Box>
                            <Button 
                                bg={buttonColor}
                                color={buttonTextColor}
                                size='lg'
                                onClick={() => {
                                    setIsGamePlaying(true);
                                }}
                                _hover={{
                                    bg: 'teal.500', // Change the color on hover
                                    color: 'white'
                                }}
                            >Play</Button>
                        </Box>
                    </VStack>
            </Flex>
        )
    }

    const GameOverPage = () => {
        useEffect(() => {
            getScore();
        }, []);
        return (
            <Flex className="App" width="100%" height='100%' align="center" justify="center" direction="column">
                <Box
                border="2px" // Adjust border width and color as needed
                borderColor={buttonColor}
                borderRadius="20px"    // Adjust border radius as needed
                padding="100px"         // Add padding to control the spacing between the content and border
                textAlign="center"
                mb="200px"
                >
                    <VStack spacing={8}>
                        <Heading size="2xl">Game Over!</Heading>
                        <Heading size="lg">How did you do?</Heading>
                        <Box align="left">
                            <Text fontWeight="bold" fontSize="xl">Rounds played: {whichRound-1}</Text>
                            <Text fontWeight="bold" fontSize="xl">Score: {score}</Text>
                            <Text fontWeight="bold" fontSize="xl">Total attempts: {totalAttempts}</Text>
                            <Text fontWeight="bold" fontSize="xl">
                                Accuracy: {(score/totalAttempts*100).toFixed(2)+"%"}
                            </Text>
                        </Box>
                        <HStack spacing={4}>
                            <Button
                                bg={buttonColor}
                                color={buttonTextColor}
                                size="lg"
                                onClick={() => {
                                    startNewGameHome();
                                }}
                                _hover={{
                                    bg: 'teal.500', // Change the color on hover
                                    color: 'white'
                                  }}
                            >
                                Play Again
                            </Button>
                            <Button
                                bg={buttonColor}
                                color={buttonTextColor}
                                size="lg"
                                onClick={() => {
                                    loadHomePage();
                                }}
                                _hover={{
                                    bg: 'teal.500', // Change the color on hover
                                    color: 'white'
                                  }}
                            >
                                Back to Home Page
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Flex>
        );
    };
    

    const handleRoundUpdate = (roundUpdate) => {
        if(roundUpdate === 0){
            setWhichRound(1);
        }else{
            setWhichRound(whichRound+roundUpdate);
        }
    }

    useEffect(() => {
        if(whichRound == numberRounds+1){
            setIsGameOver(true);
        }
    }, [whichRound])

    async function getScore(){
        try{
            const response = await axios.get('http://localhost:3000/api/score');
            setScore(response.data);
        }catch(error){
            console.error(error);
        }
    }

    function startNewGameHome(){
        setIsGameOver(false);
        setTotalAttempts(0);
    }

    function loadHomePage(){
        setIsGamePlaying(false); 
        setIsGameOver(false);
    }

    return (
        <Flex h="100%" height="100vh" direction="column" ml="4vw" mr="4vw" pt="24px" align='center'>
            <Navbar
                loadHomePage={loadHomePage}
            />
            <Flex display="flex" w="100%" h="100%">
                {!isGamePlaying && <HomePage />}
                {isGamePlaying && !isGameOver && <Game reference={gameref}
                    whichRound={whichRound}
                    updateRound={handleRoundUpdate}
                    numberRounds={numberRounds}
                    totalAttempts={totalAttempts}
                    setTotalAttemps={setTotalAttempts}
                    startNewGameCallback={startNewGameHome}
                />}
                {isGamePlaying && isGameOver && <GameOverPage/>}
            </Flex>
        </Flex>
    )
}
