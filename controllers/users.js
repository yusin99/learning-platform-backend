const getAllUsers = async (req, res) => {
  res.send("All users");
};
const getUser = async (req, res) => {
  res.send("One user");
};
const createUser = async (req, res) => {
  res.send("Create user");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

const deleteUser = async (req, res) => {
  res.send("Delete user");
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
