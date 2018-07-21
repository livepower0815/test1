$(document).ready(function () {
    $(".fa-layers.fa-fw").click(function (e) { 
        e.preventDefault();
        $(this).find(".fa-layers-counter").text(Number($(this).find(".fa-layers-counter").text()) + 1);
    });
});
