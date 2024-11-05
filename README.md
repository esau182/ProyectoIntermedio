# VoxTranslate
# Overview
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This guide explains how to set up and deploy the project on a local machine or a hosting platform.

This project is a powerful voice transcription and translation web application designed to make language translation accessible and efficient. Using cutting-edge technology, it captures spoken words through the microphone, transcribes them into text, and provides a real-time translation.

# Features

Voice Transcription: Converts spoken language into text accurately in real time using the browser’s built-in speech recognition capabilities.

Language Translation: Provides instant translation of transcribed text, making it easy for users to understand or communicate in different languages.

User Authentication: Secured login and registration features to protect user data, with token-based authentication for enhanced security.

Secure Data Storage: Utilizes MongoDB for efficient data management, and bcrypt for secure password storage.

## Prerequisites

Node.js (version 14 or higher)

MongoDB Atlas account and database set up

Git for version control

### Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```



### Install Dependencies

Install all the required Node.js packages by running:
```bash
npm install
```

### Set Up MongoDB Connection

Create a .env file in the root directory and add your MongoDB URI, along with other environment variables:

MONGODB_URI=your-mongodb-uri
SECRET_KEY=your-jwt-secret-key

Make sure your MongoDB IP access list allows connections from your local machine or from any location, as needed.

### Run the Server Locally

Start the server by running:
```bash
node server.js
```
The server should now be running at http://localhost:5000.

## Run the Frontend

To start the frontend part of the project, run:
```bash
npm start
```
Visit http://localhost:3000 in your browser to access the application.

## Deployment

The project is deployed on Render. To access the live application, visit: https://proyectointermedio-1777777.onrender.com/login

## Technologies Used

Front-end: React.

Back-End: Node.js y Express.

DataBase: MongoDB Atlas.

IA: Web Speech API.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Log in
![image](https://github.com/user-attachments/assets/df03e166-94b7-4356-a0eb-80962966b10b)

## Register
![image](https://github.com/user-attachments/assets/00db8a18-7a95-4306-a79a-597b711dad60)

## VoxTranslate View
![image](https://github.com/user-attachments/assets/232d1143-5715-4338-b7e6-31f7a0630666)

## VoxTranslate View while speaking

![image](https://github.com/user-attachments/assets/0d977049-f9df-43c7-820e-3d6b9778e0c1)

## Log out

![image](https://github.com/user-attachments/assets/58cbf52a-4bdf-4818-b0fb-2d4ed0ccb500)









