//global variables
var $msnry = $('.m_cont');

//on page load check hash for content display
function hashLoad(){
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
            //wait for json to load info
                $('#profilepic').toggleClass('active');
                $('#content').toggleClass('active');
                $('#content .conitem'+hash).toggleClass('active');
        }else{
            history.replaceState({}, document.title, $(location).attr('pathname'));
        }
    }
}

//isotope masonry style gallery init
function isotopeInit(){
    $msnry.isotope({
        layoutMode: 'packery',
        itemSelector: '.m_item',
        packery:{
            percentPosition: true,
            columnWidth: '.m-sizer',
            gutters: 0,
        },
        stagger: 0,
    });
}

//loading stuff from json
function loadJson(/*callback,callback2*/){
    $.getJSON('./content.json', function(data){
        /*$(data.projects).each(function(key,value){});*/
        //loading gallery
        /*$(data.gallery).each(function(key,value){
            var str = '<div class="m_item m_item-new hidden"><div class="m_img_cont"><div class="m_shadow"></div><img class="m_img" src="'+ value.picsrc +'" alt=""><i class="fa fa-'+(value.link ? 'code' : 'picture-o')+' m_ico" aria-hidden="true"></i></div><div class="m_text_cont"><span class="m_title">'+value.title+'</span><hr><span class="m_description">'+value.desc+'</span></div><div class="m_hov_text_cont"><span class="m_hov_text">'+value.title+'</span></div></div>';

            $(str).appendTo('#gallery .gallery');
            var $newCont = $('.m_item-new');
            $('#gallery .gallery.m_cont').isotope('addItems', $newCont);
            $newCont.removeClass('m_item-new');
        });*/
        //loading timeline
        /*
        $(data.about).each(function(key, value){
            var str = '<li><div id="aitem"><div id="atext"><span id="atitle">'+value.title+'</span><hr><span id="adesc">'+value.desc+'</span></div><div id="aimg" style="background: url('+value.picsrc+') no-repeat;background-size: cover"></div><time id="adate">'+value.date+'</time></div></li>';
            $(str).prependTo('#timeline ul');
        });*/

        //idk why wont work another way ... basically after all this stuff adds to html itll check user interaction and after images were all loaded shows the gallery
        //DONT MOVE THIS CODE
        hashLoad();
        $msnry.imagesLoaded(function(){
            $('.m_cont .hidden').removeClass('hidden');
            isotopeRefresh();
        });
    });
}

function isotopeRefresh(){
    $msnry.isotope('reloadItems');
    $msnry.isotope();
    $msnry.isotope();
}

//load stuff on ready
$(document).ready(function(){
        //no.1 inits the isotope
        isotopeInit();
        //no.2 loads stuff from json
        //no.3 sets off refresh and hashload
        loadJson();
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
    //oneReload();
    $msnry.imagesLoaded(function(){
        $('.m_cont .hidden').removeClass('hidden');
        isotopeRefresh();
    });
});
var trigger = true;
function oneReload(){
    if(trigger){
        isotopeRefresh();
        trigger = false;
    }
}

//exit button in content function
$('.exit').on('click', function(){
    $('#content').toggleClass('active');
    $('#content .conitem.active').toggleClass('active');
    history.replaceState({}, document.title, $(location).attr('pathname'));
});

//masonry click on dynamic element
$('#container.gallery').on('click','.m_item', function(){
    var $stamp = $(this);
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        $msnry.isotope('unstamp', $stamp);
    }
    else{
        //get previous active
        var $stamp2 = $(this).parent().find('.m_item.active');
        $msnry.isotope('unstamp', $stamp2);
        $stamp2.removeClass('active');
        $(this).addClass('active').css('left','0px');
        $msnry.isotope('stamp', $stamp);
    }
    $msnry.isotope();
});

//TODO 100% solve for json async isotope refresh
//TODO in not make js objects and the file contents.js ... idk easier solution

// TODO fast menu change
// TODO copyright popup
// TODO mobile ui css responsive
// TODO tidy up css + robust

// TODO smart search using classes -> use isotope