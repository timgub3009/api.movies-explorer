const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { register, logIn, logOut } = require('../controllers/users');
const { userValidation, loginValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.post('/signup', userValidation, register);
router.post('/signin', loginValidation, logIn);
router.post('/signout', logOut);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
