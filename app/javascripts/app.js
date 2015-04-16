var main = function() {
    var $result,
        url,
        link,
        index,
        userUrl;


    //parse the json string to be able to get or to link to long url 
    function checking (link) {
        index = link.indexOf("localhost:3000");

        if(index > -1) {
            //posturl = posturl.replace("http://localhost:3000/", "");
            link = link.replace("localhost:3000", "");
        }

        return link;
    }

    $("#submit").click(function() {
        url = $("#theurl").val();
        if (url === '') {
            alert("Please enter valid url");
        }
        else {
            userUrl = JSON.stringify({url0:url});
            $.ajax({
                type: "POST",  //post to server.js
                url: "/genUrl",    //route
                contentType: "application/json; charset=utf-8",
                dataType: "json",  //json type
                data: userUrl
            })
            .done(function (data, status){
                $("#results").html(""); //html added
                //inserts link into dom
                link = checking(data.url);
                $("#results").append("<a href = "+ link + ">" + data.url + "</a>");  
            })
            .fail(function (data, status){
                console.log("Call fail");
            });
        }
    });

    setInterval(function(){ 
        $('#topresults').empty();
        $.ajax({
            url:"/genList",
            error : function () {

            },dataType: "json",
            success: function (reply) {
                var data = JSON.parse(reply);
                var i;
                for (i = 0; i < 10; i++) {
                    $("#visit").append("<p>Number: "+ (i + 1) +"</p>");
                    $("#visit").append($('<p>')).append(data[i]);
                }
        },type: "post"
    })}, 5000);

};

$(document).ready(main);