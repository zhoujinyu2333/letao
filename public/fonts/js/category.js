$(function () {

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategory",
            dataType: "json",
            success: function (res) {
                console.log(res);

                var htmlStr = template("l_tpl", res);
                $(".lt_main .lt_left ul").html(htmlStr);
                renderById(res.rows[0].id);
            }
        })
    }

    function renderById(id) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                id: id
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("r_tpl", res);
                $(".lt_main .lt_right ul").html(htmlStr);
            }
        })
    }

    $(".lt_left").on("click","a",function(e){
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");

        var id = $(this).data("id");
        renderById(id);
    })


})