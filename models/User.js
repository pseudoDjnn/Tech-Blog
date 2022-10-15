const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bycrypt");
const sequelize = require("../config/connection");

class User extends Model {
  passwordCheck(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    hooks: {
      // setup beforecheck lifecycle "hook" function
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updateUserData) {
        updateUserData.password = await bcrypt.hash(
          updateUserData.password,
          10
        );
        return updateUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "user",
  }
);

module.exports = User;
