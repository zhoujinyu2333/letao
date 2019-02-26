$(function () {

    var currentpage = 1;
    var pageSize = 5;
    var id;
    var isDelete;


    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentpage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("u_tpl", res);
                $('tbody').html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: res.page,
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        currentpage = page;
                        render();
                    }
                })
            }
        })
    }

    $("tbody").on("click", ".btn", function (e) {
        $("#u_modal").modal("show");

        id = $(this).parent().data("id");
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

    })

    $("#close1").on("click", function () {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: id,
                isDelete: isDelete
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    $("#u_modal").modal("hide");
                    render();
                }
            }
        })
    })



})