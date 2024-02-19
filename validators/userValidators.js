const {check, validationResult} = require('express-validator');

const validateCreateUser = [
  check('email')
    .trim()
    .normalizeEmail() 
    .isEmail()
    .withMessage('Invalid email address!')
    .not()
    .isEmpty()
    .withMessage('Empty  email address!'),
  check('userName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name can not be empty!')
    .isLength({min: 6})
    .withMessage('Minimum 6 characters required!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

module.exports = {
  //validateLoginUser,
  validateCreateUser
}