exports.viewAll = async (req, res) => {
  const data = await require("../services/userService").viewAllEmployees();
  res.json(data);
};

exports.viewByEmail = async (req, res) => {
  const data = await require("../services/userService").getEmployeeDetails(req.params.email);
  res.json(data);
};

exports.deleteEmp = async (req, res) => {
  await require("../services/userService").deleteEmployee(req.params.id);
  res.json({ message: "Deleted" });
};

exports.viewMe = async (req, res) => {
  const data = await require("../services/userService").viewOwnDetails(req.user.id);
  res.json(data);
};

exports.updateMe = async (req, res) => {
  const { phone, address } = req.body;
  await require("../services/userService").updateOwn(req.user.id, phone, address);
  res.json({ message: "Updated" });
};