const model = require('./models/model');
const feriado = model();
const service = require('./services/feriadoService');
const validar = require('./validacao/validarService');


module.exports = app => {    

    app.all('/feriados/:id/:date',(req,res,id) => {
       

    if(req.method == 'GET')
    {

        if(!validar.isCodigoValido(req.params.id)){
            res.status(400).send("Código IBGE inválido");
            return;
        }

        var isFeriadoMovel = false;
        if(!parseInt(req.params.date.substring(0,2)))
        {
            isFeriadoMovel = true;
        }

        if(isFeriadoMovel)
        {

           

            service.consultarFeriadoMovel(req,feriado).then(data => {
            
                if(data != null)
                {
                    res.json({name:data.name});
                }
                else
                {
                    res.status(404).send('Not Found');
                }
            }).catch(err => {
                res.status(404).send(err);
            });
        }
        else
        {
            
             if(!validar.validarData(req.params.date))
             {
                 res.status(400).send("Data inválida");
                 return;
             }
          

             service.consultarFeriadoPorData(req,feriado).then(data => {


                if(data != null && data.CODIGO_IBGE == null){
                    res.status(200).send(data.name);
                    
                }
                else if(data != null && validar.isCodigoEstadual(data.CODIGO_IBGE) && validar.isCodigoMunicipal(req.params.id)){
                    
                    if(validar.codigoMunicipalPertenceAoEstado(data.CODIGO_IBGE,req.params.id)){

                        res.json({name:data.name});
                    }
                }
                else if(data != null && data.CODIGO_IBGE == req.params.id)
                {
                    res.json({name:data.name});

                }
                else if(data != null && data.CODIGO_IBGE != req.params.id){
                    res.status(404).send("Not Found");
                }
                else{
                    res.status(404).send("Not Found");
                }

             }).catch(err => {
                 res.status(500).send(err); 
             });
            
        }



    }
    else if(req.method == 'PUT')
    {
        if(!validar.isCodigoValido(req.params.id)){
            res.status(400).send("Código IBGE inválido");
            return;
        }

        var isFeriadoMovel = false;
        if(!parseInt(req.params.date.substring(0,2)))
        {
            isFeriadoMovel = true;
        }
        

        if(isFeriadoMovel){

            service.consultarFeriadoMovel(req,feriado).then(data => {
            
                if(data != null)
                {
                    service.atualizarFeriadoMovel(req,feriado).then(data => {
    
                        res.status(200).send("REGISTRO ATUALIZADO COM SUCESSO");
            
                    }).catch(err => {
                        res.status(404).send(err);
                    });
                }
                else
                {
                    service.cadastrarFeriadoMovel(req,feriado).then(data => {
    
                        res.status(201).send("REGISTRO CRIADO COM SUCESSO");
            
                    }).catch(err => {
                        res.status(404).send(err);
                    });
                }
            }).catch(err => {
                res.status(404).send(err);
            });


        }
        else
        {
            if(req.body.name === undefined)
            {
                res.status(400).send("Necessário enviar o corpo da requisição no formato JSON informando um valor para o atributo name.");
                return;
            }

                //Validando o formato da data
                if(!validar.dataSemAno(req.params.date))
                {
                    res.status(400).send("A data na url deve conter apenas o dia e o mês");
                    return;
           
                }
                else
                {       
                    let Year = new Date().getFullYear().toString().concat('-');
                    req.params.date = Year.concat(req.params.date);
                }

                //Validando a data
                 if(!validar.validarData(req.params.date))
                {
                    res.status(400).send("Data inválida");
                    return;
                }



                service.consultarFeriado(req,feriado).then(data => {

                    if(data != null)
                    {
                        service.atualizarFeriado(req,feriado).then(data => {
                        
                            res.status(200).send("REGISTRO ATUALIZADO COM SUCESSO");
                        
                        }).catch(err => {
                            res.status(404).send(err);
                        });
                    }
                    else
                    {
                        service.cadastrarFeriado(req,feriado).then(data => {
                        
                            res.status(201).send("REGISTRO CRIADO COM SUCESSO");
                        
                        }).catch(err => {
                            res.status(404).send(err);
                        });
                    }
                }).catch(err => {
                    res.status(404).send(err);
                });

        }

        

    }
    else if(req.method == 'DELETE')
    {

        if(!validar.isCodigoValido(req.params.id)){
            res.status(400).send("Código IBGE inválido");
            return;
        }


        var isFeriadoMovel = false;
        if(!parseInt(req.params.date.substring(0,2)))
        {
            isFeriadoMovel = true;
        }

        if(isFeriadoMovel)
        {
            

                 service.consultarFeriadoMovel(req,feriado).then(data => {

                     if(data != null)
                     {
                         service.deletarFeriadoMovel(req,feriado).then(data => {
                             res.status(204).send("Registro deletado com sucesso")
                         });
                     }
                     else{
                         res.status(404).send('Not Found');
                     }
                 }).catch(err => {
                     res.status(404).send(err);
                 });

        }
        else
        {

           

                //Validando o formato da data
                if(validar.dataSemAno(req.params.date))
                {

                    let Year = new Date().getFullYear().toString().concat('-');
                    req.params.date = Year.concat(req.params.date);
                }
                else
                {
                     res.status(400).send("A data na url deve conter apenas o dia e o mês");
                     return;
                }

        
                 if(!validar.validarData(req.params.date))
                 {
                     res.status(400).send("Data inválida");
                     return;
                 }

                 service.consultarFeriadoPorData(req,feriado).then(data => {


                     if(data != null && data.CODIGO_IBGE == null && validar.isCodigoMunicipal(req.params.id)){
                        
                        res.status(403).send();
                        return;
                     }
                      if(data != null && data.CODIGO_IBGE == null && validar.isCodigoEstadual(req.params.id)){
                        res.status(403).send();
                        return;
                     }
                    
                     if(data != null && data.CODIGO_IBGE != null && validar.isCodigoEstadual(data.CODIGO_IBGE) && validar.isCodigoMunicipal(req.params.id))
                     {
                        res.status(403).send();
                        return;
                     }
                     
                     if(data != null && data.CODIGO_IBGE == req.params.id){

                        service.deletarFeriado(req,feriado).then(data => {
                            res.status(204).send("Registro deletado com sucesso");
                        
                           }).catch(err => {
                               res.status(500).send(err);
                           });
                     }
                     
                     if(data == null){
                         res.status(404).send('Not Found');
                         return;
                     }

                 }).catch(err => {
                     console.log(err);
                 });
        }


        
    }
    else
    {
        res.status(405).send("Method Not Allowed");
    }


        
        
});
}



   
    
    
