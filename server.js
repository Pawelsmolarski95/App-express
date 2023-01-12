const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  });
const upload = multer({ storage: storage });


app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main_light' }));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({extended: false}));

app.get('/hello/:name', (req, res) => {
    res.render('hello', {name: req.params.name});
});
app.get('/',(req, res) => {
    res.render('index')
});
app.get('/about', (req,res) => {
    res.render('about', {layout: 'main_dark' });
});
app.get('/contact', (req, res) => {
    res.render('contact')
});
app.get('/info', (req, res) => {
    res.render('info')
});
app.get('/history', (req, res) => {
    res.render('history')
});

app.post(
    '/contact/send-message', upload.single('uploaded_file'), (req, res ) => {
    
    const { author, sender, title, message } = req.body;
    
    if(author && sender && title && message && req.file) {
        res.render('contact', {isSent: true, name: req.file.filename});
      }
      else {
        res.render('contact', {isError: true});
      }
      
      console.log(req.file, req.body)
});

app.use((req, res) => {
    res.status(404).send('404 not found...')
})
app.listen(8000, () => {
    console.log('Server is running');
})