import jwt from 'jsonwebtoken';
import User from '../Schema/User-schema.js';
import post from '../Schema/Post-schema.js';


const signup = async (req, res) => {
    const { name, email, password, confirm_password, terms } = req.body;

    try {
        // Check if any required field is empty
        if (!name || !email || !password || !confirm_password || !terms) {
            throw new Error('All fields are required');
        }

        // Check if password is at least 8 characters long
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }

        // Validate password match
        if (password !== confirm_password) {
            throw new Error('Passwords and confirm_password do not match');
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password,
            terms
        });

        // If user is created, generate a token and send user info
        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            return res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token
            });
        }
    } catch (err) {
        // console.error('User signup error:', error);
        // return res.status(500).json({ message: 'Signup error', error: error.message });
        console.error(err.message); // Log error for debugging
        res.status(err.status || 400).json({ message: err.message });
    }
};

const getpost = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Get page query parameter, default to 0 if not provided
    const limit = parseInt(req.query.limit) || 50; // Get limit query parameter, default to 50 if not provided

    try {
        // Fetch paginated posts from the database
        // const postlength = (await post.find()).length
        // console.log(postlength)
        const paginatedPosts = await post.find().skip(page * limit).limit(limit);

        res.json(paginatedPosts);
    } catch (err) {
        console.error(err.message); // Log error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
}



export { signup, getpost };

