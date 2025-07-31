// controllers/deleteUserById.js
const userModel = require('../models/userModel');

const deleteUserById = (req, res) => {
  const { id } = req.params;

  userModel.deleteById(id, (err, result) => {
    if (err) {
      console.error('❌ Error deleting user:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    // Optional: check if a user was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  });
};

module.exports = deleteUserById;
