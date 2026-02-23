const sessions = {};

exports.createSession = (user) => {
  const token = Math.random().toString(36).substring(2);
  sessions[token] = user;
  return token;
};

exports.getUser = (token) => sessions[token];