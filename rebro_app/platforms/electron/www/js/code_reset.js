var api_server_url = localStorage.getItem("api_server_url");


$("#resetpassword-code").keypress(function (e){
    if(e.keyCode == 13){
        code_button();
    }
});
function code_button() {
    var forgot_login_email = localStorage.getItem("forgot_login_email");
    var forgot_code_email = $("#resetpassword-code").val();
    if (forgot_code_email != "" && forgot_code_email != null) {
        mysnackbar(forgot_code_email);
        //$("#forgot_code_email").removeClass("is-invalid");
        //$("#forgot_code_email").addClass("is-valid");
        
        code_verification(forgot_code_email,forgot_login_email);
        //alert(Number.isInteger(forgot_code_email) + forgot_code_email);
        /**if (Number.isInteger(forgot_code_email)) {
            $("#forgot_code_email_help").html(forgot_code_email);
            $("#forgot_code_email").removeClass("is-invalid");
            $("#forgot_code_email").addClass("is-valid");
            
            code_verification(forgot_code_email);
        } else {
            $("#forgot_code_email_help").html("Enter a valid code");
            $("#forgot_code_email").removeClass("is-valid");
            $("#forgot_code_email").addClass("is-invalid");
        } */
    } else {
        mysnackbar("Enter the code sent to " + forgot_login_email + "");
        //$("#forgot_code_email").removeClass("is-valid");
        //$("#forgot_code_email").addClass("is-invalid");
    }
}
$("#code_button").click(function(){
    code_button();
});
function code_verification(code, email) {
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { code_verification: 12, code: code, email:email},
        processData: true,
        url: api_server_url + '/cordova/code_verification.php',
        success: function searchSuccess(response) {
            //$('#app-cover-spin').hide(0);
            try {
                if (response.message == "success") {
                    //$("#forgot_code_email_help").html(code);

                    //$("#reset_code").removeClass("active");
                    //$("#forgot").removeClass("active");
                    //$("#regis").removeClass("active");
                    //$("#login").removeClass("active");
                    //$("#new_password").addClass("active");
                    localStorage.setItem("code", code);
                    mysnackbar(response.validate_message);
                    
                    let fik_path = "create-password.html";
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
                            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "create-password.html" + "";
                        } else if (file_name.includes("dark")) {
                            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "create-password.html" + "";
                        } else {
                            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "create-password.html" + "";
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

$("#resend_code").click(function(){
    forgot_login_password(localStorage.getItem("forgot_login_email"));
});

function forgot_login_password(forgot_login_email) {
    //$('#app-cover-spin').show(0);
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
                        localStorage.setItem("forgot_login_email", forgot_login_email);
                        mysnackbar(response.validate_message);
                        /**var file_name = window.location.pathname;
                        //if (file_name.includes("pings")) {
                            if (file_name.includes("light")) {
                                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + "/light/" + "code-reset.html" + "";
                            } else if (file_name.includes("dark")) {
                                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + "/dark/" + "code-reset.html" + "";
                            } else {
                                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + "/" + "code-reset.html" + "";
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