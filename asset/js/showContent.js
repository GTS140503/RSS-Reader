/**
* Get Rss feed
* *Version: 0.2,Lasr updated: 6/2/2014*
**/

//global counter
timer = 0;

pickId = null;

isPick = false;

var replaceURLWithHTMLLinks = function(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a href='$1'>$1</a>");
}

//TODO: delete content
var clearRsscontent = function(){
    var content = document.getElementById('content');
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }

}

/**
* Parse RSS Feed in content
*
**/

var showRss = function(url){
    var proxyPhpUrl = 'http://user.frdm.info/ckhung/i/ba-simple-proxy.php?callback=?&url=';
    //var test = 'http://udn.com/udnrss/BREAKINGNEWS1.xml';
    $.getJSON(proxyPhpUrl + url , function(data){
        console.log(data.contents);
        $(data.contents).find('item').each(function(){
            console.log();
            var title = $(this).find('title').text();
            title = title.replace("<![CDATA[", "").replace("]]>", "");
            var description = $(this).find('description').text();
            description = description.replace("<![CDATA[", "").replace("]]>", "");
            var link = $(this).find("link").text();

            link = link.replace("<![CDATA[", "").replace("]]>", "").replace(";","");

            console.log('xx  '+replaceURLWithHTMLLinks(link));
            var contentDiv = document.createElement('div');
            $(contentDiv).attr('class','item clearfix');
            $(contentDiv).attr('id','content'+timer);
            var currentId = $(contentDiv).attr('id');

            contentDiv.addEventListener('click',function(){
                isArtSelected(currentId);

            },false);

            var titleDiv = document.createElement('div');
            $(titleDiv).attr('class','title');
            var h2 = document.createElement('h2');
            h2.appendChild(document.createTextNode(title));
            titleDiv.appendChild(h2);

            var descriptionDiv = document.createElement('div');

            descriptionDiv.appendChild(document.createTextNode(description));
            contentDiv.appendChild(titleDiv);
            contentDiv.appendChild(descriptionDiv);

            var controlDiv = document.createElement('div');
            $(controlDiv).attr('class','control');

            var readBtn = document.createElement('button');
            $(readBtn).attr('class','btn btn-primary');

            readBtn.addEventListener('click',function(){
               window.location.href = '\''+link+'\'';
            },false);

            readBtn.appendChild(document.createTextNode('閱讀文章'));

            controlDiv.appendChild(readBtn);

            contentDiv.appendChild(controlDiv);

            document.getElementById('content').appendChild(contentDiv);
            timer++;
        })
    });
}

/**
* user click article
* @return exception
**/
var isArtSelected = function(id){
    if(isPick == true && pickId == id){
        console.log('true && id');
        return false;
    } else if(isPick == true){
        console.log('true');
        $("#"+pickId).css('background-color','white');
        $("div#"+pickId+ ">div.control>button.btn.btn-success").remove();
    }
    console.log('main');
    isPick = true;
    pickId = id;
    $("#"+id).css('backgroundColor','rgb(250, 250, 175)');
    return true;

}






