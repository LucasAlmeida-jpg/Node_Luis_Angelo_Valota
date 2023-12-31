import Sequelize from 'sequelize';
import sequelize from "./db.js";

//Exemplo de Modelo
const Post = sequelize.define('post', {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    texto: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: true
      },
      curtidas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
  });  
  
  sequelize.sync();

  export default Post