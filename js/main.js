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
$('.imgishadow').on('mouseenter', function(){
    $(this).parent().addClass('active');
});
$('.imgishadow').on('mouseleave', function(){
    $(this).parent().removeClass('active');
});

//show text when hovering over img--bug scale-> on shadow of the image
$('.imgishadow').on('mousemove', function(e){
    var offx = e.pageX * 2 > $(window).width() ? 8.4 : 1;
    var x = e.pageX - 50 * offx;
    var y = e.pageY + $('#gallery').scrollTop() - 10;
    $(this).parent().parent().find('#ginfo').css( 'position', 'absolute' ).css( 'top', y).css( 'left', x).show();
});

$('.imgishadow').on('mouseleave', function(e){
    $(this).parent().parent().find('#ginfo').css( 'position', 'absolute' ).hide();
});

// TODO gallery maximize image in click
// TODO mobile ui css responsive
// TODO 404 loading