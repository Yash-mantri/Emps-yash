const bcrypt = require("bcryptjs");
const userDao = require("../dao/userDao");
const { createSession } = require("../utils/sessionStore");

exports.login = async (email, password) => {
  const [rows] = await userDao.findByEmail(email);
  const user = rows[0];
  console.log("Input password:", password);
  console.log("Stored hash:", user.password);
  // if(bcrypt.compare(password,user.password)){
  //   console.log("True")
  // }else console.log("False");

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);

  // if (match) {
  //   console.log("True");
  // } else {
  //   console.log("False");
  // }

  if (match) throw new Error("Invalid credentials");

  const token = createSession({ id: user.id, role: user.role, email: user.email });
  return { token, role: user.role };
};