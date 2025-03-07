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
