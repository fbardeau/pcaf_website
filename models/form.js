mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var formSchema = new Schema({
    first_name  : {type: String, required: true},
    last_name   : {type: String, required: true},
    email       : {type: String, required: true, unique: true},
    country     : {type: String, required: true},
    subscribe   : {type: Boolean, default: false},
    donate      : {type: Boolean, default: false},
    created_at  : Date
});

formSchema.pre('save', function(next){
  if ( !this.created_at ) {
    this.created_at = new Date();
  }
  next();
});

module.exports = mongoose.model('Form', formSchema);