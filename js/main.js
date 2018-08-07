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

//loading stuff from json
$(document).ready(function(){
    $.getJSON('./content.json', function(data){
        /*$(data.projects).each(function(key,value){});*/
        //loading gallery
        /*$(data.gallery).each(function(key,value){
            var str = '<div class="gitem"><div id="gimg"><i id="ico" class="fa fa-'+(value.link ? 'code' : 'picture-o')+'" aria-hidden="true"></i><' + (value.link ? ('a target="_blank" href="' + value.href + '"') : ('div')) + ' class="imgishadow"></' + (value.link ? ('a') : ('div')) + '><img src="' + value.picsrc + '" alt=""></div><div id="ginfo"><span id="gtitle">' + value.title + '</span><hr><span id="gdescription">' + value.desc + '</span></div></div>';

            $(str).appendTo('#gallery .gallery');
        });*/
        //loading timeline
        $(data.about).each(function(key, value){
            var str = '<li><div id="aitem"><div id="atext"><span id="atitle">'+value.title+'</span><hr><span id="adesc">'+value.desc+'</span></div><div id="aimg" style="background: url('+value.picsrc+') no-repeat;background-size: cover"></div><time id="adate">'+value.date+'</time></div></li>';
            $(str).prependTo('#timeline ul');
        });
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
});

//exit button in content function
$('.exit').on('click', function(){
    $('#content').toggleClass('active');
    $('#content .conitem.active').toggleClass('active');
    history.replaceState({}, document.title, $(location).attr('pathname'));
});

//gallery animation on hover
$(document).on('mouseenter', '.imgishadow', function(){
    $(this).parent().addClass('active');
});
$(document).on('mouseleave', '.imgishadow', function(){
    $(this).parent().removeClass('active');
});

//masonry gallery
var $msnry = $('.m_cont');
$(document).ready(function(){
    $msnry.masonry({
        itemSelector: '.m_item',
        percentPosition: true,
       columnWidth: '.m-sizer',
       stagger: 0,
    });
});

$('.m_item').on('click', function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active');
    }
    else{
        $('.m_item').removeClass('active');
        $(this).addClass('active');
    }
    $msnry.masonry();
});




// TODO masonry init when images are loaded
// TODO fast menu change
// TODO mobile ui css responsive
// TODO 404 loading

// TODO smart search using classes