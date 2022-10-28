import express from 'express';
import fs from 'fs';
import cors from 'cors';
import multer from 'multer';
import data from './data.js';
import { getAll, getOne, create, update, remove } from './ProductControllers.js';

export const urlApi = 'http://localhost:5000';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/static', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get('/api/cities', (req, res) => {
  res.send(data.cities);
});

app.post('/upload', upload.array('images', 10), (req, res) => {
  const imagesArray = Array.from(req.files).map((file) => `${urlApi}/static/${file.filename}`);

  res.json({
    urls: imagesArray,
  });
});

app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.post('/api/products', create);
app.patch('/api/products/:id', update);
app.delete('/api/products/:id', remove);

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`server at ${urlApi}`);
});
