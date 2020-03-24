import photoloader from "./photoloader.js";
import lightbox from "./lightbox.js";
let server_url; //https://webetu.iutnc.univ-lorraine.fr/


let initialisation = function (url) {
    server_url = url;
    photoloader.initialisation(server_url);

};


function showAndHideInfoBox() {
    $('#imginfo').click(function () {
        let box = $('#info_container');
       if(box.css('display')==='none'){
            box.css('display', 'block');
        } else {
            box.css('display', 'none');
        }

    });
}

let chargement  = function (uri) {




    let pr = photoloader.chargement(uri);
            showAndHideInfoBox();



        pr.then(function (reponse) {

           $('#photobox-gallery').empty();


            $('#next').off('click');
            $('#previous').off('click');

            $('#next').click(function () {
                chargement(reponse.data.links.next.href);
            });
            $('#previous').click(function () {
                chargement(reponse.data.links.prev.href);
            });


            reponse.data.photos.forEach(function (photo) {
                console.log(photo);
                console.log(photo.photo.original.href);
                console.log(server_url+photo.photo.original.href);






                let href = server_url+photo.photo.original.href;
                let link = server_url+photo.links.self;
                let thumbnail = server_url+photo.photo.thumbnail.href;

                let vi = $('<div class="vignette">\n' +
                    '            <img\n' +
                    '                    data-img='+href+'\n' +
                    '                    data-uri='+link+'\n' +
                    '                    src='+thumbnail+'>\n' +
                    '            <div class="container">'+photo.photo.titre+'</div>\n' +
                    '\n' +
                    '        </div>');





                vi.click( function () {


                    lightbox.showAndHide(photo, href);

                    let pr = axios.get(server_url+photo.links.self.href, {withCredentials:true});
                    pr.catch(function () {
                        console.log('echec');
                    });

                    pr.then(function (reponse) {
                        console.log(reponse.data.photo);
                        console.log(reponse.data.links);
                        $('#info_container').remove();
                        const desc = $('<div class="info_container" id="info_container"><div>Titre de la photo : ' + reponse.data.photo.titre +
                            '</div><br><div>Dossier de l\'image : ' + reponse.data.photo.file +
                            '</div><br><div>Description : ' + reponse.data.photo.descr
                            + '</div></div>');
                        $('#infoButton').append(desc);



                        let pr2 = axios.get(server_url+reponse.data.links.comments.href, {withCredentials:true});
                        pr2.catch(function () {
                            console.log('échec');
                        });
                        pr2.then(function (rep) {
                            $('#commentaires').empty();
                            rep.data.comments.forEach(function (com) {



                                let v = $('<div class="commentaires_container">\n' +
                                    '                    <h1>Titre :'+ com.id + '</h1>'  +
                                    '                    <h2>Pseudo : '+ com.titre + '</h2>'  +
                                    '                    <div>Contenu : ' + com.content +
                                    '                    </div>' +
                                    '                    <div>Date : ' + com.date +
                                    '                    </div>' +
                                    '                </div> <hr>');

                                $('#commentaires').append(v);
                            })
                        })

                    });
                });

                $('#photobox-gallery').append(vi);

            });




        });
};


export default {
    initialisation : initialisation,
    chargement : chargement
}