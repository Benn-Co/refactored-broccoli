
$("body").delegate(".mkt_option","click",function(event){
    event.preventDefault(); 
    //var order_price = $(".order_price").val();
    //$(".account_balance").attr("account_balance",localStorage.getItem("account_balance")); 
    localStorage.setItem("asset",$(this).attr('asset'));
    localStorage.setItem("aisa_options",$(this).attr('aisa_options'));
    //But, before I can make a trade I have to buy bitcoins from the sell side at the lowest sell_price
    // I must have minimum balance in USD to buy some bitcoins.
    // BTCUSD rate would be the lowest sell_price to get 1 bitcoin
    // thus, 1 bitcoin = USD sell_price
    // if 1 bitcoin = USD sell_price, what about 0.0001 bitcoins
    // (0.0001/1)*sell_price = USD account balance
    // (bitcoin_amount * sell_price)/1 = account bitcoin balance
    // therefore, 
    //           let sell_price = 47403.5;
    //           let bitcoin_amount = 0.0001;
    //           let account_balance = USD 1000
    //           let account_balance_stake = USD 100
    //     if USD sell_price = 1 bitcoin,
    //       how many USD account_balance = ?, well it depends with the account_balance at stake,
    //                                         if (a) account_balance_stake is < than sell_price, 
    //                                                                       it will give you less bitcoins
    //                                         if (b) account_balance_stake is > than sell_price,
    //                                                                       it will give you less bitcoins
    //            if (a) account_balance_stake = USD 100   : < sell_price
    //                   (USD account_balance_stake/USD sell_price) * 1 bitcoin = BTC bitcoin_balance
    //
    //            if (b) account_balance_stake = USD 100000   : > sell_price
    //                  (USD account_balance_stake/USD sell_price) * 1 bitcoin = BTC bitcoin_balance

    account_mkt_balance(localStorage.getItem("aisa_options"));    
    
    localStorage.setItem("price_open",$(this).attr('price_open'));
    localStorage.setItem("day_high",$(this).attr('day_high'));
    localStorage.setItem("day_low",$(this).attr('day_low'));
    $("#main_mkt").addClass("is-visible");    
    var order_price = $(".order_price").val();
    if (order_price !== "") {
        $(".order_price").removeClass("is-invalid");
        $(".order_price").addClass("is-valid");
        var order_quantity = $(".order_quantity").val();
        if (order_quantity !== "") {
            $(".order_quantity").removeClass("is-invalid");
            $(".order_quantity").addClass("is-valid");

            rebro_Aisha(localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
        } else {
            $(".order_quantity").removeClass("is-valid");
            $(".order_quantity").addClass("is-invalid");
        }
    } else {
        $(".order_price").removeClass("is-valid");
        $(".order_price").addClass("is-invalid");
    }
});
$("body").delegate(".order_book_mkt","click",function(event){
    event.preventDefault();    
       
    if ($(this).attr('order_book_side') =="Buy") {
        localStorage.setItem("aisa_options","buy");
        localStorage.setItem("price",$(this).attr('order_book_price'));

    } else {
        localStorage.setItem("aisa_options","sell");
        localStorage.setItem("price",$(this).attr('order_book_price'));

    }
    ///////////////////////////////////////////////////
    if (localStorage.getItem("aisa_options") =="buy") {
        //localStorage.setItem("price",localStorage.getItem("buy_price"));
    } else {
        //localStorage.setItem("price",localStorage.getItem("sell_price"));
    }
    ////////////////////////////////////////////////////
    //$(".order_price").val(localStorage.getItem("price"));

    $(".order_price").val(localStorage.getItem("price"));
    account_mkt_balance(localStorage.getItem("aisa_options"));

    /**var order_price = $(".order_price").val();
    var order_quantity = $(".account_balance").attr('account_balance');      
    localStorage.setItem("order_quantity",order_quantity); */

    if (order_price !== "") {
        $(".order_price").removeClass("is-invalid");
        $(".order_price").addClass("is-valid");        
        if (order_quantity !== "") {
            $(".order_quantity").removeClass("is-invalid");
            $(".order_quantity").addClass("is-valid");

            rebro_Aisha(localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
        } else {
            $(".order_quantity").removeClass("is-valid");
            $(".order_quantity").addClass("is-invalid");
        }
    } else {
        $(".order_price").removeClass("is-valid");
        $(".order_price").addClass("is-invalid");
    }
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
                mysnackbar(response.options + " buy_price " + localStorage.getItem("buy_price") + " sell_price " + localStorage.getItem("sell_price"));
                //localStorage.setItem("aisa_options",response.options);//USD
                /**if (response.options =="buy") {
                    //If it's buying I would buy from the seller on the sell side at the lowest sell_price
                    var order_quantity = localStorage.getItem("account_balance");//USD
                    localStorage.setItem("order_quantity",order_quantity);//USD
            
                    let lowest_sell_price = localStorage.getItem("sell_price"); //USD
            
                    let account_balance_stake = localStorage.getItem("order_quantity"); //USD
                    let bitcoin_balance = (account_balance_stake/lowest_sell_price)*1; //BTC
                    //localStorage.setItem("bitcoin_balance",bitcoin_balance);//BTC
            
                    $(".bitcoin_balance").html(bitcoin_balance);
                    localStorage.setItem("price",lowest_sell_price);
                } else {
                    //If it's selling I would sell to the buyer on the buy side at the highest buy_price
                    var order_quantity = localStorage.getItem("bitcoin_balance");//BTC
                    localStorage.setItem("order_quantity",order_quantity);//BTC
            
                    let highest_buy_price = localStorage.getItem("buy_price");//USD
            
                    let bitcoin_balance_stake = localStorage.getItem("order_quantity"); //BTC
                    let account_balance = (bitcoin_balance_stake/1)*highest_buy_price; //USD
                    //localStorage.setItem("account_balance",account_balance);//USD
                    //localStorage.setItem("bitcoin_balance",bitcoin_balance);//BTC
                    //$(".bitcoin_balance").html(account_balance);
                    //$(".bitcoin_balance_usd").html(account_balance);

                    $(".bitcoin_balance").html(account_balance);
                    localStorage.setItem("price",highest_buy_price);
                    $(".bitcoin_balance_usd").html(account_balance);
            
                } */ 
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
                                    $(".bitcoin_balance_price").html("$" + results[i].price);
                                    localStorage.setItem("sell_price",results[i].price);
                                    localStorage.setItem("price",results[i].price);
                                    $(".order_price").val(localStorage.getItem("price"));
                                }
                                sell_price_i++;
                                $(".crypto_mkt_sell").append(order_book);
                            }                            
                        }
                        account_mkt_balance('');
                        /**var order_quantity = localStorage.getItem("account_balance");//USD
                        localStorage.setItem("order_quantity",order_quantity);//USD
                
                        let lowest_sell_price = localStorage.getItem("sell_price"); //USD
                
                        let account_balance_stake = localStorage.getItem("order_quantity"); //USD
                        let bitcoin_balance = (account_balance_stake/lowest_sell_price)*1; //BTC
                        localStorage.setItem("bitcoin_balance",bitcoin_balance);//BTC
                
                        $(".bitcoin_balance").html(bitcoin_balance);
                        localStorage.setItem("price",lowest_sell_price); */
                        //alert(localStorage.getItem("account_balance"));
                        //$(".account_balance").attr("account_balance",localStorage.getItem("account_balance"));
                        //$(".account_balance").html("$" + localStorage.getItem("account_balance"));

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
                            //rebro_Aisha(localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));

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
var bought_bitcoins = 0;
var sold_bitcoins = 0;
function account_mkt_balance(aisa_options) {
    //$(".order_quantity_progress").val(100);

    if (aisa_options =="buy") {
        //If it's buying I would buy from the seller on the sell side at the lowest sell_price
        var order_account_quantity_remain = localStorage.getItem("account_balance");//USD
        var order_account_quantity = localStorage.getItem("account_balance");//USD
        localStorage.setItem("order_account_quantity",order_account_quantity);//USD
        let lowest_sell_price = localStorage.getItem("sell_price"); //USD
        let account_balance_stake = localStorage.getItem("order_account_quantity"); //USD
        let bitcoin_balance = (account_balance_stake/lowest_sell_price)*1; //BTC
        localStorage.setItem("bitcoin_balance",bitcoin_balance);//BTC
        var account_remaider = order_account_quantity_remain - account_balance_stake;
        localStorage.setItem("account_balance",account_remaider);//USD

        $(".bitcoin_balance").html(bitcoin_balance);
        localStorage.setItem("price",lowest_sell_price);
        $(".order_price").val(localStorage.getItem("price"));
        $(".order_quantity").val(localStorage.getItem("order_account_quantity"));
        //localStorage.setItem("aisa_options","");
        bought_bitcoins = 1;
        //mysnackbar(localStorage.getItem("bitcoin_balance"));
    }
    if (aisa_options =="sell"){
        var order_bitcoin_quantity_remain = localStorage.getItem("bitcoin_balance");//USD
        var order_bitcoin_quantity = localStorage.getItem("bitcoin_balance");//BTC
        $(".bitcoin_balance").html(localStorage.getItem("bitcoin_balance"));
        localStorage.setItem("order_bitcoin_quantity",order_bitcoin_quantity);//BTC
        let highest_buy_price = localStorage.getItem("buy_price");//USD
        let bitcoin_balance_stake = localStorage.getItem("order_bitcoin_quantity"); //BTC
        let account_balance = (bitcoin_balance_stake/1)*highest_buy_price; //USD
        localStorage.setItem("account_balance",account_balance);//USD
        var bitcoin_remaider = order_bitcoin_quantity_remain - bitcoin_balance_stake;
        localStorage.setItem("bitcoin_balance",bitcoin_remaider);//BTC

        $(".account_balance").html(account_balance);
        localStorage.setItem("price",highest_buy_price);
        $(".order_price").val(localStorage.getItem("price"));
        $(".order_quantity").val(localStorage.getItem("order_bitcoin_quantity"));
        //localStorage.setItem("aisa_options","");
        sold_bitcoins = 1;
    }
    /**if (localStorage.getItem("aisa_options") =="buy") {
        //If it's buying I would buy from the seller on the sell side at the lowest sell_price
        var account_balance = localStorage.getItem("account_balance");
        var order_account_quantity = localStorage.getItem("account_balance");//USD
        localStorage.setItem("order_account_quantity",order_account_quantity);//USD
        let lowest_sell_price = localStorage.getItem("sell_price"); //USD
        let account_balance_stake = localStorage.getItem("order_account_quantity"); //USD
        let bitcoin_balance = (account_balance_stake/lowest_sell_price)*1; //BTC
        localStorage.setItem("bitcoin_balance",bitcoin_balance);//BTC
        var remaider = account_balance - account_balance_stake;
        localStorage.setItem("account_balance",remaider);//USD

        $(".bitcoin_balance").html(bitcoin_balance);
        localStorage.setItem("price",lowest_sell_price);
        $(".order_price").val(localStorage.getItem("price"));
        $(".order_quantity").val(localStorage.getItem("order_account_quantity"));
        localStorage.setItem("aisa_options","");
        bought_bitcoins = 1;
        //mysnackbar(localStorage.getItem("bitcoin_balance"));
    }
    if (localStorage.getItem("aisa_options") =="sell"){
        var bitcoin_balance = localStorage.getItem("bitcoin_balance");
        var order_bitcoin_quantity = localStorage.getItem("bitcoin_balance");//BTC
        $(".bitcoin_balance").html(localStorage.getItem("bitcoin_balance"));
        localStorage.setItem("order_bitcoin_quantity",order_bitcoin_quantity);//BTC
        let highest_buy_price = localStorage.getItem("buy_price");//USD
        let bitcoin_balance_stake = localStorage.getItem("order_bitcoin_quantity"); //BTC
        let account_balance = (bitcoin_balance_stake/1)*highest_buy_price; //USD
        localStorage.setItem("account_balance",account_balance);//USD
        var remaider = bitcoin_balance - bitcoin_balance_stake;
        localStorage.setItem("bitcoin_balance",remaider);//BTC
        
        $(".account_balance").html(account_balance);
        localStorage.setItem("price",highest_buy_price);
        $(".order_price").val(localStorage.getItem("price"));
        $(".order_quantity").val(localStorage.getItem("order_bitcoin_quantity"));
        localStorage.setItem("aisa_options","");
        sold_bitcoins = 1;
    } */
    //if (bought_bitcoins == 1) {
        var order_bitcoin_quantity = localStorage.getItem("bitcoin_balance");//BTC
        $(".bitcoin_balance").html(localStorage.getItem("bitcoin_balance"));
        localStorage.setItem("order_bitcoin_quantity",order_bitcoin_quantity);//BTC
        let highest_buy_price = localStorage.getItem("buy_price");//USD
        let bitcoin_balance_stake = localStorage.getItem("order_bitcoin_quantity"); //BTC
        let account_balance = (bitcoin_balance_stake/1)*highest_buy_price; //USD
        $(".bitcoin_balance_usd").html(account_balance);
    //}
    
    
    /**if (localStorage.getItem("aisa_options") =="buy") {
        //If it's buying I would buy from the seller on the sell side at the lowest sell_price
        var order_account_quantity = localStorage.getItem("account_balance");//USD
        localStorage.setItem("order_account_quantity",order_account_quantity);//USD
        let lowest_sell_price = localStorage.getItem("sell_price"); //USD
        let account_balance_stake = localStorage.getItem("order_account_quantity"); //USD
        let bitcoin_balance = (account_balance_stake/lowest_sell_price)*1; //BTC
        //localStorage.setItem("bitcoin_balance",bitcoin_balance);//BTC

        $(".bitcoin_balance").html(bitcoin_balance);
        localStorage.setItem("price",lowest_sell_price);
        $(".order_price").val(localStorage.getItem("price"));
        $(".order_quantity").val(localStorage.getItem("order_account_quantity"));
    } else {
        //If it's selling I would sell to the buyer on the buy side at the highest buy_price
        var order_bitcoin_quantity = localStorage.getItem("bitcoin_balance");//BTC
        localStorage.setItem("order_bitcoin_quantity",order_bitcoin_quantity);//BTC
        let highest_buy_price = localStorage.getItem("buy_price");//USD
        let bitcoin_balance_stake = localStorage.getItem("order_bitcoin_quantity"); //BTC
        let account_balance = (bitcoin_balance_stake/1)*highest_buy_price; //USD
        //localStorage.setItem("account_balance",account_balance);//USD

        $(".account_balance").html(account_balance);
        localStorage.setItem("price",highest_buy_price);
        $(".order_price").val(localStorage.getItem("price"));
        $(".order_quantity").val(localStorage.getItem("order_bitcoin_quantity"));
        //$(".bitcoin_balance_usd").html(account_balance);
    } */
    //alert(localStorage.getItem("account_balance"));
    $(".order_quantity").val(localStorage.getItem("account_balance"));

    $(".account_balance").attr("account_balance",localStorage.getItem("account_balance"));
    $(".account_balance").html("$" + localStorage.getItem("account_balance"));
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
