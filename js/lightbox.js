


function showAndHide(photo, href){


    $('#lightbox_full_img').remove("img");
    $('#lightbox_title').remove('h1');

    $('#lightbox_container').css('display', 'block');

    let i = $('<img id="lightbox_full_img" src="' + href + '" alt="">');
    let t = $('<h1 id="lightbox_title">'+photo.photo.titre+'</h1>');

    $('#lightbox-img').append(i);
    $('#lightbox-head').append(t);

    $('#lightbox_close').click(function () {
        $('#lightbox_container').css('display', 'none');
    });


}


export default {
    showAndHide : showAndHide
}