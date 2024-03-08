import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  owner: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    }
  }
});

const post = mongoose.model('posts', postSchema);

export default post;
