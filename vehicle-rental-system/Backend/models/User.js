module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    
    User.associate = (models) => {
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        as: 'bookings'
      });
    };
    
    return User;
  };
  