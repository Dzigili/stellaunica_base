
$(document).ready(function () {
    $('.slide-section').click(function (e) {

        var linkHref = $(this).attr('href');

        $('html, body').animate({
            scrollTop :  $(linkHref).offset().top -100
        }, 1000);

        e.preventDefault();
    });
});

$(function () {
   if($(window).width() <= 567 ) {
       $('.slide-section').on('click', function () {
           $('.slide-section').addClass('close');
           if($('.slide-section').hasClass('close')) {
           // console.log('Zatvori meni.');
           var checkBoxes = $('#toggle');
           checkBoxes.prop("checked", !checkBoxes.prop("checked"));
       }
       });

   }
});


// $(document).ready(function () {
//     $('.apartment').click(function () {
//         var img= $(this).attr("src");
//         var appear_image = "<div id='appear_image_div' onClick='closeImage()'></div>";
//         appear_image = appear_image.concat("<img id='appear_image' src='"+img+"'/>");
//         $('body').append(appear_image);
//     });
// });
//
// function closeImage() {
//     $('#appear_image_div').remove();
//     $('#appear_image').remove();
// }



var i = 0;
var _nizObj;

function openModal(niz, description) {
    console.log('openModal', niz);
    _nizObj = JSON.parse(niz);
    console.log('openModal', _nizObj);
    $('#myModal').css('display', 'block');
    $('#modal_img').attr('src', _nizObj[i]);
    $('#textMessige').html(description);

    document.body.style.overflow = "hidden";

}


function closeModal() {
    document.getElementById('myModal').style.display = "none";
    document.body.style.overflow = "auto";
}

function goLeft() {
    if (i === 0) {
        i = _nizObj.length-1;
    }
    else {
        i --;
    }

    console.log('goLeft', i);
    $('#modal_img').attr('src', _nizObj[i]);
}

function goRight(){
    if (i === _nizObj.length-1) {
        i = 0;
    }
    else {
        i ++;
    }

    console.log('goRight', i);
    $('#modal_img').attr('src', _nizObj[i]);
}


// TODO Napraviti exeption za situacije kada dodje do kraja niza

// TODO Napraviti goLeft funkciju koja se aktivira klikom na levo dugme modala i u njoj exeption za situaciju kada se nalazi na pocetku niza

// TODO srediti css da lici

// TODO naci nacina da se zatvori modal

$(function () {
    $("#contactSubmit").click(function () {
        submitVisitorsData();
       // console.log("Desktop submit btn");
    });
});


function submitVisitorsData() {


    var _name = $('#inputName').val();
    var _email = $('#inputEmail').val();
    var _msg = $('#inputMessage').val();

    console.log("Submit all data!", _name, _email, _msg);

    if (_email === '') {
        replaceContentInContainer('#contact-submit-box-replay-msg', 'Molimo Vas da unesite Vaš e - mail.');
        $('#inputEmail').css('border', '1px solid #E21900');
        $('#inputEmail').css('background-color', '#DBDBDB');
        $('#inputEmail').focus();
        $('#contact-submit-box-replay-msg').css('color', '#E21900');
    } else if (_msg === '') {
        replaceContentInContainer('#contact-submit-box-replay-msg', 'Molimo Vas da unesete poruku.');
        $('#inputMessage').css('border', '1px solid #E21900');
        $('#inputMessage').css('background-color', '#DBDBDB');
        $('#inputMessage').focus();
        $('#contact-submit-box-replay-msg').css('color', '#E21900');
    } else {
        $.ajax({
            url: '/api/submit',
            type: 'POST',
            data: jQuery.param({email: _email, name: _name, message: _msg}),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                console.log("RES", response);
                $('#inputName').val('');
                $('#inputEmail').val('');
                $('#inputMessage').val('');
                $('#contact-submit-box-replay-msg').css('color', '#008000');
                $('#contactSubmit').css('border', 'unset');
                replaceContentInContainer('#contact-submit-box-replay-msg', 'Hvala Vam. Vaša poruka je uspešno poslata.');

            },
            error: function (err) {
                console.log("ERROR submit all data", err.responseText);
                if (err.hasOwnProperty('responseText') && JSON.parse(err.responseText).hasOwnProperty('message')) {
                    if (JSON.parse(err.responseText).message === 'Invalid request argument') {
                        replaceContentInContainer('#contact-submit-box-replay-msg', 'Vaš e - mail nije tačan.');
                        $('#contact-submit-box-replay-msg').css('color', '#E21900');
                        $('#inputEmail').css('border', '1px solid #E21900');
                        $('#inputEmail').css('background-color', '#DBDBDB');
                        $('#inputEmail').focus();
                        return;
                    } else {
                        replaceContentInContainer('#contact-submit-box-replay-msg', JSON.parse(err.responseText).message);
                    }
                }
                $('#inputName').css('border', '1px solid #E21900');
                $('#inputEmail').css('border', '1px solid #E21900');
                $('#inputMessage').css('border', '1px solid #E21900');
                $('#contact-submit-box-replay-msg').css('color', '#E21900');
            }
        });
    }
}


function replaceContentInContainer(id, msg){
    console.log('replaceContentInContainer', id, msg);
    $(id).html(msg);
}














// $('#contact-form').submit(function(e) {
//     var name = $('#inputName'),
//         email = $('#inputEmail'),
//         message = $('#inputMessage');
//
//     if (!name.value || !email.value || !message.value) {
//         alertify.error('Proverite uneta polja');
//     } else {
//
//       $.ajax({
//                 url: '/api/submit',
//                 type: 'POST',
//                 data: jQuery.param({email: email, name: name, message: message}),
//                 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//                 success: function (response) {
//                     console.log("RES", response);
//                     $(pid + ' #contact-submit-box-name').val('');
//                     $(pid + ' #contact-submit-box-email').val('');
//                     $(pid + ' #contact-submit-box-msg').val('');
//                     replaceContentInContainer(pid + ' #contact-submit-box-replay-msg', 'Thank you. Your message has been sent.');
//
//         e.preventDefault();
//         $(this).get(0).reset();
//         alertify.success('Poruka je poslata');
//     }
//
// });











<!--<script>-->

<!--var stan1 = [-->
<!--'images/stan1/IMG_20180828_150354.jpg',-->
<!--'images/stan1/IMG_20180828_150451.jpg',-->
<!--'images/stan1/IMG_20180828_150456.jpg',-->

<!--];-->
<!--var i = 0;-->


<!--$(document).ready(function () {-->

<!--$('#stan1').attr('src', stan1[i]);-->
<!--});-->

<!--function goLeft() {-->
<!--console.log('Left',i);-->
<!--if(i>0){-->
<!--i = i-1;-->
<!--} else {-->
<!--i = stan1.length-1;-->
<!--}-->
<!--$('#stan1').attr('src', stan1[i]);-->
<!--}-->

<!--function goRight() {-->
<!--console.log('Right',i);-->
<!--if(i===stan1.length-1){-->
<!--i = 0;-->
<!--} else {-->
<!--i = i+1;-->
<!--}-->
<!--$('#stan1').attr('src', stan1[i]);-->
<!--}-->

<!--<div style="width: 500px; background-color: #44aaee; font-size: 100px; color: red">-->
<!--<div onclick="goLeft()"><</div>-->
<!--<img id="stan1" src="">-->
