function validarData(dateString){
        
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false; 
    var d = new Date(dateString);
    if(Number.isNaN(d.getTime())) return false; 
    return d.toISOString().slice(0,10) === dateString;
};


function dataSemAno(dateString){
    var regEx = /^\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false; 
    return true;
};

function QtdDigitos(codigo_IBGE){
    
    if(codigo_IBGE.toString().length > 7) return false; 
    return true;
};

function isCodigoEstadual(codigo_IBGE){
    
    if(codigo_IBGE.toString().length == 2) return true; 
    return false;
};


function isCodigoMunicipal(codigo_IBGE){
    
    if(codigo_IBGE.toString().length == 7) return true; 
    return false;
};

function isCodigoValido(codigo_IBGE){

    switch(codigo_IBGE.length){
        case 2:
            return true;
        case 7:
            return true;
        default:
            return false;
    }
};

function codigoMunicipalPertenceAoEstado(codigoEstadual,codigoMunicipal){

    if(codigoEstadual.toString().substring(0,2) == codigoMunicipal.toString().substring(0,2)) return true;
    return false;
}


module.exports = {validarData,dataSemAno,QtdDigitos,isCodigoEstadual,isCodigoMunicipal,isCodigoValido,codigoMunicipalPertenceAoEstado};