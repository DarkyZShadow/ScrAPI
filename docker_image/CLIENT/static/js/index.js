const API_HOST = "dockerimage_api_1:3030";
const BOT_HOST = "dockerimage_bot_1:9999";

document.getElementById("table_members").style.display = "none";
$('form').submit(function (event) {
    var wait_icon = '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>';
    var input = $("#search_input").val().trim();
    
    if (input.length > 0)
	{
	    $("#search").removeClass("open");
	    $("#search").addClass("close");
	    
	    var object = {
			"id":input
	    }
	    var settings = {
			"async": true,
			"crossDomain": true,
			"url": `http://${API_HOST}/company`,
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"cache-control": "no-cache"
			},
			"processData": false,
			"data": JSON.stringify(object)
	    }
	    
		event.preventDefault();
	    $.ajax(settings).done(function (result) {
		document.getElementById("table_members").style.display = "inline-table";
			var table = document.getElementById('table_infos');
			var dt = $('#table_members').DataTable();
			dt.clear().draw();

			table.innerHTML = "";
			console.log(result);
			if (result.data && result.data.Nom) {
				for (var i = 0; i < Object.keys(result.data).length; i++) {
					var key = Object.keys(result.data)[i];
					if (result.data[key] instanceof Object || result.data[key] instanceof Array) continue;
					var tr = document.createElement("tr");
					var th = document.createElement("th");
					var td = document.createElement("td");

				    	if (key == "employees") i++;
					th.innerHTML = key;
					td.innerHTML = result.data[key];
					tr.appendChild(th);
					tr.appendChild(td);
					table.appendChild(tr);
				}
				if(result.data.employees) {
					var obj = Object.keys(result.data.employees);
					for (var i in obj)
					{
						var employee = result.data.employees[i];
						var icon = '<i class="fa fa-times" aria-hidden="true"></i>';
						dt.row.add([
							(employee.post ? employee.post : icon),
							(employee.fullname ? employee.fullname : icon),
							(employee.linkedin ? employee.linkedin : icon),
							(employee.mail ? employee.mail : icon),
							(employee.from ? employee.from : icon),
						]).draw();
					}
				}
			}
			for (var i = 0; i < result.missing.length; i++) {
				var tr = document.createElement("tr");
				var th = document.createElement("th");
				var td = document.createElement("td");

			    if (result.missing[i] == "employees") i++;
				th.innerHTML = result.missing[i];
				td.innerHTML = wait_icon;
				th.setAttribute("id", "th-" + result.missing[i]);
				td.setAttribute("id", "td-" + result.missing[i]);
				tr.appendChild(th);
				tr.appendChild(td);
				table.appendChild(tr);
			}
			
			var socket = io.connect(`http://${BOT_HOST}`, {
				'sync disconnect on unload': true,
				'forceNew' : true });

			socket.on('connect', function() {
				console.log('Connected !');
				socket.emit('search_missings', result);
			});

			socket.on("disconnect", function(){
			    console.log("Disconnected !");
			    var waitings = document.getElementsByClassName("fa fa-spinner fa-spin fa-1x fa-fw");
			    var element = waitings.item(0);
			    while (element) {
				element.className = "fa fa-times";
				element = waitings.item(0);
			    }
			});
			
			socket.on("google_search", function(datas) {
				console.log(datas);
				if (datas) {
				  for (var i in datas) {
						var td = document.getElementById('td-' + i);
						if (td) td.innerHTML = datas[i];
					}
				}
			});
			
			socket.on("societe_search", function(datas) {
				console.log(datas);
				if (datas) {
					for (var i in datas) {
						var td = document.getElementById('td-' + i);
						if (td) td.innerHTML = datas[i];
					}
				}

			});

			socket.on("linkedin_search", function(data) {
				console.log(data);
				var obj = Object.keys(data);
				for (var i in obj)
				{
					var employee = data[i];
					var icon = '<i class="fa fa-times" aria-hidden="true"></i>';
					dt.row.add([
						(employee.post ? employee.post : icon),
						(employee.fullname ? employee.fullname : icon),
						(employee.linkedin ? employee.linkedin : icon),
						(employee.mail ? employee.mail : icon),
						(employee.from ? employee.from : icon),
					]).draw();
				}	
			});
		}).fail(function (jqXHR, textStatus) {
			if (jqXHR.status === 404)
				console.log('Aucun résultats');
			else
				console.log(`Il y a un problème avec l'API : ${textStatus}`);
		});
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
