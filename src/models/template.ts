import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  'level-1': {
    type: Number,
    required: true,
  },
  'level-2': {
    type: Number,
    required: true,
  },
  'level-3': {
    type: Number,
    required: true,
  },
  'level-4': {
    type: Number,
    required: true,
  },
  'level-5': {
    type: Number,
    required: true,
  },
  'level-6': {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Template = mongoose.models.templates||mongoose.model('templates', templateSchema);

export default Template
