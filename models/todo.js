var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  description: String,
  // priority: Number
  priority: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
