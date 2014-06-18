var DROPBOX_APP_KEY = 'hxc70vf1clq38zs';

var client = new Dropbox.Client({
    key: DROPBOX_APP_KEY
});

//進行驗證
client.authenticate({
    interactive: false
}, function (error) {
    if (error) {
        alert('Authentication error:' + error);
    }
});

if (client.isAuthenticated()) {
    //通過驗證執行的內容
}

var datastoreManager = client.getDatastoreManager();
datastoreManager.openDefaultDatastore(function (error, datastore) {
    if (error) {
        alert('Error opening default datastore: ' + error);
    }

    var taskTable = datastore.getTable('urlList');
    // Now you have a datastore. The next few examples can be included here.


});
