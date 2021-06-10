const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
   name: {
       type: String,
       required: true,
   },
   parent: {
       type: Schema.Types.Mixed,
       default: null,
   }
});

module.exports = mongoose.model('category', categorySchema);