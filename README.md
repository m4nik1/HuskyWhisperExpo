# HuskyWhisper

HuskyWhisper is a mobile application designed to transcribe and summarize lecture audio efficiently. Built using modern technologies, it leverages AI to process and summarize voice recordings, making it an essential tool for students and professionals alike. Summarizes lectures and meetings in 7 bullet points.

## Features

- **Audio Transcription**: Converts lecture audio into text using openai's whisper model.
- **Audio Summarization**: Summarizes the transcribed text to 5-7 bullet points.
- **Optimized Audio Transfer**: Efficiently transfers audio files to the backend using nodejs.

## How to run
### IMPORTANT: This is assuming nodejs/npm is setup in your current enviroment
1. Clone this repository and run ```npm install``` inside this repo folder
2. Download the expo application on your mobile phone (Search on app store or google play)
3. Run this frontend application in terminal on PC/laptop via ```npm start```
4. Scan Expo QR code and try it out!

## Tech Stack

- **Frontend**: React Native with TypeScript
- **Backend**: Python FastAPI for transcribing
- **AI Model**: Open source English Speech Recognition Model called Whisper
- **API**: RESTful API with Express.js for load balancing.
- **Cloud**: AWS/GCloud for handling voice transcription requests
