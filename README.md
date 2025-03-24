
# The Event Solution

## Project Overview
The Event Solution is a web-based platform designed to manage and showcase events efficiently. It allows users to search for events, view event details, and interact with an integrated calendar. Admins can log in to add events, which are stored in a MongoDB database and displayed dynamically on the frontend.

## Tech Stack
- **Frontend:** React.js, Bootstrap
- **Backend:** Express.js, Node.js
- **Database:** MongoDB

## Features
- **User Authentication**: Login and signup functionality for users.
- **Event Management**: Add, view, and search for events.
- **Calendar Integration**: A visual event calendar implemented with FullCalendar.js.
- **Dynamic UI**: Uses Bootstrap for responsive design.

## Project Structure
```
root/
│── backend/            # Node.js and Express.js backend
│   ├── server.js       # Main server file
│   ├── routes/         # API routes
│   ├── models/         # Mongoose models
│   └── config/         # Configuration files
│
│── frontend/           # React.js frontend
│   ├── public/         # Static assets
│   ├── src/            # React source code
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Main page components
│   │   ├── App.js      # Main React component
│   │   ├── index.js    # React entry point
│   ├── styles/         # CSS files
│
│── README.md           # Project documentation
│── package.json        # Dependencies and scripts
│── .gitignore          # Ignored files in version control
```

## Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo/event-solution.git
   cd event-solution
   ```
2. **Backend Setup**
   ```sh
   cd backend
   npm install
   npm start
   ```
3. **Frontend Setup**
   ```sh
   cd frontend
   npm install
   npm start
   ```

## Usage
- **Run the backend server**: `npm start` inside the backend folder.
- **Run the frontend server**: `npm start` inside the frontend folder.
- **Access the application**: Open `http://localhost:3000/` in your browser.

## Contribution
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit changes.
4. Push the branch and create a pull request.

## License
This project is licensed under the MIT License.

