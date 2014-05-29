//FIXME 2014/05/27 set in localstorage
count = 0;

isselected = false;

selectedid = null;

// data type
var itemtype = {
    "id":null,
    "title":null,
    "selected":false

};

var itemarray = [];


/**
* Add a new item (url)
* @param title title which is connected by url is named by user
**/

var additem = function(title){
    var item = document.createElement('div');

    itemarray.push({
        "id":count,
        "title":title,
        "selected":false
    });

    //create id
    $(item).attr('id',count);
    //create current id number
    var current = $(item).attr('id');
    console.log('current ' + current);

    $(item).addClass('list-group-item');

    item.addEventListener('click',function(){
        console.log('in item click listener');

        itemseleted(current);
    },false);

    var itemtitle = document.createElement('span');
    itemtitle.appendChild(document.createTextNode(title));

    //FIXME 2014/05/27 set onclick event

    document.getElementById('rsslist').appendChild(item).appendChild(itemtitle);
    count ++;
}

/**
* user select one title(url)
* @param id current id which is selected by user
**/

var itemseleted = function(id){
    console.log('in function itemseleted');

    if(isselected == true){
        var item = document.getElementById(selectedid);
        $(item).attr('class','list-group-item');
        //END 2014/05/27
        $('div.' + selectedid + ' > button').remove();


    }
        isselected = true;
        selectedid = id;

        var item = document.getElementById(id);

        //jquery change class
        $(item).attr("class",'list-group-item active');
        var itemdeleted = document.createElement('button');
        itemdeleted.appendChild(document.createTextNode('刪除'));
        $(itemdeleted).addClass('btn btn-danger');
        itemdeleted.addEventListener('click',function(){

            //remove element
            $("#"+id).remove();
        },false);
        document.getElementById(id).appendChild(itemdeleted);

}
