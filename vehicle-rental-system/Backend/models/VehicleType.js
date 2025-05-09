module.exports = (sequelize, DataTypes) => {
    const VehicleType = sequelize.define('VehicleType', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      wheelCount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
//       createdAt: {
//   type: DataTypes.DATE,
//   allowNull: false,
//   defaultValue: Sequelize.NOW,
// },
// updatedAt: {
//   type: DataTypes.DATE,
//   allowNull: false,
//   defaultValue: Sequelize.NOW,
// },
    });
    
    VehicleType.associate = (models) => {
      VehicleType.hasMany(models.Vehicle, {
        foreignKey: 'vehicleTypeId',
        as: 'vehicles'
      });
    };
    
    return VehicleType;
  };