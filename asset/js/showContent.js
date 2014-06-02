/**
* Get Rss feed
* *Version: 0.1,Lasr updated: 6/2/2014*
**/

//global counter
timer = 0;

pickId = null;

isPick = false;
/**
* Parse RSS Feed in content
*
**/

var showRss = function(url){
    var proxyPhpUrl = 'http://user.frdm.info/ckhung/i/ba-simple-proxy.php?callback=?&url=';
    var test = 'http://udn.com/udnrss/BREAKINGNEWS1.xml';
    $.getJSON(proxyPhpUrl + test , function(data){
        console.log(data.contents);
        $(data.contents).find('item').each(function(){

            var title = $(this).find('title').text();
            var description = $(this).find('description').text();

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
    var isRead = document.createElement('button');
    $(isRead).attr('class','btn btn-success');
    isRead.appendChild(document.createTextNode('標示已讀'));
    $("div#" + id + ">div.control").append(isRead);
    return true;

}






/*div class="item read clearfix">
            <div class="title"><h2>為什麼摔跤的時候要大喊一聲「豬排」？</h2></div>
            <div class="description">這是個令人深思的哲學問題……</div>
            <div class="control">
                <button class="btn btn-primary">閱讀文章</button>
                <button class="btn btn-success">標示已讀</button>
            </div>
        </div>*/
