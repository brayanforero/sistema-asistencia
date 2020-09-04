const bcrypt = require("bcrypt");
const helpers = {};

helpers.encryptPass = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(`Error al encriptar ${error}`);
    return false;
  }
};

helpers.matchPassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(`Error al comparar las contraseñas ${error}`);
    return false;
  }
};

module.exports = helpers;
