const model = require("../models/model")

function  consultarFeriado(req,model)
{

    return new Promise((resolve,reject) => {

        model.findOne({
            attributes:['name'],  
            where:{
                  CODIGO_IBGE:req.params.id,
                  DATA:req.params.date
                }}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
    });

};


function  consultarFeriadoMovel(req,model)
{

    return new Promise((resolve,reject) => {

        model.findOne({
            attributes:['name'],  
            where:{
                  CODIGO_IBGE:req.params.id,
                  name:req.params.date
                }}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
    });

};

function  consultarFeriadoPorData(req,model)
{

    return new Promise((resolve,reject) => {

        model.findOne({
            attributes:['name','CODIGO_IBGE','DATA'],  
            where:{
                  DATA:req.params.date,
                }}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
    });

};

function  consultarFeriadoNacional(req,model)
{

    return new Promise((resolve,reject) => {

        model.findOne({
            attributes:['name'],  
            where:{
                  DATA:req.params.date,
                }}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
    });

};




function cadastrarFeriado(req,model)
{


            return new Promise((resolve,reject) => {

                model.create({
                    DATA: req.params.date,
                    CODIGO_IBGE:req.params.id,
                    name:req.body.name
                 }).then(data =>{
                     resolve(data);
                 }).catch(err => {
                     reject(err);
                 });
        
            });    
        

};


function cadastrarFeriadoMovel(req,model)
{


            return new Promise((resolve,reject) => {

                model.create({
                    DATA: null,
                    CODIGO_IBGE:req.params.id,
                    name:req.params.date
                 }).then(data =>{
                     resolve(data);
                 }).catch(err => {
                     reject(err);
                 });
        
            });    
        

};

function cadastrarFeriadoNacional(req,model)
{


            return new Promise((resolve,reject) => {

                model.create({
                    DATA: req.params.date,
                    CODIGO_IBGE:null,
                    name:req.body.name
                 }).then(data =>{
                     resolve(data);
                 }).catch(err => {
                     reject(err);
                 });
        
            });    
        

};


function atualizarFeriado(req,model)
{


    return new Promise((resolve,reject) => {


                model.update({
                    name: req.body.name,
                  }, {
                    where: {
                      CODIGO_IBGE:req.params.id,
                      DATA:req.params.date
                    }
                  }).then(res => {
                      resolve(res);
                  }).catch(err => {
                      reject(err);
                  });

    });    


};


function atualizarFeriadoNacional(req,model)
{


    return new Promise((resolve,reject) => {


                model.update({
                    name: req.body.name,
                  }, {
                    where: {
                      DATA:req.params.date
                    }
                  }).then(res => {
                      resolve(res);
                  }).catch(err => {
                      reject(err);
                  });

    });    


};



function atualizarFeriadoMovel(req,model)
{


    return new Promise((resolve,reject) => {


                model.update({
                    name: req.params.date,
                  }, {
                    where: {
                      CODIGO_IBGE:req.params.id,
                      DATA:null,
                      name:req.params.date
                    }
                  }).then(res => {
                      resolve(res);
                  }).catch(err => {
                      reject(err);
                  });

    });    


};


function deletarFeriado(req,model)
{
    return new Promise((resolve,reject) => {


        model.destroy({
            where:{
                CODIGO_IBGE:req.params.id,
                DATA:req.params.date
            }
        }).then(res => {
              resolve(res);
          }).catch(err => {
              reject(err);
          });

    }); 

}

function deletarFeriadoMovel(req,model)
{
    return new Promise((resolve,reject) => {


        model.destroy({
            where:{
                CODIGO_IBGE:req.params.id,
                DATA:null,
                name:req.params.date
            }
        }).then(res => {
              resolve(res);
          }).catch(err => {
              reject(err);
          });

    }); 

}



module.exports = {consultarFeriado,consultarFeriadoMovel,cadastrarFeriado,cadastrarFeriadoMovel,atualizarFeriado,atualizarFeriadoMovel,deletarFeriado,deletarFeriadoMovel,consultarFeriadoPorData,consultarFeriadoNacional,cadastrarFeriadoNacional,atualizarFeriadoNacional};