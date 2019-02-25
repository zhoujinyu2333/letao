$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 1000)
});

$(function () {

    $(".lt_left .open").on("click", function () {
        $(this).next().stop().slideToggle();
    });

    $(".lt_header .open1").on("click", function () {
        $(".lt_left").toggleClass("hides");
        $(".lt_main").toggleClass("hides");
        $(".lt_header").toggleClass("hides");
    });

    $(".lt_header .open2").on("click", function () {
        $("#mymodal").modal("show");
    });

    $("#close").on("click", function () {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function (res) {
                if (res.success) {
                    location.href = "login.html";
                }
            }
        })
    })

})