$(document).ready(function(){
	
	$('.tabs').click(function(){
        var tab_id = $(this).attr('data-tab');
        var tabname = $(this).parent().parent().attr('id');

		$('#'+tabname+' .tabs').removeClass('current');
		$('#'+tabname+' .tab-content').removeClass('current');

		$(this).addClass('current');
		$('#'+tabname+" #"+tab_id).addClass('current');
	});

});