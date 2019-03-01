$(function () {

    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("p_tpl", res);
                $(".lt_content .table tbody").html(htmlStr);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: res.page,
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }

                })
            }
        })
    }

    $("#addBtn").on("click", function () {
        $("#p_modal").modal("show");

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("p1_tpl", res);
                $(".dropdown .dropdown-menu").html(htmlStr);
            }
        })
    })

    $(".dropdown-menu").on("click", "a", function () {
        var txt = $(this).text();
        var id = $(this).data("id");

        $(".s_txt").text(txt);
        $('[name="brandId"]').val(id);
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID")
    })

    $("#fileupload").fileupload({
        dataType: "json",
        done: function (a, data) {
            var pic = data.result.picAddr;
            picArr.unshift(data.result);

            $("#imgBox").prepend("<img src='" + pic + "' alt='' height=100px>");
            if (picArr.length > 3) {
                picArr.pop();
                $("#imgBox img:last-of-type").remove();
            }

            if (picArr.length === 3) {
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
            }
            console.log(picArr);

        }
    })

    $('#form').bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品价格"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }
    });

    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();

        var p_data = $("#form").serialize();
        p_data += '&picArr=' + JSON.stringify(picArr);
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: p_data,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    $("#p_modal").modal("hide");

                    currentPage = 1;
                    render();

                    $('#form').data("bootstrapValidator").resetForm(true);
                    $(".s_txt").text("请输入二级分类");
                    $('#imgBox img').remove();
                    picArr = [];
                }
            }
        })
    })

})