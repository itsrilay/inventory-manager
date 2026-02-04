import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import session from 'express-session';
import productsRouter from './routes/productsRouter';
import categoriesRouter from './routes/categoriesRouter';
import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';

const app = express();

// Views
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'demo',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// app.use((req: Request, res: Response, next: NextFunction) => {
//   // res.locals.messages = req.flash(); // req.flash() is not easily typed with express-session, leaving for now
//   next();
// });

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/api/v1', apiRouter); // New API Router
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// Error handlers
app.all(/.*/, (req: Request, res: Response) => {
  res.status(404).render('404', { layout: false });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render('500', { layout: false, error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));