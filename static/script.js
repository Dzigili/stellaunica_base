
$(document).ready(function () {
    $('.slide-section').click(function (e) {

        var linkHref = $(this).attr('href');

        $('html, body').animate({
            scrollTop :  $(linkHref).offset().top -50
        }, 1000);

        e.preventDefault();
    });
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
