const validate = require("mongoose-validator");
const validator = {};

validator.isEmail = [
  validate({
    validator: "isEmail",
    message: "لطفا آدرس ایمیل را به صورت صحیح وارد نمایید",
  })
];

validator.isLength = [
  validate({
    validator: "isLength",
    arguments: [3, 30],
    message: "طول لغت باید بین 3 تا 30 حرف باشد",
  }),
];


 
validator.isPasswordOk = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'طول لغت باید بین 3 تا 50 حرف باشد',
    }),
    validate({
      validator: 'isAlphanumeric',
      message: 'رمز عبور باید شامل حداقل یک حرف و حداقل یه عدد باشد',
    }),
]
module.exports = validator;
