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
                        $ul.append($("<li>").append($("<a>").attr("href", link.url).attr("target", "_blank").html(link.text)));
                    });
                    $cardBody.append($ul);
                }

                $cardHorizontal.append($cardBody);

                var $card = $("<div class='card'></div>").append($cardHorizontal);

                $("#linkarea").append($card);
            }); 

            data.critics.forEach((critic, c) => {
                var $item = $("<div>").addClass("accordion-item");
                var $header = $("<h2>").addClass("accordion-header").attr("id", "heading" + c);
                $header.append(
                    $("<button>")
                        .addClass("accordion-button collapsed").text(critic.name)
                        .attr("data-bs-toggle", "collapse")
                        .attr("data-bs-target", "#collapse" + c)
                        .append($("<b>").text((c+1) + ". " +critic.title))
                );
                $item.append($header);

                var $collapse = $("<div>").addClass("accordion-collapse collapse").attr("id", "collapse" + c).attr("data-bs-parent","criticarea");
                var $body = $("<div>").addClass("accordion-body");
                $body.html(critic.text);

                
                if (critic.sources && critic.sources.length > 0) {
                    var $sources = $("<ul>"); 
                    critic.sources.forEach((link, i) => {
                        $sources.append($("<li>").append($("<a>").attr("href", link.url).attr("target", "_blank").html(link.text)));
                    });
                    $body.append($sources); 
                }                

                $collapse.append($body);
                $item.append($collapse);

                $("#criticarea").append($item);
            }); 

            if (location.hash){
                $(location.hash).get(0).scrollIntoView();
            }
        }
    })
})(); 