//on page load check hash for content display
$(document).ready(function(){
    var hash = window.location.hash;
    //if hash is set
    if(hash !== ''){
        //get all hashes
        var idArray = [];
        $('#content .conitem').each(function () {
            var id = '#' + this.id;
            idArray.push(id);
        });

        //the hash is in array|else delete wrong hash from history
        if(idArray.indexOf(hash) != -1){
            $('#profilepic').toggleClass('active');
            $('#content').toggleClass('active');
            $('#content .conitem'+hash).toggleClass('active');
        }else{
            history.replaceState({}, document.title, $(location).attr('pathname'));
        }
    }
});

//masonry gallery
var $msnry = $('.m_cont');
$(document).ready(function(){
    $msnry.masonry({
        itemSelector: '.m_item',
        percentPosition: true,
        columnWidth: '.m-sizer',
        stagger: 0,
        horizontalOrder: false
    });
});


//loading stuff from json
$(document).ready(function(){
    $.getJSON('./content.json', function(data){
        /*$(data.projects).each(function(key,value){});*/
        //loading gallery
        $(data.gallery).each(function(key,value){
            var str = '<div class="m_item"><div class="m_img_cont"><div class="m_shadow"></div><img class="m_img" src="'+ value.picsrc +'" alt=""><i class="fa fa-'+(value.link ? 'code' : 'picture-o')+' m_ico" aria-hidden="true"></i></div><div class="m_text_cont"><span class="m_title">'+value.title+'</span><hr><span class="m_description">'+value.desc+'</span></div><div class="m_hov_text_cont"><span class="m_hov_text">'+value.title+'</span></div></div>';


            $(str).appendTo('#gallery .gallery');
        });
        //loading timeline
        $(data.about).each(function(key, value){
            var str = '<li><div id="aitem"><div id="atext"><span id="atitle">'+value.title+'</span><hr><span id="adesc">'+value.desc+'</span></div><div id="aimg" style="background: url('+value.picsrc+') no-repeat;background-size: cover"></div><time id="adate">'+value.date+'</time></div></li>';
            $(str).prependTo('#timeline ul');
        });

        $msnry.masonry('reloadItems');
    $msnry.masonry('layout');
    });
});

//profilepic on click show function
$('#profilepic').on('click', function(){
    $(this).toggleClass('active');
});

//menu selection function
$('.menuitem').on('click', function(){
    var str = $(this).attr('href');
    $('#content').toggleClass('active');
    $('#content .conitem'+str).toggleClass('active');
    $msnry.masonry('reloadItems');
    $msnry.masonry('layout');
});

//exit button in content function
$('.exit').on('click', function(){
    $('#content').toggleClass('active');
    $('#content .conitem.active').toggleClass('active');
    history.replaceState({}, document.title, $(location).attr('pathname'));
});

//masonry click on dynamic element
$('#container.gallery').on('click','.m_item', function(){
   console.log($(this));

    if($(this).hasClass('active')){
        $(this).removeClass('active');
    }
    else{
        $('.m_item').removeClass('active');
        $(this).addClass('active');
    }
    $msnry.masonry('reloadItems');
    $msnry.masonry('layout');
});

// TODO masonry fix resize
// TODO fast menu change
// TODO mobile ui css responsive
// TODO 404 loading

// TODO smart search using classes