//FIXME 2014/05/27 set in localstorage

/**
* New title
* *Version: 0.3,Last updated: 6/1/2014*
**/


//global counter
count = 0;

isselected = false;

selectedid = null;

// data type
var itemtype = {
    "id":null,
    "title":null,
    "url":null,
};

itemarray = [];

/**
* Close the popup menu
*
**/

var closePopup = function(){
    document.getElementById('pageOverlay').style.visibility = 'hidden';
    document.getElementById('popup').style.visibility = 'hidden';
    document.getElementById('nullerror').style.visibility = 'hidden';
}

/**
* Show the popup menu
*/

var openPopup = function(){
    $('#titleinput').val(null);
    $('#urlinput').val(null);

    document.getElementById('popup');
    popup.style.visibility = 'visible';
    popup.style.top = window.innerHeight/2 - 75 +'px';
    popup.style.left = window.innerWidth/2 - 200 +'px';
    document.getElementById('pageOverlay').style.visibility = 'visible';

}

/*
* Error input value
* @return false is input error
*/

var validateForm = function(){
    if( $('#titleinput').val() == null || $('#urlinput').val() == null){
        document.getElementById('nullerror').style.visibility = 'visible';
        return false;
    } else if($('#titleinput').val() == "" || $('#urlinput').val() == ""){
        document.getElementById('nullerror').style.visibility = 'visible';
        return false;
    }
    closePopup();
    return true;

}

//TODO: auful
var additem = function(){
    var url = document.getElementById('urlinput').value;
    var title = document.getElementById('titleinput').value;
    additemproto(title,url);
}
//TODO: auful
window.onload = function(){
    additempreload();
    var welcome = document.getElementById('content');
    var contentDiv = document.createElement('div');
    $(contentDiv).attr('class','item clearfix');
    var title = document.createElement('div');
    var h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode('歡迎使用線上RSS閱讀器'));
    title.appendChild(h2);
    var descption = document.createElement('div');
    descption.appendChild(document.createTextNode('立即新增想要訂閱的RSS!!'));
    contentDiv.appendChild(title);
    contentDiv.appendChild(descption);
    document.getElementById('content').appendChild(contentDiv);
}
//TODO: auful
var additempreload = function(){
    for(var key in localStorage){
        additemproto(key,localStorage.getItem(key));
    }
}

/**
* Add a new item (url)
* @param title title which is connected by url is named by user
**/
//TODO: function name , para title
var additemproto = function(title,url){


    //TODO: auful
    localStorage.setItem(title,url);

    var item = document.createElement('div');
    //create id
    $(item).attr('id','title' + count);
    //create current id number
    var current = $(item).attr('id');
    $(item).addClass('list-group-item');

    item.addEventListener('click',function(){
        console.log('in item click listener');
        document.getElementById('content').innerHTML = 'Loading...';
        itemseleted(current,title);
    },false);

    var itemtitle = document.createElement('span');
    itemtitle.appendChild(document.createTextNode(title));
    //FIXME 2014/05/27 set onclick event
    document.getElementById('rsslist').appendChild(item).appendChild(itemtitle);

    itemarray.push({
        "id":current,
        "title":title,
        "url":url,
    });
    console.log(itemarray);

    count ++;
    return false;

}

/**
* user select one title(url)
* @param id current id which is selected by user
**/

//TODO: param title
var itemseleted = function(id,title){
    console.log('in function itemseleted');

    //TODO:
    clearRsscontent();

    if(isselected == true){

        $("#"+selectedid).attr('class','list-group-item');
        console.log("selected id "+selectedid);
        //END 2014/05/27
        $('div#' + selectedid + ' > button').remove();
        console.log("button delete");


    }

    //TODO:
    showRss(localStorage.getItem(title));


    isselected = true;
    selectedid = id;

    //jquery change class
    $("#"+id).attr("class",'list-group-item active');
    var itemdeleted = document.createElement('button');
    itemdeleted.appendChild(document.createTextNode('刪除'));
    $(itemdeleted).addClass('btn btn-danger');
    itemdeleted.addEventListener('click',function(){

        //remove element
        $("#"+id).remove();
        $("#"+id).detach();
        //remove index of array
        itemarray.splice(deleteFromArray(id),1);
        //remove array element

        //TODO:
        localStorage.removeItem(title);

    },false);

    document.getElementById(id).appendChild(itemdeleted);


}

/**
*In order to finding index of array,we use value of id.
*@params valueOfId value of id
*@return index of array
**/
var deleteFromArray = function(valueOfId){
    for(var i = 0 ; i < itemarray.length ; i ++ ){
        if(valueOfId == itemarray[i].id){
            return i;
        }
        return -1;
    }
}

