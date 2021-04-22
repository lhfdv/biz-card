const { nameValidation, nicknameValidation, passwordValidation, emailValidation } = require('./fields.validation');

const validateSignup = (name, nickname, email, password, image) => {
  const errorsObj = {};

  const userNameErrors = nameValidation(name);
  if (userNameErrors.length > 0) {
    errorsObj.userNameErrors = userNameErrors;
  }

  const userNicknameErrors = nicknameValidation(nickname);
  if (userNicknameErrors.length > 0) {
    errorsObj.userNicknameErrors = userNicknameErrors;
  }

  const userEmailErrors = emailValidation(email);
  if (userEmailErrors.length > 0) {
    errorsObj.userEmailErrors = userEmailErrors;
  }

  const userPasswordErrors = passwordValidation(password);
  if (userPasswordErrors.length > 0) {
    errorsObj.userPasswordErrors = userPasswordErrors;
  }

  return errorsObj;
}

module.exports = {
  validateSignup,
};
