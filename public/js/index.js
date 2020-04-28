$(function () {
    var id = 0
    //判断登录状态
    $.ajax({
        url: "http://localhost:3000/picture",
        dataType: "json",
        type: "post",
        data: "",
        timeout: 2000,
        async: false
    }).done((res) => {

        if (res.status == 0) {
            var picture = res.data.picture
            var src = "./img/" + picture
            $(".pic img").attr("src", src)
            $(".pic").show()
            $(".pic1").hide()
        }
    })

    // 退出登录
    $(".quit").click(function () {
        $(".showl").hide()
        $.ajax({
            url: "http://localhost:3000/quit",
            dataType: "json",
            type: "post",
            data: "",
            timeout: 2000,
            async: false
        }).done((res) => {
            if (res.status == 0) {
                window.location.reload();
            }
        })
    })

    //详情信息返回首页update接口
    $(".sup").click(function () {
        $(".showl").hide()
        $.ajax({
            url: "http://localhost:3000/update",
            dataType: "json",
            type: "post",
            data: {
                picture: id
            },
            timeout: 2000,
            async: false
        }).done((res) => {
            if (res.status == 0) {
                window.location.reload();
            }
        })
    })

    //查询该管理员下的所有用户
    $.ajax({
        url: "http://localhost:3000/findall",
        dataType: "json",
        type: "post",
        data: "",
        timeout: 2000,
        async: false
    }).done((res) => {
        if (res.status == 0) {
            var data = res.data
            $.each(data, function (i) {
               if(this.isDelete==0) {
                $(`
                <tr>
                    <td><input type="checkbox" value="all"></td>
                    <td>${i+1}</td>
                    <td class="user">${this.username}</td>
                    <td>${this.sex}</td>
                    <td>${this.email}</td>
                    <td>${this.phone}</td>
                    <td>
                        <button class="btn btn-primary">编辑</button>
                        <em class="btn btn-danger">删除</em>
                    </td>
                </tr>
            `).appendTo(".tbody")
               }
              
            })
        } else {
            $(".tbody").html("<tr><td>请先登录</td></tr>")
        }
    })
    
    //添加用户
    $(".addbtn").click(function () {
        $.ajax({
            url: "http://localhost:3000/add",
            dataType: "json",
            timeout: 2000,
            type: "post",
            async: false,
            data: {
                username: $("#inputUsername").val(),
                password: $("#inputPassword").val(),
                email: $("#inputEmail").val(),
                phone: $("#inputPhone").val(),
                sex: radio
            }
        }).done((res) => {

            if (res.status == 0) {
                alert("添加成功")
                $(".container1").hide()
                $(".mask").show()
                window.location.reload();
            } else if (res.status == 1) {
                alert("已注册")
            } else {
                alert("请先登录")
            }
        })
    })
    var radio = null
    $(".inputRa").click(function () { //点击获取存储性别的value
        radio = this.value
    });
    $(".add").click(function () { //点击添加用户
        $.ajax({
            url: "http://localhost:3000/just",
            dataType: "json",
            timeout: 2000,
            type: "post",
            async: false,
            data: ""
        }).done(res => {
            if (res.status == 0) {
                $(".container1").show()
                $(".mask").hide()
            } else if (res.status == 1) {
                alert("请先登录")
            }
        })


    })

    //点击显示修改头像
    $(".pic").click(function () {
        $(".showl").show()
     
            $.ajax({
                url: "http://localhost:3000/picture",
                dataType: "json",
                type: "post",
                data: "",
                timeout: 2000,
                async: false
            }).done((res) => {
                if (res.status == 0) {
                    var picture = res.data.picture
                    $(".showa").css("background-image", "url('img/" + picture + "')");
                }
            })
        


    })
    $(".sub").click(function () {
        var formData = new FormData($('#uploadForm')[0]);
        $.ajax({
            url: "http://localhost:3000/upd",
            type: "post",
            data: formData,
            cache: false,
            processData: false,
            contentType: false
        }).done((res) => {
            id = res.result
        })
    })

    //查询接口，查询用户
    $(".search").click(function () {
        $.ajax({
            url: "http://localhost:3000/search",
            type: "post",
            dataType: "json",
            async: false,
            timeout: 2000,
            data: {
                username: $("#Username").val()
            }
        }).done((res) => {


            if (res.status == 0) {
                $("tbody").html("")
                var data = res.data
                $.each(data, function (i) {
                    $(`
        <tr>
            <td><input type="checkbox" value="all"></td>
            <td>${i+1}</td>
            <td>${this.username}</td>
            <td>${this.sex}</td>
            <td>${this.email}</td>
            <td>${this.phone}</td>
            <td>
                <button class="btn btn-primary">编辑</button>
                <button class="btn btn-danger">删除</button>
            </td>
        </tr>
       `).appendTo("tbody")
                })
            } else if (res.status == 1) {
                $("tbody").html("<tr><td>请先登录</td></tr>")
            }


        })

    })

    //分页
    $(".btnClick").click(function(){
        var num= parseInt($(this).attr("data")) 
        $.ajax({
            url:"http://localhost:3000/separate",
            type: "post",
            dataType: "json",
            async: false,
            timeout: 2000,
            data: {
                num: num
            }
        }).done(res=>{
            if (res.status == 0) {
                var data = res.data
                $(".tbody").html(" ")
                $.each(data, function (i) {
                   if(this.isDelete==0) {
                    $(`
                    <tr>
                        <td><input type="checkbox" value="all"></td>
                        <td>${i+1}</td>
                        <td class="user">${this.username}</td>
                        <td>${this.sex}</td>
                        <td>${this.email}</td>
                        <td>${this.phone}</td>
                        <td>
                            <button class="btn btn-primary">编辑</button>
                            <em class="btn btn-danger">删除</em>
                        </td>
                    </tr>
                `).appendTo(".tbody")
                   }
                  
                })
            } else {
                $(".tbody").html("<tr><td>请先登录</td></tr>")
            }
        })
    })

})