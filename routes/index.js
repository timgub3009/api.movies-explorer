const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { register, logIn, logOut } = require('../controllers/users');
const { userValidation, loginValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const { NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

router.post('/signup', userValidation, register);
router.post('/signin', loginValidation, logIn);
router.post('/signout', auth, logOut);
router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
});

module.exports = router;
