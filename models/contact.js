const phoneNumberRegex = "[0-9]{0,14}$";

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Contact.associate = (models) => {
    Contact.belongsTo(models.User, {
      foreignKey: "userId",
    });

    Contact.hasOne(models.Address, {
      foreignKey: "contactId",
    });
  };

  return Contact;
};
