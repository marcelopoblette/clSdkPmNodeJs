//DOTENV es una librería que nos ayudar a cargar variables de entorno desde un archivo .env
require('dotenv').config();
const ApiPagoFacil = require('@pagofacil/api_pago_facil');
//Obtenemos el usuario y la clave desde el archivo .env
const username = process.env.PF_USERNAME;
const password = process.env.PF_PASSWORD;

const loginBody = new ApiPagoFacil.LoginBody(username, password);
// console.log(username,password,loginBody);

const api = new ApiPagoFacil.AuthApi()
var opts = {
    'loginBody': loginBody
};
var callback = function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ');
        const loginResponse = data;
        const dataLoginResponse = loginResponse.data;
        const access_token_jwt = dataLoginResponse.access_token_jwt;

        console.log("LOGIN RESPONSE", loginResponse.message, dataLoginResponse, access_token_jwt);
    }
};
api.usersLoginPost(opts, callback);