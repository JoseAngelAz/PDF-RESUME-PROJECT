//puerto
process.env.PORT = process.env.PORT || 5555;
//Entorno(desarrollo)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de Datos
let urlDB = 'mongodb://localhost:27017/resumetest';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/resumetest';
}else{
    urlDB = 'Escribe aqui la conección a Atlas y otro tipo de modo de conección'
};

process.env.URLDB=urlDB;

//vencimiento del token
process.env.CADUCIDAD_TOKEN = '48h';

//seed de autenticación
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo';