const Sequelize = require('sequelize'); 
const sequelize = new Sequelize('d4jf5mebjiie17','gqpdyoylzwshnx','e2f0c33189f83f1683ad3cb83e9c5bf474a40f2e91a093de61a31d09870a11d4',{
    host:'ec2-52-1-95-247.compute-1.amazonaws.com',
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

    


   

    
    
  


