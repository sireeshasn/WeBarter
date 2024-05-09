const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import the path module

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS middleware
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://sireesha2622:Siri12345@cluster0.ekefhyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Route handler for root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the User Registration API');
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route handler for user-related endpoints
app.use('/api/users', userRoutes);

// Create an HTTP server instance
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming chat messages
  socket.on('chat message', (message) => {
    console.log('Message:', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
