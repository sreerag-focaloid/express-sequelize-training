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
      validate: {
        is: {
          args: userNameRegex,
          msg: "The Username must contain only A-Z. a-z, numbers and underscores",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length",
        },
        isEmail: {
          msg: "Email address must be valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: passwordRegex,
          msg: "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character and have a length of at least of 6",
        },
      },
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
