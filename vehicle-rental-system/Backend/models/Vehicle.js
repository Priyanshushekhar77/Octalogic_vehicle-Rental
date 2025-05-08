module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vehicleTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });
    
    Vehicle.associate = (models) => {
      Vehicle.belongsTo(models.VehicleType, {
        foreignKey: 'vehicleTypeId',
        as: 'vehicleType'
      });
      Vehicle.hasMany(models.Booking, {
        foreignKey: 'vehicleId',
        as: 'bookings'
      });
    };
    
    return Vehicle;
  };