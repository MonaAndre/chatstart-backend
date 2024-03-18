const {check, validationResult} = require('express-validator');

const validateCreateUser = [
  check('email')
    .escape()
    .trim()
    .normalizeEmail() 
    .isEmail()
    .withMessage('Invalid email address!')
    .not()
    .isEmpty()
    .withMessage('Empty  email address!'),
  check('userName')
    .escape()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name can not be empty!')
    .isLength({min: 2})
    .withMessage('Minimum 2 characters required!'),
  check('password')
    .escape()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .isLength({min: 8})
    .withMessage('Minimum 8 characters required!')
    .matches(/(?=.*\d)/, 'i')
    .withMessage('Minimum 1 number!')
    .matches(/(?=.*[a-z])/, 'i')
    .withMessage('Minimum 1 lowercase !')
    .matches(/(?=.*\W)/, 'i')
    .withMessage("Minimum 1 special symbol")
    .matches(/(?=.*[A-Z])/, 'i')
    .withMessage('Minimum uppercase!'),
    

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

module.exports = {
  validateCreateUser
}