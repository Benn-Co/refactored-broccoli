
var api_server_url = localStorage.getItem("api_server_url");

$("#create_account").click(function(){
    signup_button();    
});
$("#signup-name").keypress(function (e){
    if(e.keyCode == 13){
        signup_button();
    }
});
$("#signup-email").keypress(function (e){
    if(e.keyCode == 13){
        signup_button();
    }
});
$("#signup-password").keypress(function (e){
    if(e.keyCode == 13){
        signup_button();
    }
});
function signup_button() {
    var User_name_format = /^[A-Za-z0-9' ']+$/;
    var email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var signup_username_details = false;
    var signup_email_details = false;
    var signup_password_details = false;

    var signup_username = $("#signup-name").val();
    if (signup_username != "" && signup_username != null) {
        if (User_name_format.test(signup_username)) {
            signup_username_details = true;
            var signup_email = $("#signup-email").val();
            if (signup_email != "" && signup_email != "name@example.com" && signup_email != null) {
                if (email_format.test(signup_email)) {
                    signup_email_details = true;
                    var signup_password = $("#signup-password").val();
                    if (signup_password != "" && signup_password != null) {
                        if (signup_password.length >= 8) {
                            signup_password_details = true;
                            signup_user(signup_username,signup_email,signup_password);
                        } else {
                            signup_password_details = false;
                            mysnackbar("Password should be atleast 8 characters");
                        }
                    } else {
                        signup_password_details = false;
                        mysnackbar("Password should be provided");
                    }            
                } else {
                    signup_email_details = false;
                    mysnackbar("Enter a valid email address, e.g name@example.com");
                }
            } else {
                signup_email_details = false;
                mysnackbar("Email address should be provided");
            }            
        } else {
            signup_username_details = false;
            mysnackbar("Enter a valid username, e.g John Doe, John etc");
        }
    } else {
        signup_username_details = false;
        mysnackbar("Username should be provided");
    }
}
function signup_user(signup_username,signup_email,signup_password) {
    mysnackbar("Creating your account...");
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { signup_user: 12, signup_username: signup_username, signup_email:signup_email, signup_password:signup_password },
        processData: true,
        url: api_server_url + '/cordova/signup_user.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {
                    mysnackbar("Welcome " + response.username);
                    username = response.username;
                    var role = response.role;
                    var email = response.email;
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    localStorage.setItem("email", email);
                    var account_balance = response.account_balance;
                    $(".account_balance").attr("account_balance",account_balance);
                    $(".account_balance").html("$" + account_balance);
                    localStorage.setItem("account_balance", account_balance);

                    $("#signup_html").hide();
                    $("#index_html").show();
                    $("#pills-account-tab").removeClass("d-none");

                    /**let fik_path = "dashboard.html";
                    let file_name = window.location.pathname;
                    let text = file_name;
                    const myArray = text.split("/");
                    let newText = text.replace(myArray[myArray.length - 1], "");
                    let new_window_location_pathname = newText + fik_path;
                    let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
                    window.location.href= window_location_href; */

                    /**let file_name = window.location.pathname;
                    if (file_name.includes("light")) {
                        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "dashboard.html";
                    } else if (file_name.includes("dark")) {
                        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "dashboard.html";
                    } else {
                        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "dashboard.html";
                    } */
                    /**timestamp = response.timestamp;
                    latitude = response.latitude;
                    longitude = response.longitude;
                    location_name = response.location_name;
                    review = response.review;
                    rating = response.rating;
                    role = response.role;
                    email = response.email;

                    first = response.first_name;
                    last = response.last_name;
                    phone = response.phone_number; 

                    var location = JSON.parse(response.location_name);
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;

                    altitude = response.altitude;*/

                    //localStorage.setItem("username", username);
                    //localStorage.setItem("role", role);
                    //localStorage.setItem("email", email);
                    //main();
                }
                else if(response.message == "fail validate"){
                    if (response.message_username == "fail") {
                        mysnackbar("Username already exist!");
                    } else {
                        if (response.message_email == "fail") {
                            mysnackbar("Email already exist!");
                        } else {
                                               
                        }                        
                    }                    
                } else {
                    mysnackbar(response.signup_email + " or " + response.signup_password);
                }
            } catch(e) {
                mysnackbar('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
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
