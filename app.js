const express = require('express');
const app = express();
const path = require('path');
const productsRouter = require('./routes/productsRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const indexRouter = require('./routes/indexRouter');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// Error handler
app.all(/.*/, (req, res, next) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
