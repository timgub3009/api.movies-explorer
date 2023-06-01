const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const handelErrors = require('./errors/handelErrors');

const { DATABASE, PORT } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet());
app.use(cors);
app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handelErrors);

app.listen(PORT);

mongoose.connect(DATABASE);
