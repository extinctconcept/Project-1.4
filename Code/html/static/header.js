

var headerBuilder = {
    initialize : function()
    {
        let in_html = "";
        
        in_html += "<ul>";
        in_html += '<li><a href="index.html">Home</a></li>';
        in_html += '<li><a href="search.html">Search Games</a></li>';
        in_html += '<li><a href="#" class="active">Account</a>';
        in_html += '<ul class="dropdown">';

        let key = document.cookie.match(new RegExp('key=[0-9]+'));
        console.log(document.cookie);
        if(!key)
        {
            in_html += '<li><a href="login.html">Login</a></li>';
            in_html += '<li><a href="register.html">Register</a></li>';
        }
        else
        {
            in_html += '<li><a href="profile.html">Profile</a></li>';
            in_html += '<li><a href="logout.html">Logout</a></li>';
        }
        in_html+= '</ul></li></ul>';
        document.getElementsByTagName("header")[0].innerHTML = in_html;
    }
}