$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("f_tpl", res);
                $("tbody").html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: res.page,
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    $("#add_btn").on("click", function () {
        $("#f_modal").modal("show");
    })

    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    $("#f_modal").modal("hide");
                    currentPage = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })

})