(function(){
    $.ajax({
        "url": "/data/linklist.json",
        "success": function(data){
            data.linklist.forEach((item, i) => {
                var $cardHorizontal = $("<div>").addClass("card-horizontal"); 
                var $imgWrapper = $("<div>").addClass("img-square-wrapper").append($("<img>").attr("src", item.imgsrc).attr("width","200px").on("click", function(){
                    window.open(item.links[0].url, "_blank");
                }));
                $cardHorizontal.append($imgWrapper);

                var $cardBody = $("<div>").addClass("card-body");
                $cardBody.append($("<h4>").addClass("card-title").text(item.title));
                $cardBody.append($("<p>").addClass("card-text").html(item.text));

                if (item.links && item.links.length > 0) {
                    var $ul = $("<ul>");
                    item.links.forEach((link, i) => {
                        $ul.append($("<li>").append($("<a>").attr("href", link.url).attr("target", "_blank").text(link.text)));
                    });
                    $cardBody.append($ul);
                }

                $cardHorizontal.append($cardBody);

                var $card = $("<div class='card'></div>").append($cardHorizontal);

                $("#linkarea").append($card);
            }); 
        }
    })
})(); 