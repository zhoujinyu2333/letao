$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("s_tpl", res);
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
        $("#s_modal").modal("show");

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("ss_tpl", res);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    $(".dropdown-menu").on("click", "a", function (e) {
        var txt = $(this).text();
        $("#txt").text(txt);

        var id = $(this).data("id");
        $("[name='categoryId']").val(id);

        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    })

    $("#fileId").fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            var picUrl = data.result.picAddr;
            $("#imgBox img").attr("src", picUrl);

            $("[name='brandLogo']").val(picUrl);

            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    })

    $("#form").bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请选择图片"
                    }
                }
            }
        }
    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $("#form").serialize(),
            dataType: 'json',
            success: function (res) {
                console.log(res);

                if (res.success) {
                    $("#s_modal").modal("hide");

                    currentPage = 1;
                    render();

                    $('#form').data('bootstrapValidator').resetForm(true);

                    $("#dropdownMenu1").text("请选择一级分类");
                    $("#imgBox img").attr("src", "./img/none.png");
                }

            }
        })
    });

})