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

// TODO mobile ui css responsive
// TODO 404 loading


$('.gitem').on('mousemove', function(e){
    $(this).find('#ginfo').css( 'position', 'absolute' ).css( 'top', e.pageY - 10).css( 'left', e.pageX - 40).show();
});
$('.gitem').on('mouseleave', function(e){
    $(this).find('#ginfo').css( 'position', 'absolute' ).hide();
});