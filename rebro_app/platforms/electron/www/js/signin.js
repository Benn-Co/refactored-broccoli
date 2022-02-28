var api_server_url = 'https://oramla.com';
//var api_server_url = 'http://localhost';
localStorage.setItem("api_server_url", api_server_url);

var api_server_url = localStorage.getItem("api_server_url");

function login_button() {
    var User_name_format = /^[A-Za-z0-9' ']+$/;

   var email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   var login_email_details = false;
   var login_password_details = false;

   var login_email = $("#signin-email").val();
   var login_details_email = '';
   var login_details_username = '';

   if (login_email != "" && login_email != "name@example.com" && login_email != null) {
    if (email_format.test(login_email)) {
        login_email_details = true;
        login_details_email = login_email;
        //$("#login_email_help").html(login_email);
        //$("#login_email").removeClass("is-invalid");
        //$("#login_email").addClass("is-valid");
    } else if (User_name_format.test(login_email)){
        login_email_details = true;
        login_details_username = login_email;
        //$("#login_email_help").html(login_email);
        //$("#login_email").removeClass("is-invalid");
        //$("#login_email").addClass("is-valid");
    } else {
        login_email_details = false;
        mysnackbar("Enter a valid email address, e.g name@example.com or username");
        //$("#login_email").removeClass("is-valid");
        //$("#login_email").addClass("is-invalid");
    }
   } else {
       login_email_details = false;
       mysnackbar("Email address should be provided");
       //$("#login_email").removeClass("is-valid");
       //$("#login_email").addClass("is-invalid");
   }

   var login_password = $("#signin-password").val();
   if (login_password != "" && login_password != null) {
    //$("#login_password").removeClass("is-invalid");
    //$("#login_password").addClass("is-valid");
    if (login_password.length >= 8) {
        login_password_details = true;
        //$("#login_password_help").html(login_password.length);
        //$("#login_password").removeClass("is-invalid");
        //$("#login_password").addClass("is-valid");
    } else {
        login_password_details = false;
        mysnackbar("Password should be atleast 8 characters");
        //$("#login_password").removeClass("is-valid");
        //$("#login_password").addClass("is-invalid");
    }
   } else {
       login_password_details = false;
       mysnackbar("Password should be provided");
       //$("#login_password").removeClass("is-valid");
       //$("#login_password").addClass("is-invalid");
   }

   if (login_email_details == true && login_password_details == true) {
    mysnackbar("Loading your account...");    
    login_user(login_email,login_password,login_details_username,login_details_email);
   } else {
    //mysnackbar("Correct the error(s) highligted");       
   }
}
$("#login_button").click(function(){  
    login_button();    
});
$("signin-email").keypress(function (e){
    if(e.keyCode == 13){
        signup_button();
    }
});
$("#signin-password").keypress(function (e){
    if(e.keyCode == 13){
        signup_button();
    }
});
function login_user(login_email,login_password,login_details_username,login_details_email) {
    //$('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { login_user: 12, login_email: login_email, login_password:login_password, login_details_username:login_details_username, login_details_email:login_details_email },
        processData: true,
        url: api_server_url + '/cordova/login_user.php',
        success: function searchSuccess(response) {
            //$('#app-cover-spin').hide(0);
            //$("#login_button_help").html(response.message);
            try {
               // response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    //mysnackbar("Welcome " + response.username);
                    username = response.username;
                    var role = response.role;
                    var email = response.email;
                    var user_pass = response.password1;

                    var phone_number = response.phone_number;
                    var username_pic = response.username_pic;

                    //alert(response.account_balance);
                    //var account_balance = response.account_balance;
                    //$(".account_balance").attr("account_balance",account_balance);
                    //$(".account_balance").html("$" + account_balance);
                    //localStorage.setItem("account_balance", account_balance);

                    //first = response.first_name;
                    //last = response.last_name;
                    //phone = response.phone_number;
                    
                    var location = JSON.parse(response.location_name);
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;

                    var user_location = country + ", "+ city;

                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    localStorage.setItem("email", email);
                    localStorage.setItem("user_pass", user_pass);
                    
                    //localStorage.setItem("ccode", '$');
                    //localStorage.setItem("exrate", 1);

                    const myJSON = '{"name":"John", "age":30, "cars":["Ford", "BMW", "Fiat"]}';
                    const myObj = JSON.parse(myJSON);
                    var Ford = myObj.cars[0];

                    var usd_account_balance = response.account_balance;
                    var char = '"';
                    let balanceData = usd_account_balance.replace(/&quot;/g,char);
                    var balanceDataObj  = JSON.parse(balanceData);
                    var initial_balance = balanceDataObj[0].initial_balance;
                    var account_balance_Data = balanceDataObj[0].account_balance;
                    var account_balance_symbol = balanceDataObj[0].account_balance_symbol;
                    var price = balanceDataObj[0].price;

                    localStorage.setItem("usd_account_balance", account_balance_Data);
                    localStorage.setItem("account_balance_Data", account_balance_Data);

                    for (let index = 0; index < balanceDataObj.length; index++) {
                        var asset_balance_Data = balanceDataObj[index].account_balance;
                        var asset_balance_symbol = balanceDataObj[index].account_balance_symbol;
                        var coin_usd_value = balanceDataObj[index].coin_usd_value;
                        var crypto_asset_balance = "" + asset_balance_symbol + "_balance";
                        localStorage.setItem("" + crypto_asset_balance + "", asset_balance_Data);
                        localStorage.setItem("" + asset_balance_symbol + "_usd_value",coin_usd_value);//USD
                    }

                    if (balanceDataObj.length > 1) {
                        localStorage.setItem("initial_balance", initial_balance);
                    } else {
                        localStorage.setItem("initial_balance", localStorage.getItem("usd_account_balance"));
                    }
 
                    var account_balance = Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));
                    if (account_balance.toFixed(2) < 1) {
                        account_balance = account_balance.toFixed(4);
                    } else {
                        account_balance = account_balance.toFixed(2);                            
                    }
                    
                    $(".account_balance").attr("account_balance",account_balance);
                    localStorage.setItem("account_balance_potential_usd_account_balance",account_balance);// Set account_balance_potential_usd_account_balance

                    $(".account_balance").html(localStorage.getItem("ccode") + " " + account_balance);

                    localStorage.setItem("account_balance", account_balance);
                    localStorage.setItem("account_balance_potential_usd_account_balance",account_balance);// Set account_balance_potential_usd_account_balance
                    //localStorage.setItem("actual_account_balance", account_balance);

                    localStorage.setItem("username_pic", username_pic);
                    localStorage.setItem("user_location", user_location);
                    localStorage.setItem("user_email", email);
                    localStorage.setItem("user_phone", phone_number);
                    $(".username").html(username);
                    $(".username_seen").html("last seen " + new Date());
                    $(".username_pic").html('<img class="avatar-img" src="' + localStorage.getItem("username_pic") + '" alt="#">');
                    $(".user_location").html(localStorage.getItem("user_location"));
                    $(".user_email").html(localStorage.getItem("user_email"));
                    $(".user_phone").html(localStorage.getItem("user_phone"));
 
                    $("#signin_html").hide();
                    $("#signup_html").hide();
                    $("#forgot_password_html").hide();
                    $("#code_reset_html").hide();
                    $("#create_password_html").hide();

                    $("#index_html").show();
                    $("#pills-account-tab").addClass("d-none");
                    onDeviceReady();
                    /**let fik_path = "dashboard.html";
                    let file_name = window.location.pathname;
                    let text = file_name;
                    const myArray = text.split("/");
                    let newText = text.replace(myArray[myArray.length - 1], "");
                    let new_window_location_pathname = newText + fik_path;
                    let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
                    window.location.href= window_location_href; */

                    /**if (file_name.includes("light")) {
                        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + fik_path;
                    } else if (file_name.includes("dark")) {
                        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + fik_path;
                    } else {
                        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + fik_path;
                    } */

                    //main();
                } else {
                   mysnackbar(response.login_email + " or " + response.login_password);
                }
            } catch(e) {
                //console.error('JSON parsing error');
                mysnackbar('JSON parsing error');

            }
          
        },
        error: function searchError(xhr, err) {
          //$('#app-cover-spin').hide(0);
          mysnackbar("Error on ajax call: " + api_server_url + '/cordova/login_user.php');
          //main();

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
