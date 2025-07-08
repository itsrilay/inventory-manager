const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
