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
        /*$(data.projects).each();*/
        //loading gallery
        $(data.gallery).each(function(key,value){
            var str = '<div class="gitem"><div id="gimg"><i id="ico" class="fa fa-'+(value.link ? 'code' : 'picture-o')+'" aria-hidden="true"></i><' + (value.link ? ('a target="_blank" href="' + value.href + '"') : ('div')) + ' class="imgishadow"></' + (value.link ? ('a') : ('div')) + '><img src="' + value.picsrc + '" alt=""></div><div id="ginfo"><span id="gtitle">' + value.title + '</span><hr><span id="gdescription">' + value.desc + '</span></div></div>';

            $(str).appendTo('#gallery .gallery');
            
        });
        //loading timeline
        $(data.about).each(function(key, value){
            var str = '<li><div id="aitem"><div id="atext"><span id="atitle">'+value.title+'</span><hr><span id="adesc">'+value.desc+'</span></div><div id="aimg" style="background: url('+value.picsrc+') no-repeat;background-size: cover"></div><time id="adate">'+value.date+'</time></div></li>';
            $(str).appendTo('#timeline ul');
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

//show text when hovering over img--bug scale-> on shadow of the image
$(document).on('mousemove', '.imgishadow', function(e){
    var offx = e.pageX * 2 > $(window).width() ? 6.5 : 1;
    /*var offy = e.pageY * 2 > $(window).height() ? 11 : 1;*/
    var x = e.pageX - 65 * offx;
    var y = e.pageY + $('#gallery').scrollTop() - 25; /* * offy;*/
    $(this).parent().parent().find('#ginfo').css( 'position', 'absolute' ).css( 'top', y).css( 'left', x).show();
});
//hide when not mousing over
$(document).on('mouseleave', '.imgishadow', function(e){
    $(this).parent().parent().find('#ginfo').css( 'position', 'absolute' ).hide();
});

// TODO gallery maximize image on click
// TODO mobile ui css responsive
// TODO 404 loading

//TODO gallery image no register point ev