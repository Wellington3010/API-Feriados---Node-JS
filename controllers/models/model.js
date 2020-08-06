const Sequelize = require('sequelize'); 
const sequelize = new Sequelize('postgres','postgres','well3010',{
    host:'localhost',
    dialect:'postgres'
});

     
module.exports = () => {

    var feriado = sequelize.define('feriado',{
        DATA: {
            type:Sequelize.STRING,
            field:'DATA'
        },
        CODIGO_IBGE:{
            type:Sequelize.STRING,
            field:'CODIGO_IBGE'
        },
        name:{
            type:Sequelize.STRING,
            field:'name'
        }},
        {
            freezeTableName:true
        });
        
        feriado.sync({force:false});

        return feriado;
}

    


   

    
    
  


