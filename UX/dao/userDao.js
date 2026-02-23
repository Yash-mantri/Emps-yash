const db = require("../config/db");

exports.findByEmail = (email) =>
  db.query("SELECT * FROM users WHERE email=?", [email]);

exports.findById = (id) =>
  db.query("SELECT * FROM users WHERE id=?", [id]);

exports.getAllEmployees = () =>
  db.query("SELECT * FROM users WHERE role='user'");

exports.getEmployeeByEmail = (email) =>
  db.query("SELECT * FROM users WHERE email=? AND role='user'", [email]);

exports.deleteEmployee = (id) =>
  db.query("DELETE FROM users WHERE id=?", [id]);

exports.updateUser = (id, phone, address) =>
  db.query("UPDATE users SET phone=?, address=? WHERE id=?", [phone, address, id]);