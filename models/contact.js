const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('contacts', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database:", err));

module.exports = Contact;
