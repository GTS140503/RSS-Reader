<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WEB RSS Reader</title>

    <link rel="stylesheet" href="asset/css/bootstrap.css"/>
    <link rel="stylesheet" href="asset/css/bootstrap-theme.css"/>
    <link rel="stylesheet" href="asset/css/custom.css"/>
    <script src="asset/js/addtitle.js"></script>
    <script src="asset/js/showContent.js"></script>
</head>
<body>
    <header>
        <nav class="navbar navbar-default">
            <a href="#" class="navbar-brand">WEB RSS Reader</a>
            <form class="navbar-form navbar-right" action="">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username"/>
                    <input type="password" class="form-control" placeholder="Password"/>
                    <button class="btn btn-default">Log In</button>
                </div>
            </form>
        </nav>
    </header>
    <aside id="rsslist" class="list-group">
        <div class="title">
            <span>標題</span>
            <button class="btn btn-primary" onclick="openPopup()">新增</button>
        </div>
    </aside>
    <section id="content">

    </section>
    <footer>
    </footer>
    <nav id="popup" class="navbar navbar-default">
        <form action="" onsubmit="return additem()">
            <div id="title">
                <input type="text" id="titleinput" class="form-control" placeholder="Title input">
                <input type="submit" id="submit" class="btn btn-primary" onclick="return validateForm()">
            </div>
                <input type="text" id="urlinput" class="form-control" placeholder="Url input">
        </form>
            <p id="nullerror">標題或連結沒有輸入</p>

    </nav>
    <div id="pageOverlay" onclick="closePopup()"></div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

</body>
</html>
