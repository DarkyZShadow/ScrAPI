$('form').submit(function (event) {
    var wait_icon = "<i class='fa fa-cog fa-spin fa-2x fa-fw margin-bottom'></i>";
    var input = $("#search_input").val().trim();
    
    if (input.length > 0)
	{
	    $("#search").removeClass("open");
	    $("#search").addClass("close");
	    
	    var object = {
                "name":input
	    }
	    var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://172.16.1.198:3030/company",
		"method": "POST",
		"headers": {
		    "content-type": "application/json",
		    "cache-control": "no-cache"
		},
		"processData": false,
		"data": JSON.stringify(object)
	    }
	    
	    $.ajax(settings).done(function (result) {
		console.log(result);
		
		$('#search').removeClass('open');
		event.preventDefault();
		
		$('#table_infos_siren').html(result.data.SIREN != undefined ? result.data.SIREN : wait_icon);
		$('#table_infos_siret').html(result.data.SIRET != undefined ? result.data.SIRET : wait_icon);
		$('#table_infos_nic').html(result.data.NIC != undefined ? result.data.NIC : wait_icon);
		$('#table_infos_siren').html(result.data.SIREN != undefined ? result.data.SIREN : wait_icon);
		$('#table_infos_name').html(result.data.name != undefined ? result.data.name : wait_icon);
		$('#table_infos_address').html(result.data.address != undefined ? result.data.address : wait_icon);
		$('#table_infos_type').html(result.data.type != undefined ? result.data.type : wait_icon);
		$('#table_infos_desc').html(result.data.desc != undefined ? result.data.desc : wait_icon);
		$('#table_infos_size').html(result.data.size != undefined ? result.data.size : wait_icon);
		$('#table_infos_category').html(result.data.category != undefined ? result.data.category : wait_icon);
		$('#table_infos_date').html(result.data.date != undefined ? result.data.date : wait_icon);
		
		$('#table_members').DataTable().clear().draw();
		
	    });
	    
	    var socket = io();
	    socket.emit('', input);
	}
    
    event.preventDefault();
    return false;
    
});

$('a[href="#search"]').on('click', function (event) {
        event.preventDefault();
    $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
});

$('#search, #search button.close').on('click keyup', function (event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
        $(this).removeClass('open');
    }
});

$(document).ready(function(){
    $('#table_members').DataTable();
});

function search()
{
    var val = $('#search_input').value;
    alert(JSON.stringify($('#search_input')));
}
