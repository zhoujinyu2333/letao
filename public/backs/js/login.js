$(function () {

    $("#myform").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2到6之间"
                    },
                    callback : {
                        message : "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码必须在6到12之间"
                    },
                    callback : {
                        message : "密码错误"
                    }
                }
            }
        }

    })

    $("#myform").on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            dataType: "json",
            data: $('#myform').serialize(),
            success: function (info) {
                console.log(info);

                if (info.error === 1000) {
                    $("#myform").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if (info.error === 1001) {
                    $("#myform").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }

                if (info.success) {
                    location.href = "index.html";
                }

            }
        });

    })

    $("[type ='reset']").on("click", function () {
        $("#myform").data("bootstrapValidator").resetForm();
    })
})