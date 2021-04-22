const nameValidation = (nameField) => {
  const errors = [];

  if (typeof nameField !== 'string') {
    errors.push('Nome precisa ser um texto');
    return errors;
  }
  
  if (nameField.trim().length === 0) {
    errors.push('Campo não pode ser vazio');
  }

  if (nameField.trim().length < 3) {
    errors.push('Mínimo de 3 caracteres');
  }

  if (nameField.trim().length > 50) {
    errors.push('Máximo de 50 caracteres');
  }

  if (nameField.replace(/[A-Za-z ]/g, '').length !== 0) { // para verificar se no nome contém caracteres que não são letras
    errors.push('Somente letras são aceitas');
  }

  return errors;
};

const nicknameValidation = (nicknameField) => {
  const errors = [];

  if (typeof nicknameField !== 'string') {
    errors.push('Nome precisa ser um texto');
    return errors;
  }
  
  if (nicknameField.trim().length === 0) {
    errors.push('Campo não pode ser vazio');
  }

  if (nicknameField.trim().length < 3) {
    errors.push('Mínimo de 3 caracteres');
  }

  if (nicknameField.trim().length > 50) {
    errors.push('Máximo de 50 caracteres');
  }

  return errors;
};

const passwordValidation = (passwordField) => {
  const errors = [];

  if (typeof passwordField !== 'string') {
    errors.push('Senha precisa ser um texto');
    return errors;
  }
  
  if (passwordField.trim().length === 0) {
    errors.push('Campo não pode ser vazio');
  }

  if (passwordField.trim().length < 6) {
    errors.push('Mínimo de 6 caracteres');
  }

  if (passwordField.trim().length > 50) {
    errors.push('Máximo de 50 caracteres');
  }

  if (passwordField.replace(/[0-9]/g, '').length === passwordField.length || passwordField.replace(/[A-Z]/g, '').length === passwordField.length) {
    errors.push('Sua senha precisa ter pelo menos um número e uma letra maiúscula');
  }

  return errors;
};

const imageValidation = (imageField) => {
  const errors = [];
  const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  if (typeof imageField !== 'file') {
    errors.push('Necessário um arquivo');
    return errors;
  }

  if (imageField.length === 0) {
    errors.push('Campo não pode ser vazio');
  }
  
  if (!urlRegex.test(imageField)) {
    errors.push('Formato inválido');
  }

  return errors;
};

const emailValidation = (emailField) => {
  const errors = [];
  const emailRegex = /\S+@\S+\.\S+/;

  if (typeof emailField !== 'string') {
    errors.push('Data precisa ser um texto');
    return errors;
  }

  if (emailField.trim().length === 0) {
    errors.push('Campo não pode ser vazio');
  }
  
  if (!emailRegex.test(emailField)) {
    errors.push('Formato inválido');
  }

  return errors;
};

module.exports = {
  nameValidation,
  nicknameValidation,
  passwordValidation,
  imageValidation,
  emailValidation,
};