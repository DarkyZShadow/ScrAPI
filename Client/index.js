$(function () {
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
    $('form').submit(function (event) {
        var input = $("#search_input").val();
        if (input.length > 0) {
            var object = {
                "value": input
            };
            $.ajax({
                type: "POST",
                data: JSON.stringify(object),
                url: "172.16.1.198/api/POST",
                contentType: "application/json"
            })
            $('#search').removeClass('open');
        }
        event.preventDefault();
        return false;
    })
});

$(document).ready(function(){
    $('#table_id').DataTable();
});
