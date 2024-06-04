
# Reqly : A HTTP Request Inspector

## Demo

https://github.com/MuneerAhmed03/Reqly/assets/97833696/0536feae-16c1-4e81-ab44-22801d60ebde

## Getting Started

 ### Installation
 Clone the repository:
 ```bash
 git clone https://github.com/MuneerAhmed03/Reqly.git
 ```
 Navigate to the project Directort:
 ```bash
 cd Reqly
 ```
 Run the following command to start the application
 ```bash
 docker-compose up
 ```

 #### Without Docker

 - Clone the repository:
 ```bash
 git clone https://github.com/MuneerAhmed03/Reqly.git
```
 - Create a `.env` file based on the `.env.example` file in both the backend/ and frontend/ directorie
 
- Install the dependencies in both the backend/ and frontend/ directories:

```bash
    npm install
```

- To start the backend server, navigate to the backend/ directory and run:
``` bash
    cd backend
    npm run build
    node dist/index.js
```

- To start the frontend application, navigate to the frontend/ directory and run:
```bash
    cd frontend
    npm run dev
```

## Features
- `Real-Time HTTP Request Inspection` : Generate a random URL for use in Axios or Fetch requests to inspect HTTP requests in real time, including headers, body, and methods.

- `Custom Response Generation` : Configure custom responses for the generated URLs to simulate various server scenarios for flexible testing.

- `User-Friendly Dashboard` : Manage URLs, view real-time requests, and set up custom responses with an intuitive dashboard.

This project is a full-stack application that facilitates http request inspection. The backend is built with Node.js and Express, and it uses Redis for data storage. The frontend is built with React and communicates with the backend through Socket.IO.

## Project Structure
The project is divided into two main directories: backend/ and frontend/.

### Backend
The express backend is responsible for handling HTTP requests, managing data in Redis, and emitting events through Socket.IO.


### Frontend

The frontend is a React application that displays data received from an express backend and through socket emition.

### Contributing
Contributions are welcome. Please open an issue to discuss your ideas before making changes.