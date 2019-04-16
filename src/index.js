const express = require('express');
const path = require('path');

const app = express();

const root = path.resolve(__dirname, '../');

app.set('views', path.resolve(root, 'src/views')); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine


app.use(express.static(path.resolve(root, 'public')));

app.get('/ping', (req, res) => {
  return res.send('pong');
});

app.get('/', (req, res) => {
  res.render('index.ejs', {page: 'home'});
});

app.get('/about.html', (req, res) => {
  res.render('index.ejs', {page: 'about'});
});

const port = 8888;

app.listen(port, () => {
  console.info(
    `You can now view your website in the browser. \n\n http://localhost:${
      port
      } \n`
  );
});
