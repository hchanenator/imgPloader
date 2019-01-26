const express = require('express');
config = require('./config/configure');
var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', `${__dirname}/views`);
app = config(app);


// app.get('/', (req, res) => {
//   res.send('Hello world!');
// });

// app.use('/get_data', (req, res) => {
//   console.log('Hello world!');
//   return next();
// }, (err, req, res, next) => {
//   console.log('Hello world, again!');
//   return next();
// });

app.listen(app.get('port'), () => {
  console.log(`Server up: http://localhost:${app.get('port')}`);
});
