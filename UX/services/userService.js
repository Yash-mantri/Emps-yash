const userDao = require("../dao/userDao");

exports.viewAllEmployees = async () => {
  const [rows] = await userDao.getAllEmployees();
  return rows;
};

exports.getEmployeeDetails = async (email) => {
  const [rows] = await userDao.getEmployeeByEmail(email);
  return rows[0];
};

exports.deleteEmployee = async (id) => {
  await userDao.deleteEmployee(id);
};

exports.viewOwnDetails = async (id) => {
  const [rows] = await userDao.findById(id);
  return rows[0];
};

exports.updateOwn = async (id, phone, address) => {
  await userDao.updateUser(id, phone, address);
};