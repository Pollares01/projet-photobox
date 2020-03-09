let server_url; //https://webetu.iutnc.univ-lorraine.fr/


let initialisation = function (url) {
    server_url = url;
};

let chargement = function (uri) {
// /www/canals5/photobox/photos/?offset=8&size=12



    let pr = axios.get(server_url+uri);
    pr.catch(function () {
        console.log('echec');
    });

    return pr;

};

export default {
    initialisation : initialisation,
    chargement : chargement
}