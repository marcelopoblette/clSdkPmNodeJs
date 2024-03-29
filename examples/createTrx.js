//DOTENV es una librería que nos ayudar a cargar variables de entorno desde un archivo .env
require('dotenv').config();
//Inicializamos las librerías de Pago Fácil necesarias. El API y la firma.

const ApiPagoFacil = require('@pagofacil/api_pago_facil');
const Signature = require('@pagofacil/sdk-apis-javascript-signature');

//Llamamos al objeto que maneja las apis de Transacción.
const trx = new ApiPagoFacil.TrxsApi();

//Por seguridad estas variables están en el archivo .env . Puedes copiar el .env.example y ponerlo con tus datos
const tokenService = process.env.TOKEN_SERVICE;
const tokenSecret = process.env.TOKEN_SECRET;

//el uuid no es necesario pero es cómodo para generar string unicos para el id de la transacción y para la sesión.
const uuid = require("uuid/v4");

let postBodyTrx = {
    x_account_id: tokenService,
    x_amount: 1000000,
    x_currency: "CLP",
    x_reference: uuid(),
    x_customer_email: "correo@correo.cl",
    x_url_complete: "https://kr34t1v1ty.cl/store/complete",
    x_url_cancel: "https://kr34t1v1ty.cl/store/cancel/",
    x_url_callback: "https://kr34t1v1ty.cl/store/callback/",
    x_shop_country: "CL",
    x_session_id: uuid(),
}

//Firmamos el contenido a enviar con el secreto del servicio
const x_signature = Signature.signPayload(postBodyTrx, tokenSecret);
//Asociamos el contenido firmado a la variable firma que enviaremos en el body.
postBodyTrx.x_signature = x_signature;
var optsTrx = {
    'inlineObject': postBodyTrx
}


//Generamos una nueva transacción y vemos el resultado
trx.trxsPost(optsTrx, (error, data, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ', response.body.data);
    }
});