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
helper.validAssists = (state) => {
  let str = "";
  if (state) str = "Si";
  if (!state) str = "No";
  return str;
};

helper.isActive = (state) => {
  let str = "";
  if (state) str = "Si";
  if (!state) str = "No";
  return str;
};

helper.isNotHabilited = (state) => {
  if (!state) return true;
  return false;
};
helper.valid_end = (time) => {
  if (time == "12:00 AM") return "Por salir";

  return time;
};

module.exports = helper;
