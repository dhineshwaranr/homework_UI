
$( document ).ready(function() {
    $(function () {
        $('#tab1 a').click(function (e) {
            e.preventDefault();
            $('a[href="' + $(this).attr('href') + '"]').tab('show');
        })
    });

    $("#fromdatepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());

    $("#todatepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());;
});
