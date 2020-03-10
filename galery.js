import photoloader from "./photoloader.js";
let server_url; //https://webetu.iutnc.univ-lorraine.fr/


let initialisation = function (url) {
    server_url = url;
    photoloader.initialisation(server_url);
};

let chargement  = function (uri) {
    let pr = photoloader.chargement(uri);
        pr.then(function (reponse) {
            $('#photobox-gallery').empty();
            reponse.data.photos.forEach(function (photo) {
                console.log(photo);
                console.log(photo.photo.original.href);
                console.log(server_url+photo.photo.original.href);

                // console.log(photo.photo.thumbnail.href);


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
                    $('#lightbox_full_img').remove("img");
                    $('#lightbox_title').remove('h1');

                    let i = $('<img id="lightbox_full_img" src="' + href + '" alt="">');
                    let t = $('<h1 id="lightbox_title">'+photo.photo.titre+'</h1>');


                    $('#lightbox_container').css('display', 'block');

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