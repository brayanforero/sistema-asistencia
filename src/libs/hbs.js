const helper = {};
helper.toUpper = (str) => {
  return str.toUpperCase();
};

helper.validState = (state) => {
  let str = "";

  if (state) str = "Activo";
  if (!state) str = "Reposo";
  return str;
};

module.exports = helper;
