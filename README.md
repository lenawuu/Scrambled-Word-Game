## What you'll need:

For the backend, I used Node, Express, Axios, and CORS. Axios was used for HTTP requests. You can download and install Node.js from this [website](https://nodejs.org/en/download). Once Node is installed, install the following packages using npm install in the backend folder.

```
npm i express axios cors
```

The frontend was mostly built using the UI library Chakra UI in React. Please install the following packages in the frontend folder. Axios was also used in the frontend.

```
npm i @chakra-ui/react @chakra-ui/icons axios
```

## Running the website:

Once all the packages are installed, cd into the backend folder and run `node .` to start the backend server. You should see the following message: `backend running on http://localhost:3000` Everytime a word is fetched in the game, the unscrambled word will show up in the backend terminal. Then cd into the frontend folder and run `npm start`. The webpage will open up and you can start playing the game!

## Playing the game:

The website will start on the start screen. Press play. Guess the word. Press 'ENTER' or 'Guess' button to submit your guess. You will get feedback. you get 3 attempts. 3. and 10 rounds.  When the game is over you have the option to play again! Also, I included a dark mode toggle in the navbar.

## Little "features" I added

- Title screen animation
- Dark mode! Press the sun/moon button in the top right corner
- Home screen redirection when 'Ekreb' logo in Navbar is clicked
- 'Scrambling...' loading animation while the API retrieves a word
- Game Over screen with game stats like number of rounds played, accuracy, number of attempts
