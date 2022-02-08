const passwordRegex =
  "^(?=.{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?W).*$";

// const passwordRegex =
//   "/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$^+=!*()@%&]).{8,}$/";

const userNameRegex = "^[a-zA-Z0-9_.-]*$";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM({ values: ["user", "admin"] }),
      defaultValue: "user",
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Contact, {
      foreignKey: "userId",
    });
  };

  return User;
};
