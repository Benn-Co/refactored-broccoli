
var api_server_url = localStorage.getItem("api_server_url");


var forgot_login_email = "";
$("#resetpassword-email").keypress(function (e){
    if(e.keyCode == 13){
        forgot_login_button();
    }
});
function forgot_login_button() {
    var forgot_email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    forgot_login_email = $("#resetpassword-email").val();
    if (forgot_login_email != "" && forgot_login_email != "name@example.com" && forgot_login_email != null) {
        if (forgot_email_format.test(forgot_login_email)) {
            //$("#forgot_login_email_help").html(forgot_login_email);
            //$("#forgot_login_email").removeClass("is-invalid");
            //$("#forgot_login_email").addClass("is-valid");

            forgot_login_password(forgot_login_email);
        } else {
            mysnackbar("Enter a valid email address, e.g name@example.com");
            //$("#forgot_login_email").removeClass("is-valid");
            //$("#forgot_login_email").addClass("is-invalid");
        }
    } else {
        mysnackbar("Email address should be provided");
        //$("#forgot_login_email").removeClass("is-valid");
        //$("#forgot_login_email").addClass("is-invalid");
    }
}
$("#forgot_login_button").click(function(){
    forgot_login_button();
});
function forgot_login_password(forgot_login_email) {
    //$('#app-cover-spin').show(0);
    alert();

    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { forgot_login_password: 12, forgot_login_email: forgot_login_email},
        processData: true,
        url: api_server_url + '/cordova/forgot_login_password.php',
        success: function searchSuccess(response) {
            //$('#app-cover-spin').hide(0);
            try {
                if (response.message == "success") {
                    //$("#code_email").html(forgot_login_email);
                    if (response.validate_message == 'Your mail has been sent successfully.') {
                        //$("#forgot").removeClass("active");
                        //$("#regis").removeClass("active");
                        //$("#login").removeClass("active");
                        //$("#reset_code").addClass("active");
                        //alert();

                        localStorage.setItem("forgot_login_email", forgot_login_email);
                        mysnackbar(response.validate_message);
                        $("#forgot_password_html").hide();
                        $("#code_reset_html").show();
                        //alert();
                        /**let fik_path = "code-reset.html";
                        let file_name = window.location.pathname;
                        let text = file_name;
                        const myArray = text.split("/");
                        let newText = text.replace(myArray[myArray.length - 1], "");
                        let new_window_location_pathname = newText + fik_path;
                        let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
                        window.location.href= window_location_href; */

                        /**var file_name = window.location.pathname;
                        //if (file_name.includes("pings")) {
                            if (file_name.includes("light")) {
                                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "code-reset.html" + "";
                            } else if (file_name.includes("dark")) {
                                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "code-reset.html" + "";
                            } else {
                                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "code-reset.html" + "";
                            }
                        //} */

                    } else {
                        mysnackbar(response.validate_message);
                    }                    

                }
                else if(response.message == "fail validate"){                    
                    mysnackbar(response.validate_message);
                } else {
                    mysnackbar(response.signup_email + " or " + response.signup_password);
                }
            } catch(e) {
                mysnackbar('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
          //$('#app-cover-spin').hide(0);
          mysnackbar("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
    

}

function mysnackbar(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");  
    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = text;  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}