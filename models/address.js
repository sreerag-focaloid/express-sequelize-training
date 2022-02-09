module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: "Address line 1  must be between 2 and 100 numbers in length",
        },
      },
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.ENUM({ values: ["IN", "US", "CA"] }),
      allowNull: false,
    },
  });

  Address.associate = (models) => {
    Address.belongsTo(models.Contact, {
      foreignKey: "contactId",
    });
  };

  return Address;
};
