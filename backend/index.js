const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`backend running on http://localhost:${PORT}`); // use backticks not single quotes
});

function scrambleWord(word){
    // Split word into array of characters
    const characters = word.split('');

    // Shuffle characters with Fisher-Yates shuffle algorithm
    for (let i = characters.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    // Join shuffled characters back together
    const scrambledWord = characters.join('');

    return scrambledWord;
}

let currentWord = null;
let score = 0;

// Generate random word length between 3-7
const minWordLength = 3;
const maxWordLength = 7;
const randomWordLength = () =>{
    return Math.ceil(Math.random() * (maxWordLength - minWordLength + 1)) + minWordLength; 
}

// Retrieve word from random word API
app.get('/api/getword', async(req, res) => {
    const length = randomWordLength();
    try{
        const response = await axios.get(`https://random-word-api.herokuapp.com/word?length=${length}`);
        const unscrambledWord = response.data[0];
        const scrambledWord = scrambleWord(unscrambledWord);
        currentWord = {unscrambled: unscrambledWord, scrambled: scrambledWord};
        console.log(unscrambledWord); // for seeing the right answer
        res.json(currentWord);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve word'});
    }
});

// Enter guess
app.post('/api/guess', (req, res) => {
    const userGuess = req.body.guess;
    if(!currentWord){
        res.status(400).json({error: "No current word."});
    } else{
        const isCorrect = userGuess == currentWord.unscrambled; // Handle case where word is valid word but doesn't match unscrambled word
        if(isCorrect){
            currentWord = null;
        }
        res.json({isCorrect, score});
    }   
});

app.get('/api/score', (req, res) => { // score endpoint 
    res.send(`${score}`); // converts score to string
});

app.post('/api/score', (req, res) => {
    const scoreUpdate = req.body.scoreUpdate;
    if(scoreUpdate == 0){
        score = 0;
    } else{
        score = score + scoreUpdate;
    }
    res.json({message: "Score updated.", newScore: `${score}`});
});