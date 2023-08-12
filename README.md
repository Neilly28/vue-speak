# SpeakVue

SpeakVue is a personal full-stack web application project that connects language learners with experienced teachers. Built using Vue.js, Node.js Express, and MongoDB.

# Overview

- User-friendly Interface: SpeakVue's intuitive design ensures a seamless experience for users to find and connect with teachers who match their learning needs. Heavily inspired by my own German learning journey with [Italki](https://www.italki.com/)!

- Teacher Booking: Users can easily browse through a diverse range (20, lol) of teachers, view their profiles, teaching level, and availability, and book sessions that align with their schedules.

- Favorites: Keep track of your preferred teachers by adding them to your favorites list, making it convenient to access their profiles and schedule sessions.

- Authentication and JWT: Secure user registration and login functionality using JWT authentication, ensuring a safe and personalized experience. You only need to register a username and password. No email is required for simplicity's sake!

- Vue Composition API: Because I wanted to learn the newer way and it looked similar to React's functional components. Resulted in clean, efficient, maintainable, scalable code.

- Pinia State Management: I wanted some way to store and access user data easily. Through Pinia state management, I ensure smooth data flow across components, optimizing performance and responsiveness.

- Vue Router: Seamlessly navigate between different sections of the app using Vue Router, with route guards to keep unauthorized people away :)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Neilly28/vue-speak.git
```

2. Navigate to the backend directory and install the dependencies:

```bash
cd backend
npm install
```

3. Navigate to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```

## Usage

1. Start the backend server:

```bash
nodemon index.js
```

2. Start the frontend app:

```bash
npm run serve
```

## Technologies Used

- Frontend: Vue.js
- Backend: Node.js with Express.js
- Database: MongoDB

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
