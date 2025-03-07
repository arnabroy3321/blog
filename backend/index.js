const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/blogDB", {
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const blogSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array of user IDs who liked the post
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array of user IDs who shared the post
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Post', blogSchema);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.post("/createuser", async (req, res) => {
    const user = new User(req.query);
    await user.save();
    res.send(user);
    console.log(res.data)
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find().select('_id username');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
});

app.get('/users/byUsername/:username', async (req, res) => {
    try {
        const username = req.params.username;

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data (you may want to exclude sensitive fields like password)
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            // Add other fields you need, but avoid sending password
        });
    } catch (error) {
        console.error('Error fetching user by username:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post("/addblog", async (req, res) => {
    const blog = new Blog(req.query);
    await blog.save();
    res.send(blog);
});

app.get("/blogs", async (req, res) => res.send(await Blog.find()));



app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
