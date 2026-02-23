exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await require("../services/authService").login(email, password);
    res.json(data);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};