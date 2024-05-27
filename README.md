
# Reqly : A HTTP Request Inspector

## Demo
<video src="https://drive.google.com/file/d/1zVyG0rxtIxzJkbFhA9zcn_qHZjhlbpIL/view?usp=drive_link"></video>

## Features
- `Real-Time HTTP Request Inspection` : Generate a random URL for use in Axios or Fetch requests to inspect HTTP requests in real time, including headers, body, and methods.

- `Custom Response Generation` : Configure custom responses for the generated URLs to simulate various server scenarios for flexible testing.

- `User-Friendly Dashboard` : Manage URLs, view real-time requests, and set up custom responses with an intuitive dashboard.

This project is a full-stack application that facilitates http request inspection. The backend is built with Node.js and Express, and it uses Redis for data storage. The frontend is built with React and communicates with the backend through Socket.IO.

## Project Structure
The project is divided into two main directories: backend/ and frontend/.

### Backend
The express backend is responsible for handling HTTP requests, managing data in Redis, and emitting events through Socket.IO. The main entry point is src/index.ts.

#### Key files and directories in the backend include:

- src/io/io.ts: Contains the initializeSocketIO() function for setting up Socket.IO.
- src/model/Dump.ts: Defines the Dump and RequestData types.
- src/model/RedisCollector.ts: Defines the RedisCollector class for managing data in Redis.
- src/routes/index.ts: Defines the routes for the Express server.

### Frontend

The frontend is a React application that displays data received from the backend. The main entry point is src/main.tsx.

#### Key files and directories in the frontend include:

- src/components/: Contains React components used in the application.
- src/socket.ts: Sets up the Socket.IO client.

## Getting Started
To get started with this project, clone the repository and install the dependencies in both the backend/ and frontend/ directories:

```bash
    npm install
```

To start the backend server, navigate to the backend/ directory and run:
``` bash
    cd backend
    npm run build
    node dist/index.js
```

To start the frontend application, navigate to the frontend/ directory and run:
```bash
    cd frontend
    npm run dev
```

### Contributing
Contributions are welcome. Please open an issue to discuss your ideas before making changes.
