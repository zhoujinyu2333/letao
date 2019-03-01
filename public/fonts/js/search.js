$(function () {


    // var arr = ["哈哈","呵呵","嘻嘻","的旧爱欧舒丹"];
    // var jsonStr = JSON.stringify(arr);
    // localStorage.setItem("searchList",jsonStr);

    function renderArr() {
        var jsonStr = localStorage.getItem("searchList") || "[]";
        var arr = JSON.parse(jsonStr);
        return arr;
    }

    function render() {
        var arr = renderArr();
        // console.log(arr);

        var htmlStr = template("s_tpl", {
            list: arr
        });
        $(".history_Box").html(htmlStr);
    }
    render();

    $(".history_Box").on("click", ".close", function () {

        mui.confirm("你确定要清空历史记录吗?", "温馨提示", ['取消', '确认'], function (e) {
            console.log(e);
            if (e.index === 1) {
                localStorage.removeItem("searchList");
                render();
            }
        })
    })

    $(".history_Box").on("click", ".btn_delete", function () {
        var index = $(this).data("index");
        var arr = renderArr();
        arr.splice(index, 1);
        var str = JSON.stringify(arr);
        var jsonStr = localStorage.setItem("searchList", str);
        render();
    })

    $(".input_Box .s_btn").on("click", function () {
        var txt = $(".s_input").val().trim();
        if (txt.length === 0) return false;
        var arr = renderArr();
        var idx = arr.indexOf(txt);
        if (idx != -1) {
            arr.splice(idx,1);
        }
        if(arr.length >= 5) {
            arr.pop();
        }
        arr.unshift(txt);
        var str = JSON.stringify(arr);
        var jsonStr = localStorage.setItem("searchList", str);
        $(".s_input").val("");
        render();

    })



})