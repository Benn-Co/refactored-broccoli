var api_server_url = localStorage.getItem("api_server_url");



$("#new-pass").keypress(function (e){
    if(e.keyCode == 13){
        new_password_button();
    }
});
$("#confirmnew-pass").keypress(function (e){
    if(e.keyCode == 13){
        new_password_button();
    }
}); 
function new_password_button() {
    var create_new_password = $("#new-pass").val();
    var confirm_new_password = $("#confirmnew-pass").val();

    if (create_new_password != "" && create_new_password != null) {
        if (create_new_password.length >= 8) {
            //$("#create_new_password_help").html(create_new_password.length);
            //$("#create_new_password").removeClass("is-invalid");
            //$("#create_new_password").addClass("is-valid");
            if (confirm_new_password != "" && confirm_new_password != null) {
                if (confirm_new_password.length >= 8) {
                    if (create_new_password == confirm_new_password) {
                        //$("#confirm_new_password_help").html(confirm_new_password.length);
                        //$("#confirm_new_password").removeClass("is-invalid");
                        //$("#confirm_new_password").addClass("is-valid");
                        create_new_user_password(localStorage.getItem("forgot_login_email"),localStorage.getItem("code"),create_new_password);
                    } else {
                        mysnackbar("Password do not match");
                        //$("#confirm_new_password").removeClass("is-valid");
                        //$("#confirm_new_password").addClass("is-invalid");
                    }
                } else {
                    mysnackbar("Password should be atleast 8 characters");
                    //$("#confirm_new_password").removeClass("is-valid");
                    //$("#confirm_new_password").addClass("is-invalid");
                }        
            } else {
                mysnackbar("Confirm new password");
                //$("#confirm_new_password").removeClass("is-valid");
                //$("#confirm_new_password").addClass("is-invalid");
            }
        } else {
            mysnackbar("Password should be atleast 8 characters");
            //$("#create_new_password").removeClass("is-valid");
            //$("#create_new_password").addClass("is-invalid");
        }        
    } else {
        mysnackbar("Create new password");
        //$("#create_new_password").removeClass("is-valid");
        //$("#create_new_password").addClass("is-invalid");
    }

    
}
$("#create_password").click(function(){
    new_password_button();
});
function create_new_user_password(forgot_login_email,code,new_password) {
   // $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { create_new_password: 12, forgot_login_email: forgot_login_email, code:code, new_password:new_password},
        processData: true,
        url: api_server_url + '/cordova/create_new_password.php',
        success: function searchSuccess(response) {
            //$('#app-cover-spin').hide(0);
            try {
                if (response.message == "success") {
                    //$("#new_password_button_help").html(forgot_login_email);//window.location.port + window.location.pathname + "

                    //$("#new_password").removeClass("active");
                    //$("#login").addClass("active");

                    mysnackbar(response.validate_message);
                    
                    let fik_path = "signin.html";
                    let file_name = window.location.pathname;
                    let text = file_name;
                    const myArray = text.split("/");
                    let newText = text.replace(myArray[myArray.length - 1], "");
                    let new_window_location_pathname = newText + fik_path;
                    let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
                    window.location.href= window_location_href;

                    /**var file_name = window.location.pathname;
                    //if (file_name.includes("pings")) {
                        if (file_name.includes("light")) {
                            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "signin.html" + "";
                        } else if (file_name.includes("dark")) {
                            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "signin.html" + "";
                        } else {
                            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "signin.html" + "";
                        }
                    //} */ 

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