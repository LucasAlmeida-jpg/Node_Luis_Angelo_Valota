import Sequelize from 'sequelize';
import sequelize from "./db.js";

//Exemplo de Modelo
const User = sequelize.define('usuario', {
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    admin: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0
    },
  });  
  
  sequelize.sync(true);

  export default User