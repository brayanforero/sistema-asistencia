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

helper.validStateInverse = (state) => {
  let str = "";

  if (state) str = "Reposo";
  if (!state) str = "Activo";
  return str;
};

module.exports = helper;
