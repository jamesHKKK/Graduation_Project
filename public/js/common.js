var storage = window.localStorage;
$.ajax({
    url: "http://localhost:3000/just",
    type: "post",
    dataType: "json",
    async: false,
    timeout: 2000,
    data: {
    }
}).done((res) => {
    if (res.status == 0) {
        var data = storage.getItem("data") + ",欢迎你";
        $(".show").hide()
        $(".login_show a").html(data)
        $("#dropdown-menu-active").show()
    }
})
$(".quit").click(function () {
    $.ajax({
        url: "http://localhost:3000/quit",
        dataType: "json",
        type: "post",
        data: "",
        timeout: 2000,
        async: false
    }).done((res) => {
        if (res.status == 0) {
            localStorage.clear("data") 
            localStorage.clear("num") 
            window.open("./index.html","_self");
        }
    })
})
$(".syg1").click(function(){
    if(storage.getItem("data")==undefined){
        window.open("./error.html","_self")
    }else{
        window.open("./blog-sidebar.html","_self")
    }
})
$(".syg2").click(function(){
    if(storage.getItem("data")==undefined){
        window.open("./error.html","_self")
    }else{
        window.open("./blog-grid.html","_self")
    }
})
$(".syg3").click(function(){
    if(storage.getItem("data")==undefined){
        window.open("./error.html","_self")
    }else{
        window.open("./faq.html","_self")
    }
})
$(".syg4").click(function(){
    if(storage.getItem("data")==undefined){
        window.open("./error.html","_self")
    }else{
        window.open("./psychological.html","_self")
    }
})




