import photoloader from "./photoloader.js";
let server_url; //https://webetu.iutnc.univ-lorraine.fr/


let initialisation = function (url) {
    server_url = url;
    photoloader.initialisation(server_url);

};


let chargement  = function (uri) {




    let pr = photoloader.chargement(uri);
    $('#imginfo').click(function () {



        if($('#info_container').css('display')==='none'){
            $('#info_container').css('display', 'block');
        } else {
            $('#info_container').css('display', 'none');
        }

    });



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
                    $('#info_container').css('display', 'none');

                    $('#lightbox_full_img').remove("img");
                    $('#lightbox_title').remove('h1');

                    let i = $('<img id="lightbox_full_img" src="' + href + '" alt="">');
                    let t = $('<h1 id="lightbox_title">'+photo.photo.titre+'</h1>');


                    $('#lightbox_container').css('display', 'block');



                    $('#info_container').remove();
                    const desc = $('<div class="info_container" id="info_container">Titre de la photo : ' + photo.photo.titre +
                        '<br>Dossier de l\'image : ' + photo.photo.file
                        + '</div>');
                    $('#infoButton').append(desc);





                    $('#lightbox-img').append(i);
                    $('#lightbox-head').append(t);

                    $('#lightbox_close').click(function () {
                        $('#lightbox_container').css('display', 'none');
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