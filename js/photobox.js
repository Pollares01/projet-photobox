import galery from "./galery.js";


$('document').ready(function () {

    // console.log("avant");
    // photoloader.initialisation("https://webetu.iutnc.univ-lorraine.fr");
    // console.log("pendant");
    // photoloader.chargement("/www/canals5/photobox/photos/?offset=8&size=12");
    // console.log('apres');
    // $('#load_gallery').click(function () {
    //     let pr = photoloader.chargement("/www/canals5/photobox/photos/?offset=8&size=12");
    //     pr.then(function (reponse) {
    //         $('#photobox-gallery').empty();
    //         reponse.data.photos.forEach(function (photo) {
    //             console.log(photo);
    //             console.log(photo.photo.original.href);
    //             console.log(photo.photo.thumbnail.href);
    //
    //             let href = photo.photo.original.href;
    //
    //             let vi = $('<div class="vignette">\n' +
    //                 '            <img\n' +
    //                 '                    data-img='+photo.photo.original.href+'\n' +
    //                 '                    data-uri='+photo.links.self+'\n' +
    //                 '                    src='+photo.photo.thumbnail.href+'>\n' +
    //                 '            <div>'+photo.photo.titre+'</div>\n' +
    //                 '\n' +
    //                 '        </div>');
    //
    //             $('#photobox-gallery').append(vi);
    //
    //
    //         });
    //     });
    // });


    $('#load_gallery').click(function (event) {
        event.preventDefault();
        console.log("avant");
        galery.initialisation("https://webetu.iutnc.univ-lorraine.fr");
        // galery.initialisation("https://www.paulkelbert.fr");
        console.log("pendant");
        galery.chargement("/www/canals5/photobox/photos/?offset=8&size=12");
        console.log('apres');
    });



});