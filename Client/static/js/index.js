document.getElementById('table_members').style.display = "none";

$('form').submit(function (event) {
    var wait_icon = '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>';
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
		event.preventDefault();
		console.log(result);
		var table = document.getElementById('table_infos');
		table.innerHTML = "";
		for (var i = 0; i < Object.keys(result.data).length; i++) {
		    var key = Object.keys(result.data)[i];
		    if (result.data[key] instanceof Object || result.data[key] instanceof Array) continue;
		    var tr = document.createElement("tr");
		    var th = document.createElement("th");
		    var td = document.createElement("td");

		    th.innerHTML = key;
		    td.innerHTML = result.data[key];
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

		document.getElementById('table_members').style.display = "inline-table";
		var dt = $('#table_members').DataTable();
		var obj = Object.keys(result.data.employees);
		dt.clear().draw();
		for (var i in obj)
		{
		    var employee = result.data.employees[i];
		    var icon = '<i class="fa fa-times" aria-hidden="true"></i>';
		    dt.row.add([
			(employee.post ? employee.post : icon),
			(employee.fullname ? employee.fullname : icon),
			(employee.phone ? employee.phone : icon),
			(employee.address ? employee.address : icon),
			(employee.linkedin ? employee.linkedin : icon),
			(employee.mail ? employee.mail : icon)
		    ]).draw();
		}

	    });

/*	    var socket = io();
	    socket.emit('', input);*/
	}
    
    return false;
    
});

$('a[href="#search"]').on('click', function (event) {
    event.preventDefault();
    $('#search').removeClass('close');
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus();
});

$('#search, #search button.close').on('click keyup', function (event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
        $(this).removeClass('open');
    }
});

function search()
{
    var val = $('#search_input').value;
    alert(JSON.stringify($('#search_input')));
}
