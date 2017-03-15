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

		var table = document.getElementById('table_infos');
		table.innerHTML = "";
		for (var i = 0; i < Object.keys(result.data).length; i++) {
		    var tr = document.createElement("tr");
		    var th = document.createElement("th");
		    var td = document.createElement("td");
		    th.innerHTML = Object.keys(result.data)[i];
		    td.innerHTML = result.data[Object.keys(result.data)[i]];
		    tr.appendChild(th);
		    tr.appendChild(td);
		    table.appendChild(tr);
		}
		for (var i = 0; i < result.missing.length; i++) {
		    var tr = document.createElement("tr");
		    var th = document.createElement("th");
		    var td = document.createElement("td");
		    th.innerHTML = result.missing[i];
		    td.innerHTML = wait_icon;
		    tr.appendChild(th);
		    tr.appendChild(td);
		    table.appendChild(tr);
		}
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
