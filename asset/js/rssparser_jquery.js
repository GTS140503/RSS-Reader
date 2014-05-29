var parser = function(url){
    //remote php for cross domain
    var xdrequest = 'http://user.frdm.info/ckhung/i/ba-simple-proxy.php?callback=?&url=';
    $.getJSON( xdrequest +url,function(data){
        $(data.contents).find('item').each(function() {
                    var title = $(this).find("title").text();
                    var des = $(this).find("description").text();
                    var link = $(this).find("link").text();
                    var $des = $('<div class="linkitem"></div>').html(des);
                    var $link = $('<a></a>').attr('href',link).attr('target','_blank').html(title);
                    var pubDate = new Date($(this).find("pubDate").text());
                    var day = pubDate.getDate();
                    var month = pubDate.getMonth() + 1;
                    var year = pubDate.getFullYear();
                    var date = day + '/' + month + '/' + year;
                    var $date = $('<div class="date"></div>').text(date);
                    var wrapper = "<li class='single-feed'>";
                    $(".content").append($(wrapper).append(title,des,link));
        })

    });
}
