
$("body").delegate(".mkt_option","click",function(event){
    event.preventDefault(); 
    var order_price = $(".order_price").val();
    var order_quantity = localStorage.getItem("account_balance");
    $(".account_balance").attr("account_balance",localStorage.getItem("account_balance"));
    if (order_quantity !== "") {
        $(".order_quantity").removeClass("is-invalid");
        $(".order_quantity").addClass("is-valid");
    } else {
        $(".order_quantity").removeClass("is-valid");
        $(".order_quantity").addClass("is-invalid");
    }
    if (order_price !== "") {
        $(".order_price").removeClass("is-invalid");
        $(".order_price").addClass("is-valid");
    } else {
        $(".order_price").removeClass("is-valid");
        $(".order_price").addClass("is-invalid");
    }  
    localStorage.setItem("order_quantity",order_quantity);
 
    localStorage.setItem("asset",$(this).attr('asset'));
    localStorage.setItem("aisa_options",$(this).attr('aisa_options'));

    if ($(this).attr('aisa_options') =="buy") {
        localStorage.setItem("price",localStorage.getItem("buy_price"));
    } else {
        localStorage.setItem("price",localStorage.getItem("sell_price"));
    }
    localStorage.setItem("price_open",$(this).attr('price_open'));
    localStorage.setItem("day_high",$(this).attr('day_high'));
    localStorage.setItem("day_low",$(this).attr('day_low'));
    $("#main_mkt").addClass("is-visible");
    $(".order_price").val(localStorage.getItem("price"));
    $(".order_quantity").val(localStorage.getItem("order_quantity"));

    rebro_Aisha(localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
});
$("body").delegate(".order_book_mkt","click",function(event){
    event.preventDefault();
    var order_price = $(".order_price").val();
    var order_quantity = $(".account_balance").attr('account_balance');//$(".order_quantity").val();
    //alert($(".account_balance").attr('account_balance'));
    if (order_quantity !== "") {
        $(".order_quantity").removeClass("is-invalid");
        $(".order_quantity").addClass("is-valid");
    } else {
        $(".order_quantity").removeClass("is-valid");
        $(".order_quantity").addClass("is-invalid");
    }
    if (order_price !== "") {
        $(".order_price").removeClass("is-invalid");
        $(".order_price").addClass("is-valid");
    } else {
        $(".order_price").removeClass("is-valid");
        $(".order_price").addClass("is-invalid");
    }  
    localStorage.setItem("order_quantity",order_quantity);
       
    localStorage.setItem("price",$(this).attr('order_book_price'));
    if ($(this).attr('order_book_side') =="Buy") {
        localStorage.setItem("aisa_options","buy");
    } else {
        localStorage.setItem("aisa_options","sell");
    }
    $(".order_price").val(localStorage.getItem("price"));
    rebro_Aisha(localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
});
$("body").delegate(".currency_option","click",function(event){
    event.preventDefault();
    $(".select_currency").html($(this).attr('currency_name'));
    $(".select_country").html($(this).attr('country_name'));  
});
$("body").delegate(".country_option","click",function(event){
    event.preventDefault();
    $(".select_country").html($(this).attr('country_name')); 
    $(".select_currency").html($(this).attr('ccode'));
});
$(".query_symbols").hover(function(){
    $(".skillsleft").show();
    $(".langsright").show();
  },
  function(){
    $(".skillsleft").hide();
    $(".langsright").hide();
});
$("body").delegate(".gift_send","click",function(event){
    event.preventDefault();    
    localStorage.setItem("gift_email",$(".gift_email").val());
    send_gift_email(localStorage.getItem("gift_email"),localStorage.getItem("username"));
});

$("body").delegate(".get_asset","click",function(event){
    event.preventDefault();
    localStorage.setItem("asset",$(this).attr('asset'));
    $("#main_mkt").addClass("is-visible");
    $(".mkt_option").attr("asset",localStorage.getItem("asset"));  
    bybit_mkt('Order Book',localStorage.getItem("asset"),'');
});
$("body").delegate(".refresh_interval","click",function(event){
    event.preventDefault();
    $(".refresh_").html($(this).html()); 
    localStorage.setItem("interval",$(this).attr('interval'));
 
});
var local_asset = "";
var local_asset_time_min = '';

function Order_Book() {
    var local_asset_time = new Date();
    if (local_asset != localStorage.getItem("asset") || local_asset_time.getSeconds() <= 5 ) {
        local_asset = localStorage.getItem("asset");
        bybit_mkt('Query Kline',localStorage.getItem("asset"),'');
    } else {
        bybit_mkt('Order Book',localStorage.getItem("asset"),'');
    }
    setTimeout(Order_Book, 3000);
}
function aisa(asset,aisa_options,price,price_open,day_high,day_low) {
    //alert(price);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: '{ "price": "' + price + '", "price_open": "' + price_open + '","day_high": "' + day_high + '" ,"day_low": "' + day_low + '", "options":"' + aisa_options + '", "asset":"' + asset + '"}',
        processData: true,
        url: 'http://192.168.8.105:8080/rebro/Aisha',
        success: function searchSuccess(response) {
            try {
                //mysnackbar(response.options);
                $(".rerrt").html(response.options);
            } catch (error) {
                mysnackbar(error);
            }
        },
        error: function searchError(xhr, err) {
            $(".rerrt").html('Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '');
            //$(".rerrt").html('{ "price": "' + price + '", "price_open": "' + price_open + '","day_high": "' + day_high + '" ,"day_low": "' + day_low + '", "options":"' + aisa_options + '", "asset":"' + asset + '"}');
 
            //mysnackbar('Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '');
        }
    });    
}
var rebro_Aisha_url = window.location.hostname;//api_server_url;
var Aisha_url = 'http://' + rebro_Aisha_url + ':8080/rebro/Aisha';
function rebro_Aisha(asset,aisa_options,price,price_open,day_high,day_low) {
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: '{ "price": "' + price + '", "price_open": "' + price_open + '","day_high": "' + day_high + '" ,"day_low": "' + day_low + '", "options":"' + aisa_options + '", "asset":"' + asset + '"}',
        processData: true,
        url: Aisha_url,
        success: function searchSuccess(response) { 
            try {
                mysnackbar(response.options);
            } catch (error) {
                mysnackbar(error);
            }
        },
        error: function searchError(xhr, err) {
          mysnackbar(" Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });   
}
function send_gift_email(gift_email,username) {
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { gift_email: gift_email, username: username},
        processData: true,
        url: api_server_url + '/cordova/send_gift_email.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {
                    mysnackbar(response.validate_message);

                    //$("#code_email").html(forgot_login_email);
                    /**if (response.validate_message == 'Your mail has been sent successfully.') {
                        //$("#forgot").removeClass("active");
                        //$("#regis").removeClass("active");
                        //$("#login").removeClass("active");
                        //$("#reset_code").addClass("active");
                        localStorage.setItem("forgot_login_email", forgot_login_email);
                        mysnackbar(response.validate_message);

                        let fik_path = "code-reset.html";
                        let file_name = window.location.pathname;
                        let text = file_name;
                        const myArray = text.split("/");
                        let newText = text.replace(myArray[myArray.length - 1], "");
                        let new_window_location_pathname = newText + fik_path;
                        let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
                        window.location.href= window_location_href;

                        /**var file_name = window.location.pathname;
                        

                    } else {
                        mysnackbar(response.validate_message);
                    } */                    

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
bybit_mkt('Query Symbol','','');
function bybit_mkt(crypto,asset,aisa_options) {
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { crypto:crypto, asset: asset, aisa_options: aisa_options},
        processData: true,
        url: api_server_url + '/cordova/coinbase_mkt.php',
        success: function searchSuccess(response) {
            try {
                if (response.ret_msg == "OK") {
                    if (crypto == 'Query Symbol') {
                        var results = response.result;
                        for (let i = 0; i < results.length; i++) {
                            if (i < 1) {
                                localStorage.setItem("asset",results[i].name);
                                $(".mkt_option").attr("asset",localStorage.getItem("asset"));  
                            }                            
                            var query_c_symbols = '<li id="' + results[i].name + '" class="list-group-item d-flex justify-content-between align-items-center get_asset" asset="' + results[i].name + '">' +
                            '<span class="text-primary">' + results[i].name + '</span>' +
                            '<span class="text-info">' + results[i].status + '</span>' +
                            '<span class="text-warning">' + results[i].base_currency + '</span>' +
                            '<span class="text-success">' + results[i].quote_currency + '</span>' +
                            '<span class="badge bg-primary rounded-pill">' + results[i].price_scale + '</span>' +
                            '<span class="badge bg-soft-primary rounded-pill">' + results[i].taker_fee + '</span>' +
                            '<span class="badge bg-soft-danger rounded-pill">' + results[i].maker_fee + '</span>' +
                            '</li>';
                            $(".query_symbols").append(query_c_symbols);

                            var query_symbols_skills = '<a href="#' + results[i].name + '" class="btn btn-soft-warning get_asset" asset="' + results[i].name + '">' + results[i].name + '</a>';
                            $(".query_symbols_skills").append(query_symbols_skills);
                        }
                        Order_Book();
                    } else if (crypto == 'Order Book') {
                        var results = response.result;
                        $(".crypto_mkt_buy").html('');
                        $(".crypto_mkt_sell").html('');
                        var response_time_now = response.time_now;
                        response_time_now = response_time_now.substr(0,14);
                        response_time_now = response_time_now.replace(".", "");                        
                        var t_time = new Date(Number(response_time_now));
                        var trade_time = "" + t_time.getHours() + ":" + t_time.getMinutes() + ":" + t_time.getSeconds() + "";
                        let buy_price_i = 0;
                        let sell_price_i = 0;
                        for (let i = 0; i < results.length; i++) {                           

                            if (results[i].side == 'Buy') {
                                var order_book = '<li class="list-group-item d-flex justify-content-between align-items-center order_book_mkt" order_book_side="' + results[i].side + '" order_book_price="' + results[i].price + '">'+
                                '<span class="text-primary">' + results[i].symbol + '</span>'+
                                '<span class="text-info">' + results[i].price + '</span>'+
                                '<span class="text-warning">' + results[i].size + '</span>'+
                                '<span class="text-success"><small>' + trade_time + '</small></span>'+
                                '</li>';
                                if (buy_price_i < 1) {
                                    localStorage.setItem("buy_price",results[i].price);
                                }
                                buy_price_i++;
                                $(".crypto_mkt_buy").append(order_book);
                            } else {
                                var order_book = '<li class="list-group-item d-flex justify-content-between align-items-center order_book_mkt" order_book_side="' + results[i].side + '" order_book_price="' + results[i].price + '">'+
                                '<span class="text-primary">' + results[i].symbol + '</span>'+
                                '<span class="text-info">' + results[i].price + '</span>'+
                                '<span class="text-warning">' + results[i].size + '</span>'+
                                '<span class="text-danger"><small>' + trade_time + '</small></span>'+
                                '</li>';
                                if (sell_price_i < 1) {
                                    localStorage.setItem("sell_price",results[i].price);
                                }
                                sell_price_i++;
                                $(".crypto_mkt_sell").append(order_book);
                            }
                        }
                    } else if (crypto == 'Query Kline') {
                        var results = response.result;
                        var response_time_now = response.time_now;
                        response_time_now = response_time_now.substr(0,14);
                        response_time_now = response_time_now.replace(".", "");                        
                        var t_time = new Date(Number(response_time_now));
                        var trade_time = "" + t_time.getHours() + ":" + t_time.getMinutes() + ":" + t_time.getSeconds() + "";
                        for (let i = 0; i < results.length; i++) {                            
                            let text1 = "" + results[i].open_time + "";
                            let text2 = "000";
                            let open_response_time_now = text1.concat("",text2);
                            var open_t_time = new Date(Number(open_response_time_now));
                            var open_trade_time = "" + open_t_time.getHours() + ":" + open_t_time.getMinutes() + ":" + open_t_time.getSeconds() + "";
                            var asset_info = '<ul id="" class="list-group">'+
                            '<li class="list-group-item d-flex justify-content-between align-items-center bg-soft-secondary" style="height: 10px">'+
                            '<span class="text-primary position-relative" title="Symbol">' + results[i].symbol + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-primary">Symbol</span></span>'+                            
                            '<span class="text-info d-none d-xl-block position-relative" title="Interval">' + results[i].interval + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-info">Interval</span></span>'+
                            '<span class="text-info d-none d-xl-block position-relative" title="Open time">' + open_trade_time + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-info">Open time</span></span>'+
                            '<span class="text-primary position-relative" title="' + results[i].interval + 'Min Open">' + results[i].open + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-primary">' + results[i].interval + 'Min Open</span></span>'+
                            '<span class="text-success position-relative" title="' + results[i].interval + 'Min High">' + results[i].high + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-success">' + results[i].interval + 'Min High</span></span>'+
                            '<span class="text-danger position-relative" title="' + results[i].interval + 'Min Low">' + results[i].low + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-danger">' + results[i].interval + 'Min Low</span></span>'+
                            '<span class="text-warning position-relative" title="' + results[i].interval + 'Min Clase">' + results[i].close + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-warning">' + results[i].interval + 'Min Close</span></span>'+
                            '<span class="text-info d-none d-xl-block position-relative" title="Volume">' + results[i].volume + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-info">Volume</span></span>'+
                            '<span class="text-info d-none d-xl-block position-relative" title="Turnover">' + results[i].turnover + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-info">Turnover</span></span>'+
                            '<span class="text-info d-none d-xl-block position-relative" title="Time">' + trade_time + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-info">Time</span></span>'+
                            '</li>'+
                            '</ul>';
                            localStorage.setItem("price_open",results[i].open);
                            $(".mkt_option").attr("price_open",localStorage.getItem("price_open"));
                            localStorage.setItem("day_high",results[i].high);
                            $(".mkt_option").attr("day_high",localStorage.getItem("day_high"));
                            localStorage.setItem("day_low",results[i].low);
                            $(".mkt_option").attr("day_low",localStorage.getItem("day_low"));
                            $(".asset_info").html('');

                            $(".asset_info").append(asset_info);
                        }                        
                    }
                    /**var order_price = $(".order_price").val();
                    var order_quantity = localStorage.getItem("account_balance");
                    $(".account_balance").attr("account_balance",localStorage.getItem("account_balance"));
                    if (order_quantity !== "") {
                        $(".order_quantity").removeClass("is-invalid");
                        $(".order_quantity").addClass("is-valid");
                        $(".order_quantity").val(order_quantity);
                    } else {
                        $(".order_quantity").removeClass("is-valid");
                        $(".order_quantity").addClass("is-invalid");
                    }
                    if (order_price !== "") {
                        $(".order_price").removeClass("is-invalid");
                        $(".order_price").addClass("is-valid");
                        $(".order_quantity").val(order_quantity);
                    } else {
                        $(".order_price").removeClass("is-valid");
                        $(".order_price").addClass("is-invalid");
                    }  
                    localStorage.setItem("order_quantity",order_quantity); */
                } else{
                    $(".asset_info").html('');
                    //mysnackbar(response.ret_msg);
                }
            } catch(e) {
                //mysnackbar('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
         // mysnackbar("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}
$("#pills-signin-tab").click(function(){
    $("#index_html").hide();
    $("#signin_html").show();
});
$("#pills-signup-tab").click(function(){
    $("#index_html").hide();
    $("#signup_html").show();
});



function mysnackbar(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");  
    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = text;  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
