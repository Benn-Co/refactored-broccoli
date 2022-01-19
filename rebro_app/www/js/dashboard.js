var mkt_option_clicked = 0;
$("body").delegate(".mkt_option","click",function(event){
    event.preventDefault();
    //alert("https://8080-f0ab28f8-b99f-4f67-a63a-122172b1b1a4.cs-europe-west1-onse.cloudshell.dev/?authuser=0");
    if (localStorage.getItem("username") == null || localStorage.getItem("username") == "") {
        mysnackbar("Please sign in to proceed");
    } else {
        $(".mkt_option").attr("price",$(this).attr('price'));
        localStorage.setItem("price",$(this).attr('price'));
        localStorage.setItem("price",$(this).attr('price'));
    
        if (localStorage.getItem("asset") !== $(this).attr('asset')) {
            $(".order_price").val(localStorage.getItem("price"));
            $(".order_quantity").val(0);
            $(".order_quantity_range").val(0);
            $(".crypto_mkt_buy").html('');
            $(".crypto_mkt_sell").html('');
        } else {
            //moniter this
            localStorage.setItem("sell_price",$(this).attr('price'));

            if ($(this).attr('aisa_options') == 'buy') {
                localStorage.setItem("sell_price",$(this).attr('price'));
                $(".order_price").val(localStorage.getItem("sell_price"));
            } else if ($(this).attr('aisa_options') == 'sell'){
                localStorage.setItem("buy_price",$(this).attr('price'));
                $(".order_price").val(localStorage.getItem("buy_price"));
            }
        }
        
    
        localStorage.setItem("asset",$(this).attr('asset'));
        localStorage.setItem("aisa_options",$(this).attr('aisa_options'));
        $(".mkt_option").attr("asset",localStorage.getItem("asset"));
    
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
    
        $(".asset_info").html('');
        
        localStorage.setItem("price_open",$(this).attr('price_open'));
        localStorage.setItem("day_high",$(this).attr('day_high'));
        localStorage.setItem("day_low",$(this).attr('day_low'));

        var order_price = $(".order_price").val();
        if (order_price !== "") {
            $(".order_price").removeClass("is-invalid");
            $(".order_price").addClass("is-valid");
            var order_quantity = $(".order_quantity").val();
            if (order_quantity !== "") {
                $(".order_quantity").removeClass("is-invalid");
                $(".order_quantity").addClass("is-valid");
    
                //rebro_Aisha(localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
                mysnackbar(localStorage.getItem("aisa_options") + "  " + $(this).attr('asset') + " at " + localStorage.getItem("price"));
                account_mkt_balance(localStorage.getItem("aisa_options"));    
    
            } else {
                $(".order_quantity").removeClass("is-valid");
                $(".order_quantity").addClass("is-invalid");
                mysnackbar("Enter Quantity");

            }
        } else {
            $(".order_price").removeClass("is-valid");
            $(".order_price").addClass("is-invalid");
        }
        mkt_option_clicked = 1;
    }
    //var order_price = $(".order_price").val();
});
$("body").delegate(".order_book_mkt","click",function(event){
    event.preventDefault();    
       
    if ($(this).attr('order_book_side') =="Buy") {
        localStorage.setItem("aisa_options","sell");
        localStorage.setItem("price",$(this).attr('order_book_price'));

    } else {
        localStorage.setItem("aisa_options","buy");
        localStorage.setItem("price",$(this).attr('order_book_price'));

    }
    
    if ($(".order_price").val(localStorage.getItem("price")) == '' || $(".order_price").val(localStorage.getItem("price")) == null) {
        $(".order_price").val(localStorage.getItem("price"));  
    }
    account_mkt_balance(localStorage.getItem("aisa_options"));
    
    var order_price = $(".order_price").val();
    var order_quantity = $(".order_quantity").val();
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
    $(".mcode").html($(this).attr('mcode'));
    //alert($(this).attr('mcode'));
});
$("body").delegate(".country_option","click",function(event){
    event.preventDefault();
    $(".select_country").html($(this).attr('country_name')); 
    $(".select_currency").html($(this).attr('ccode'));
    $(".mcode").html($(this).attr('mcode'));
    //alert($(this).attr('mcode'));

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
$("body").delegate(".get_asset_assets","click",function(event){
    $("#main_mkt").removeClass("is-visible");
});

$("body").delegate(".get_asset","click",function(event){
    event.preventDefault();
    localStorage.setItem("asset",$(this).attr('asset'));    

    $(".mkt_option").attr("asset",localStorage.getItem("asset"));
    $(".asset_info").html(''); 
    
    mkt_option_clicked = 1;
    $(".order_price").val(0);
    $(".order_quantity").val(0);
    $(".order_quantity_range").val(0);

    $(".crypto_mkt_buy").html('');
    $(".crypto_mkt_sell").html(''); 
    bybit_mkt('Order Book',localStorage.getItem("asset"),''); 
});
$("body").delegate(".refresh_interval","click",function(event){
    event.preventDefault();
    $(".refresh_").html($(this).html()); 
    localStorage.setItem("interval",$(this).attr('interval'));
 
});
$("body").delegate(".selected_payment_option","click",function(event){
    event.preventDefault();
    $(".payment_option").html("" + $(this).html()); 
    localStorage.setItem("selected_payment_option",$(this).html());
    if ($(this).html() == "M-Pesa") {
        $(".entrer_phoner").show();
    } else {
        $(".entrer_phoner").hide();
    } 
});
$(".complete_trasaction").click(function(){
    var typofe = Number($(".amount_to_deposit").val());

    //alert(typofe == 'NaN');

    if ($(".amount_to_deposit").val() == '') {
        $(".amount_to_deposit").removeClass("is-valid");
        $(".amount_to_deposit_feedback").removeClass("valid-feedback");
        $(".amount_to_deposit").addClass("is-invalid");
        $(".amount_to_deposit_feedback").addClass("invalid-feedback");
        $(".amount_to_deposit_feedback").html("Please provide a valid amount.");
    } else if ( localStorage.getItem("selected_payment_option") == null) {
        $(".payment_option").removeClass("btn-primary");
        $(".payment_option").addClass("btn-danger");
    } else {
        $(".payment_option").removeClass("btn-danger");
        $(".payment_option").addClass("btn-success");
        $(".payment_option").html(localStorage.getItem("selected_payment_option")); 

        $(".amount_to_deposit").removeClass("is-invalid");
        $(".amount_to_deposit_feedback").removeClass("invalid-feedback");
        $(".amount_to_deposit").addClass("is-valid");
        $(".amount_to_deposit_feedback").addClass("valid-feedback");
        $(".amount_to_deposit_feedback").html("Looks good!");
        var amount_to_deposit = Number($(".amount_to_deposit").val());
        var selected_payment_option  = localStorage.getItem("selected_payment_option");

        if (selected_payment_option == "M-Pesa") {
            $(".entrer_phoner").show();
            var phone_num = $(".user_phone_number").val();
            if ($(".user_phone_number").val() == '' || phone_num.length < 9) {
                $(".user_phone_number").removeClass("is-valid");
                $(".user_phone_numberfeedback").removeClass("valid-feedback");
                $(".user_phone_number").addClass("is-invalid");
                $(".user_phone_numberfeedback").addClass("invalid-feedback");
                $(".user_phone_numberfeedback").html("Please provide a valid phone number.");
            } else {
                $(".user_phone_number").removeClass("is-invalid");
                $(".user_phone_numberfeedback").removeClass("invalid-feedback");
                $(".user_phone_numberfeedback").addClass("valid-feedback");
                $(".user_phone_number").addClass("is-valid");
                $(".user_phone_numberfeedback").html("Looks good!");                
            }
        } else {
            $(".entrer_phoner").hide();
        }
    }
});

var local_asset = "";
var local_asset_time_min = '';

function Order_Book() {
    var local_asset_time = new Date();
    
    $(".current_crypto_symbol").html(localStorage.getItem("asset"));
    if (local_asset != localStorage.getItem("asset") || local_asset_time.getSeconds() <= 5 ) {
        local_asset = localStorage.getItem("asset");
        bybit_mkt('Query Kline',localStorage.getItem("asset"),'');
        //bybit_mkt('Latest Information for Symbol',localStorage.getItem("asset"),'');

    } else {
       bybit_mkt('Order Book',localStorage.getItem("asset"),'');
    }
    bybit_mkt('Latest Information for Symbol',localStorage.getItem("asset"),'');

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
                
            } catch (error) {
                mysnackbar(error);
            }
        },
        error: function searchError(xhr, err) {
          //mysnackbar(" Error on ajax call: " + err  + " " + JSON.stringify(xhr));
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
                    $(".gift_email").val("");
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
    //alert(asset);
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { crypto:crypto, asset: asset, aisa_options: aisa_options},
        processData: true,
        url: api_server_url + '/cordova/coinbase_mkt.php',
        success: function searchSuccess(response) {
            try {
                if (response.ret_msg == "OK") {
                    $(".current_crypto_symbol").addClass("bg-soft-warning");
                    if (crypto == 'Query Symbol') {
                        var results = response.result;
                        for (let i = 0; i < results.length; i++) {
                            if (i < 1) {
                                localStorage.setItem("asset",results[i].name);
                                $(".mkt_option").attr("asset",localStorage.getItem("asset"));  
                            }                            
                            var query_c_symbols = '<li id="offers_' + results[i].name + '" class="list-group-item d-flex justify-content-between align-items-center get_asset" asset="' + results[i].name + '">' +
                            '<a class="text-primary" href="#' + results[i].name + '">' + results[i].name + '</a>' +
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
                        var crypto_symbol = '';
                        
                        for (let i = 0; i < results.length; i++) {                           
                            crypto_symbol = results[i].symbol;
                            if (crypto_symbol == localStorage.getItem("asset")) {
                                if (results[i].side == 'Buy') {
                                    var order_book = '<li class="list-group-item d-flex justify-content-between align-items-center order_book_mkt" order_book_side="' + results[i].side + '" order_book_price="' + results[i].price + '">'+
                                    '<span class="text-primary">' + results[i].symbol + '</span>'+
                                    '<span class="text-info">' + results[i].price + '</span>'+
                                    '<span class="text-warning">' + results[i].size + '</span>'+
                                    '<span class="text-success"><small>' + trade_time + '</small></span>'+
                                    '</li>';
                                    if (buy_price_i < 1) {
                                        $(".mkt_option").attr("price",results[i].price);

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
                                        //mysnackbar(mkt_option_clicked);
                                        if (mkt_option_clicked == 1) {
                                            /**$(".bitcoin_balance_price").html("$" + results[i].price);
                                            localStorage.setItem("sell_price",results[i].price);
                                            localStorage.setItem("price",results[i].price);
                                            mysnackbar(localStorage.getItem("price"));
                                            $(".order_price").val(localStorage.getItem("price")); */
                                            mkt_option_clicked = 0;
                                        } else {
                                            //$(".bitcoin_balance_price").html("$" + results[i].price);
                                            localStorage.setItem("sell_price",results[i].price);
                                            localStorage.setItem("price",results[i].price);
                                            //mysnackbar(localStorage.getItem("price"));
                                            $(".order_price").val(localStorage.getItem("price"));  
                                        }
                                        
                                    }
                                    sell_price_i++;
                                    $(".crypto_mkt_sell").append(order_book);
                                }
                            }                                                        
                        }
                        if (crypto_symbol === localStorage.getItem("asset")) {
                            var crypto_asset_balance = localStorage.getItem("asset");
                            crypto_asset_balance = "" + crypto_asset_balance + "_balance";
                            if(localStorage.getItem(crypto_asset_balance) == null) {
                                localStorage.setItem(crypto_asset_balance,0);//BTC
                            }
                            /**let highest_buy_price = localStorage.getItem("buy_price");//USD
                            let BTC_balance = localStorage.getItem(crypto_asset_balance);//BTC
                            //$(".bitcoin_balance").html(BTC_balance);
                        
                            let USD_balance = (Number(BTC_balance)/1)*Number(highest_buy_price); //USD
                            USD_balance = USD_balance.toFixed(2);
                            //$(".bitcoin_balance_usd").html(USD_balance);
                        
                            var usd_account_balance = (Number(localStorage.getItem("account_balance")) + Number(USD_balance));
                            usd_account_balance = usd_account_balance.toFixed(2);
                            $(".account_balance").html("$" + usd_account_balance); */ 
                            //mysnackbar(crypto_asset_balance);                           
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
                            '<a class="text-primary position-relative mr-2" title="Symbol" href="#' + results[i].symbol + '">' + results[i].symbol + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-primary">Symbol</span></a>'+                            
                            '<span class="text-info d-none d-xl-block position-relative" title="Interval">' + results[i].interval + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-info">Interval</span></span>'+
                            '<span class="text-info d-none d-xl-block position-relative" title="Open time">' + open_trade_time + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-info">Open time</span></span>'+
                            '<span class="text-primary position-relative mr-2" title="' + results[i].interval + 'Min Open">' + results[i].open + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-primary">' + results[i].interval + 'Min Open</span></span>'+
                            '<span class="text-success position-relative mr-2" title="' + results[i].interval + 'Min High">' + results[i].high + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-success">' + results[i].interval + 'Min High</span></span>'+
                            '<span class="text-danger position-relative mr-2" title="' + results[i].interval + 'Min Low">' + results[i].low + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-soft-danger">' + results[i].interval + 'Min Low</span></span>'+
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
                            rebro_Aisha(localStorage.getItem("asset"),'hold',localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
                        }                        
                    } else if (crypto == 'Latest Information for Symbol') {
                        $(".leanders_mkt_assets").html('');
                        $(".crypto_you_own").html('');
                        $(".crypto_wacthlist").html('');

                        var results = response.result;
                        var potential_usd_account_balance = localStorage.getItem("account_balance");

                        for (let i = 0; i < results.length; i++) {
                            //results[i].open
                            let symbol_pre_price = localStorage.getItem("" + results[i].symbol + "");// Get Symbol preveous price
                            if (symbol_pre_price != '' || symbol_pre_price != null) {
                                let price_now = results[i].last_price;
                                var chan_pri = 0.00;
                                var chan_pri_chart = "";
                                var wacthlist_prct_bg = "";
                                var wacthlist_prct = 0.00;

                                if (symbol_pre_price <= price_now) {
                                    var symbol_chan_pri = price_now - symbol_pre_price;
                                    chan_pri = (symbol_chan_pri/symbol_pre_price)*100;
                                    chan_pri = "+" + chan_pri.toFixed(4);
                                    chan_pri_chart = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
                                    var bg_ = "bg-soft-success";
                                    var chan_pri_bg = "bg-success";
                                    wacthlist_prct_bg = "success";

                                } else if (symbol_pre_price >= price_now){
                                    var symbol_chan_pri = symbol_pre_price - price_now;
                                    chan_pri = (symbol_chan_pri/symbol_pre_price)*100;
                                    chan_pri = "-" + chan_pri.toFixed(4);
                                    chan_pri_chart = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-down"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
                                    var bg_ = "bg-soft-danger";
                                    var chan_pri_bg = "bg-danger";
                                    wacthlist_prct_bg = "danger";

                                }
                                wacthlist_prct = chan_pri;

                                localStorage.setItem("" + results[i].symbol + "",results[i].last_price);// Set Symbol its price
                            } else{
                                var chan_pri = 0.00;
                                var bg_ = "bg-light";
                                localStorage.setItem("" + results[i].symbol + "",results[i].last_price);// Set Symbol its price
                            }

                            var crypto_asset_balance = "" + results[i].symbol + "_balance";

                            if (localStorage.getItem(crypto_asset_balance) == null) {
                               var group_btr = '<li class="btn-group" role="group">' +
                               '<a href="#" class="me-0 btn btn-sm btn-soft-success mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="buy">Buy</a>' +
                               '<a href="#" class="me-0 btn btn-sm btn-soft-info mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="hold">Watch</a>' +
                               '</li>'; 
                            } else if (localStorage.getItem(crypto_asset_balance) ==0){
                                var group_btr = '<li class="btn-group" role="group">' +
                                '<a href="#" class="me-0 btn btn-sm btn-soft-success mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="buy">Buy</a>' +
                                '</li>';
                            } else {
                                var group_btr = '<li class="btn-group" role="group">' +
                               '<a href="#" class="me-0 btn btn-sm btn-soft-success mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="buy">Buy</a>' +
                               '<a href="#" class="me-0 btn btn-sm btn-soft-danger mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="sell">Sell</a>' +
                               '</li>';
                            }
                            //leanders_mkt_assets
                            var leanders_mkt_assets = '<div class="card border-0 mb-5" id="'+ results[i].symbol + '">' +
                            '<ul class="nav nav-pills nav-fill  ' + bg_ + '">' +
                            '<li class="nav-item avatar">' +
                            '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                            '<path fill="#F90" fill-rule="evenodd" d="M23.6408156,14.9046858 C22.0378949,21.3339956 15.5260763,25.2467873 9.09601649,23.6434916 C2.66858193,22.0405708 -1.24420981,15.5283772 0.359460996,9.09944253 C1.96163164,2.66938268 8.47345019,-1.24378409 14.9016348,0.359136628 C21.3313196,1.96205735 25.2437363,8.47500102 23.6408156,14.9046858 L23.6408156,14.9046858 Z M17.2913894,10.2916945 C17.5302898,8.69477443 16.3144103,7.83630799 14.6518582,7.263622 L15.1911657,5.1003916 L13.8744004,4.77223165 L13.3493445,6.87845598 C13.0031826,6.79219679 12.6476448,6.71081312 12.2943571,6.63017953 L12.8231635,4.51007873 L11.5071483,4.18191878 L10.9674658,6.3443991 C10.6809353,6.27914215 10.3996553,6.21463528 10.1266263,6.14675305 L10.1281264,6.14000233 L8.31218301,5.68657903 L7.9618957,7.09297883 C7.9618957,7.09297883 8.93887476,7.31687767 8.91824756,7.33075415 C9.45155436,7.46389333 9.54793963,7.81680592 9.53181291,8.09658572 L8.91749748,10.5609732 C8.9542514,10.5703492 9.00188147,10.5838506 9.05438706,10.6048529 C9.01050739,10.5939767 8.96362739,10.5819754 8.91524724,10.5703492 L8.05415553,14.0225919 C7.98889858,14.1846091 7.82350596,14.427635 7.45071626,14.3353752 C7.46384266,14.3545022 6.49361432,14.0964747 6.49361432,14.0964747 L5.8399197,15.6037603 L7.5534772,16.0309308 C7.87226116,16.1108143 8.18466943,16.1944482 8.49220218,16.2732066 L7.94726915,18.4611896 L9.26253423,18.7893496 L9.80221671,16.624619 C10.161505,16.7221294 10.5102921,16.812139 10.8515785,16.896898 L10.3137712,19.0515025 L11.6305364,19.3796624 L12.1754695,17.1958048 C14.4208336,17.6207251 16.1092634,17.4493318 16.8199641,15.4184905 C17.3926501,13.7833164 16.7914611,12.8400909 15.6100853,12.2250254 C16.4704269,12.0266293 17.1184959,11.460694 17.2913894,10.2916945 L17.2913894,10.2916945 Z M14.2828189,14.5105188 C13.8759006,16.145693 11.1227324,15.2617238 10.2301373,15.0400752 L10.9532143,12.1413915 C11.8458094,12.3641652 14.7081142,12.8052122 14.2828189,14.5105188 L14.2828189,14.5105188 Z M14.6901123,10.268067 C14.3188228,11.7554754 12.0273287,10.9997699 11.2839995,10.8145002 L11.9395694,8.18547018 C12.6828985,8.37073991 15.0767785,8.71652674 14.6901123,10.268067 L14.6901123,10.268067 Z"/>' +
                            '</svg>' +
                            '<a class="" href="#">'+ results[i].symbol + '</a>' +

                            /**'<a href="#" class="avatar position-relative mt-3">' +
                            '<img class="avatar-img" src="https://www.coinbase.com/price/bitcoin" alt="">' +
                            '<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99</span>' +

                            '<div class="badge-circle bg-transparent position-absolute bottom-0 end-0">' +
                            '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                            '<path fill="#F90" fill-rule="evenodd" d="M23.6408156,14.9046858 C22.0378949,21.3339956 15.5260763,25.2467873 9.09601649,23.6434916 C2.66858193,22.0405708 -1.24420981,15.5283772 0.359460996,9.09944253 C1.96163164,2.66938268 8.47345019,-1.24378409 14.9016348,0.359136628 C21.3313196,1.96205735 25.2437363,8.47500102 23.6408156,14.9046858 L23.6408156,14.9046858 Z M17.2913894,10.2916945 C17.5302898,8.69477443 16.3144103,7.83630799 14.6518582,7.263622 L15.1911657,5.1003916 L13.8744004,4.77223165 L13.3493445,6.87845598 C13.0031826,6.79219679 12.6476448,6.71081312 12.2943571,6.63017953 L12.8231635,4.51007873 L11.5071483,4.18191878 L10.9674658,6.3443991 C10.6809353,6.27914215 10.3996553,6.21463528 10.1266263,6.14675305 L10.1281264,6.14000233 L8.31218301,5.68657903 L7.9618957,7.09297883 C7.9618957,7.09297883 8.93887476,7.31687767 8.91824756,7.33075415 C9.45155436,7.46389333 9.54793963,7.81680592 9.53181291,8.09658572 L8.91749748,10.5609732 C8.9542514,10.5703492 9.00188147,10.5838506 9.05438706,10.6048529 C9.01050739,10.5939767 8.96362739,10.5819754 8.91524724,10.5703492 L8.05415553,14.0225919 C7.98889858,14.1846091 7.82350596,14.427635 7.45071626,14.3353752 C7.46384266,14.3545022 6.49361432,14.0964747 6.49361432,14.0964747 L5.8399197,15.6037603 L7.5534772,16.0309308 C7.87226116,16.1108143 8.18466943,16.1944482 8.49220218,16.2732066 L7.94726915,18.4611896 L9.26253423,18.7893496 L9.80221671,16.624619 C10.161505,16.7221294 10.5102921,16.812139 10.8515785,16.896898 L10.3137712,19.0515025 L11.6305364,19.3796624 L12.1754695,17.1958048 C14.4208336,17.6207251 16.1092634,17.4493318 16.8199641,15.4184905 C17.3926501,13.7833164 16.7914611,12.8400909 15.6100853,12.2250254 C16.4704269,12.0266293 17.1184959,11.460694 17.2913894,10.2916945 L17.2913894,10.2916945 Z M14.2828189,14.5105188 C13.8759006,16.145693 11.1227324,15.2617238 10.2301373,15.0400752 L10.9532143,12.1413915 C11.8458094,12.3641652 14.7081142,12.8052122 14.2828189,14.5105188 L14.2828189,14.5105188 Z M14.6901123,10.268067 C14.3188228,11.7554754 12.0273287,10.9997699 11.2839995,10.8145002 L11.9395694,8.18547018 C12.6828985,8.37073991 15.0767785,8.71652674 14.6901123,10.268067 L14.6901123,10.268067 Z"/>' +
                            '</svg>' +
                            '</div>' +
                            '</a>' + */
                            '</li>' +
                            '<li class="nav-item ">' +
                            '<a class="nav-link" href="#">$'+ results[i].last_price + ' </a>' +
                            '</li>' +
                            '<li class="nav-item d-none d-lg-block d-md-block">' +
                            '<span class="badge ' + chan_pri_bg + '">'+ chan_pri + '%</span>' +
                            '<span class="">'+ chan_pri_chart + '</span>' +
                            '</li>' + group_btr +
                            '</ul>' +
                            '</div>';

                            $(".leanders_mkt_assets").append(leanders_mkt_assets);

                            //var crypto_asset_balance = "" + results[i].symbol + "_balance";
                            if(localStorage.getItem(crypto_asset_balance) == null) {
                                //localStorage.setItem(crypto_asset_balance,0);//BTC
                            } else if(localStorage.getItem(crypto_asset_balance) == 0 || localStorage.getItem(crypto_asset_balance) == "null" ) {
                                var crypto_wacthlist = '<li class="list-group-item d-flex justify-content-between align-items-center">' +
                                '<span class="text-primary">' +
                                '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                                '<path fill="#F90" fill-rule="evenodd" d="M23.6408156,14.9046858 C22.0378949,21.3339956 15.5260763,25.2467873 9.09601649,23.6434916 C2.66858193,22.0405708 -1.24420981,15.5283772 0.359460996,9.09944253 C1.96163164,2.66938268 8.47345019,-1.24378409 14.9016348,0.359136628 C21.3313196,1.96205735 25.2437363,8.47500102 23.6408156,14.9046858 L23.6408156,14.9046858 Z M17.2913894,10.2916945 C17.5302898,8.69477443 16.3144103,7.83630799 14.6518582,7.263622 L15.1911657,5.1003916 L13.8744004,4.77223165 L13.3493445,6.87845598 C13.0031826,6.79219679 12.6476448,6.71081312 12.2943571,6.63017953 L12.8231635,4.51007873 L11.5071483,4.18191878 L10.9674658,6.3443991 C10.6809353,6.27914215 10.3996553,6.21463528 10.1266263,6.14675305 L10.1281264,6.14000233 L8.31218301,5.68657903 L7.9618957,7.09297883 C7.9618957,7.09297883 8.93887476,7.31687767 8.91824756,7.33075415 C9.45155436,7.46389333 9.54793963,7.81680592 9.53181291,8.09658572 L8.91749748,10.5609732 C8.9542514,10.5703492 9.00188147,10.5838506 9.05438706,10.6048529 C9.01050739,10.5939767 8.96362739,10.5819754 8.91524724,10.5703492 L8.05415553,14.0225919 C7.98889858,14.1846091 7.82350596,14.427635 7.45071626,14.3353752 C7.46384266,14.3545022 6.49361432,14.0964747 6.49361432,14.0964747 L5.8399197,15.6037603 L7.5534772,16.0309308 C7.87226116,16.1108143 8.18466943,16.1944482 8.49220218,16.2732066 L7.94726915,18.4611896 L9.26253423,18.7893496 L9.80221671,16.624619 C10.161505,16.7221294 10.5102921,16.812139 10.8515785,16.896898 L10.3137712,19.0515025 L11.6305364,19.3796624 L12.1754695,17.1958048 C14.4208336,17.6207251 16.1092634,17.4493318 16.8199641,15.4184905 C17.3926501,13.7833164 16.7914611,12.8400909 15.6100853,12.2250254 C16.4704269,12.0266293 17.1184959,11.460694 17.2913894,10.2916945 L17.2913894,10.2916945 Z M14.2828189,14.5105188 C13.8759006,16.145693 11.1227324,15.2617238 10.2301373,15.0400752 L10.9532143,12.1413915 C11.8458094,12.3641652 14.7081142,12.8052122 14.2828189,14.5105188 L14.2828189,14.5105188 Z M14.6901123,10.268067 C14.3188228,11.7554754 12.0273287,10.9997699 11.2839995,10.8145002 L11.9395694,8.18547018 C12.6828985,8.37073991 15.0767785,8.71652674 14.6901123,10.268067 L14.6901123,10.268067 Z"/>' +
                                '</svg>' +
                                '<a href="#' + results[i].symbol + '">' + results[i].symbol + '</a>' +
                                '</span>' +
                                '<span class="text-' + wacthlist_prct_bg + '">' + wacthlist_prct + '%</span>' +
                                '<span class="text-info">$'+ results[i].last_price + '</span>' +
                                '<span class="dropdown ms-5">' +
                                '<a class="icon text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>' +
                                '</a>' +
                                '<ul class="dropdown-menu">' +
                                '<li class="btn-group">' +
                                '<a href="#" class="btn btn-sm btn-soft-success mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="buy">Buy</a>' +
                                '<a href="#" class="btn btn-sm btn-soft-primary mkt_option_unwatch" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="hold">Unwatch</a>' +
                                '</li>' +
                                '</ul>' +
                                '</span>' +
                                '</li>';
                                $(".crypto_wacthlist").append(crypto_wacthlist);

                            } else {
                                let highest_buy_price = results[i].last_price;
                                let BTC_balance = localStorage.getItem(crypto_asset_balance);//BTC
                                
                                let USD_balance = (Number(BTC_balance)/1)*Number(highest_buy_price); //USD
                                USD_balance = USD_balance.toFixed(2);
                                
                                var coin_value_ = localStorage.getItem("" + results[i].symbol + "_value");
                                var potential_account_balance = Number(potential_usd_account_balance) - Number(coin_value_);
                                let coin_value = Number(USD_balance) - Number(coin_value_);
                                coin_value = coin_value.toFixed(2);

                                var the_diff = coin_value;
                                var initial_val = coin_value_;
                                var pert_chang = (the_diff/initial_val)*100;
                                pert_chang = pert_chang.toFixed(2);
                                if (pert_chang >= 0) {
                                    var pr_bg = "bg-success";
                                } else {
                                    var pr_bg = "bg-danger"; 
                                }

                                var aria_valuenow = Math.abs(pert_chang);

                                var mysnaccountackbar = " BTC " + BTC_balance + " " + results[i].symbol + " balance " + USD_balance + "  value added " + coin_value + " change " + pert_chang + "%";
                                

                                

                                var progres_dash = '<div class="progress">' +
                                //'<div class="progress-bar ' + pr_bg + '" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="25">25%</div>' + 
                                '<div class="progress-bar ' + pr_bg + '" role="progressbar" style="width: ' + aria_valuenow + '%;" aria-valuenow="' + aria_valuenow + '" aria-valuemin="0" aria-valuemax="100">' + aria_valuenow + '%</div>' + 
                                '</div>';

                                mysnaccountackbar = progres_dash;
                                
                                let letpotential_usd_account_balance = Number(potential_account_balance) + Number(USD_balance);

                                potential_usd_account_balance = letpotential_usd_account_balance.toFixed(2);
                                $(".account_balance").html("$" + potential_usd_account_balance);

                                
                                if (localStorage.getItem("asset") === results[i].symbol) {
                                    var aria_expanded = 'true'; 
                                } else {
                                    var aria_expanded = 'false';
                                }
                                var crypto_you_own = '<li class="list-group-item d-flex justify-content-between align-items-center">' +
                                '<span class="text-primary">' +
                                '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                                '<path fill="#F90" fill-rule="evenodd" d="M23.6408156,14.9046858 C22.0378949,21.3339956 15.5260763,25.2467873 9.09601649,23.6434916 C2.66858193,22.0405708 -1.24420981,15.5283772 0.359460996,9.09944253 C1.96163164,2.66938268 8.47345019,-1.24378409 14.9016348,0.359136628 C21.3313196,1.96205735 25.2437363,8.47500102 23.6408156,14.9046858 L23.6408156,14.9046858 Z M17.2913894,10.2916945 C17.5302898,8.69477443 16.3144103,7.83630799 14.6518582,7.263622 L15.1911657,5.1003916 L13.8744004,4.77223165 L13.3493445,6.87845598 C13.0031826,6.79219679 12.6476448,6.71081312 12.2943571,6.63017953 L12.8231635,4.51007873 L11.5071483,4.18191878 L10.9674658,6.3443991 C10.6809353,6.27914215 10.3996553,6.21463528 10.1266263,6.14675305 L10.1281264,6.14000233 L8.31218301,5.68657903 L7.9618957,7.09297883 C7.9618957,7.09297883 8.93887476,7.31687767 8.91824756,7.33075415 C9.45155436,7.46389333 9.54793963,7.81680592 9.53181291,8.09658572 L8.91749748,10.5609732 C8.9542514,10.5703492 9.00188147,10.5838506 9.05438706,10.6048529 C9.01050739,10.5939767 8.96362739,10.5819754 8.91524724,10.5703492 L8.05415553,14.0225919 C7.98889858,14.1846091 7.82350596,14.427635 7.45071626,14.3353752 C7.46384266,14.3545022 6.49361432,14.0964747 6.49361432,14.0964747 L5.8399197,15.6037603 L7.5534772,16.0309308 C7.87226116,16.1108143 8.18466943,16.1944482 8.49220218,16.2732066 L7.94726915,18.4611896 L9.26253423,18.7893496 L9.80221671,16.624619 C10.161505,16.7221294 10.5102921,16.812139 10.8515785,16.896898 L10.3137712,19.0515025 L11.6305364,19.3796624 L12.1754695,17.1958048 C14.4208336,17.6207251 16.1092634,17.4493318 16.8199641,15.4184905 C17.3926501,13.7833164 16.7914611,12.8400909 15.6100853,12.2250254 C16.4704269,12.0266293 17.1184959,11.460694 17.2913894,10.2916945 L17.2913894,10.2916945 Z M14.2828189,14.5105188 C13.8759006,16.145693 11.1227324,15.2617238 10.2301373,15.0400752 L10.9532143,12.1413915 C11.8458094,12.3641652 14.7081142,12.8052122 14.2828189,14.5105188 L14.2828189,14.5105188 Z M14.6901123,10.268067 C14.3188228,11.7554754 12.0273287,10.9997699 11.2839995,10.8145002 L11.9395694,8.18547018 C12.6828985,8.37073991 15.0767785,8.71652674 14.6901123,10.268067 L14.6901123,10.268067 Z"/>' +
                                '</svg>' +
                                '<a href="#' + results[i].symbol + '">' + results[i].symbol + '</a>' +
                                '</span>' +
                                '<span class="text-success">$' + USD_balance + '</span>' +
                                '<span class="text-info">$'+ results[i].last_price + '</span>' +
                                '<span class="dropdown ms-5">' +
                                '<a class="icon text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="' + aria_expanded + '">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>' +
                                '</a>' +
                                '<ul class="dropdown-menu">' +
                                '<li>' +
                                '<span class="text-warning">' + BTC_balance + '</span>' +
                                '</li>' +
                                '<li class="btn-group">' +
                                '<a href="#" class="btn btn-sm btn-soft-success mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="buy">Buy</a>' +
                                '<a href="#" class="btn btn-sm btn-soft-danger mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="sell">Sell</a>' +
                                '</li>' +
                                '</ul>' +
                                '</span>' +
                                '</li>' + 
                                '<li class="list-group-item"> ' + mysnaccountackbar + '</li>';
                                $(".crypto_you_own").append(crypto_you_own);
                            }                            

                        }
                    }                    
                } else{
                    $(".asset_info").html('');
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
var bought_bitcoins = 0;
var sold_bitcoins = 0;
function account_mkt_balance(aisa_options) {
    var crypto_asset_balance = localStorage.getItem("asset");
    crypto_asset_balance = "" + crypto_asset_balance + "_balance";
    var crypto_asset_value = localStorage.getItem("asset");
    crypto_asset_value = "" + crypto_asset_value + "_value";

    //mysnackbar("aisa_options " + aisa_options);
    if (aisa_options =="buy") {
        if(localStorage.getItem(crypto_asset_balance) == null) {
            localStorage.setItem(crypto_asset_balance,0);//BTC
        }
        //mysnackbar($(".order_quantity").val());
        if ($(".order_quantity").val() != '' && $(".order_quantity").val() > 0) {
            $(".order_quantity").removeClass("is-invalid");
            $(".order_quantity").addClass("is-valid");
            var order_usd_quantity = $(".order_quantity").val();//USD
            if (localStorage.getItem("account_balance") <= 0) {
                mysnackbar("Insufficient balance, load your account.");
                display_account_action("show");

            } else {
                if (order_usd_quantity <= localStorage.getItem("account_balance")) {
                    var account_balance = localStorage.getItem("account_balance");//USD
                    //account_balance = Number(account_balance) - Number(order_usd_quantity);
                    //localStorage.setItem("account_balance",account_balance);//USD
                    var mkt_operation = '';
                    localStorage.setItem(crypto_asset_value,order_usd_quantity);//USD
    
                    //alert(localStorage.getItem(crypto_asset_value));
    
                    let lowest_sell_price = localStorage.getItem("sell_price"); //USD
                    //////////////////////////////////////////
    
                    let btc_balance_fro_usd = (Number(order_usd_quantity)/Number(lowest_sell_price))*1; //BTC
                    var bitcoin_balance_fro_usd = (Number(localStorage.getItem(crypto_asset_balance)) + Number(btc_balance_fro_usd));
                    
                    //mkt_operation = mkt_operation + " bitcoin_balance_fro_usd " + bitcoin_balance_fro_usd;
    
                    bitcoin_balance_fro_usd = bitcoin_balance_fro_usd.toFixed(8);
                    /////////////////////////////////////////////
                    localStorage.setItem(crypto_asset_balance,bitcoin_balance_fro_usd);//BTC
    
                    mkt_operation = mkt_operation +'You bought ' + bitcoin_balance_fro_usd + ' ' + localStorage.getItem("asset") + ' worth $' + localStorage.getItem(crypto_asset_value) + ' at ' + localStorage.getItem("sell_price");
                    //mkt_operation = mkt_operation + '' ;
    
                    var is_empty = 'no';
                    dsh_contact('Mo-pal' ,username,'',mkt_operation,is_empty);
    
                    var order_quantity = 0;
                    order_quantity = order_quantity.toFixed(8);
                    $(".order_quantity").val(order_quantity);
                    $(".order_quantity_range").val(0);
                } else {//localStorage.setItem("account_balance"
                    $(".order_quantity").val(localStorage.getItem("account_balance"));
                    mysnackbar("You do not have enough money");
                    $(".order_quantity_range").val(0);
                } 
            }            
        } else {
            $(".order_quantity").addClass("is-invalid");
            $(".order_quantity").removeClass("is-valid");
            var order_usd_quantity = 0;//localStorage.getItem("account_balance");//USD
            mysnackbar("Enter Quantity");
        }        
    } else if (aisa_options =="sell") {
        if(localStorage.getItem(crypto_asset_balance) == null) {
            localStorage.setItem(crypto_asset_balance,0);//BTC
        }

        if ($(".order_quantity").val() != '' && $(".order_quantity").val() > 0) {
            $(".order_quantity").removeClass("is-invalid");
            $(".order_quantity").addClass("is-valid");
            var order_btc_quantity = $(".order_quantity").val();//BTC

            //alert(localStorage.getItem(crypto_asset_balance));
            if (localStorage.getItem(crypto_asset_balance) <= 0) {
                mysnackbar("Deficient crypto, try buying some");
            } else {
                if (order_btc_quantity <= localStorage.getItem(crypto_asset_balance)) {
                    var bitcoin_balance = localStorage.getItem(crypto_asset_balance);//USD
                    bitcoin_balance = Number(bitcoin_balance) - Number(order_btc_quantity);
                    localStorage.setItem(crypto_asset_balance,bitcoin_balance);//USD
                    var mkt_operation = '';
    
                    let highest_buy_price = localStorage.getItem("buy_price");//USD
                    let usd_balance_fro_btc = (order_btc_quantity/1)*highest_buy_price; //USD
                    var usd_account_balance_fro_btc = (Number(localStorage.getItem("account_balance")) + Number(usd_balance_fro_btc));
                    
                    usd_account_balance_fro_btc = usd_account_balance_fro_btc.toFixed(2);
                    //localStorage.setItem("account_balance",usd_account_balance_fro_btc);//USD
                    
                    var initial_value = localStorage.getItem(crypto_asset_value);
                    var remaining_value = Number(initial_value) - Number(usd_balance_fro_btc);
                    localStorage.setItem(crypto_asset_value,remaining_value);//USD
    
                    mkt_operation = mkt_operation +'You sold ' + order_btc_quantity + ' ' + localStorage.getItem("asset") + ' worth $' + usd_balance_fro_btc + ' at ' + localStorage.getItem("buy_price");
    
                    var is_empty = 'no';
                    dsh_contact('Mo-pal' ,username,'',mkt_operation,is_empty);
     
                    var order_quantity = 0;
                    order_quantity = order_quantity.toFixed(2);
                    $(".order_quantity").val(order_quantity);
                    $(".order_quantity_range").val(0);
                } else{
                    $(".order_quantity").val(localStorage.getItem(crypto_asset_balance));
                    mysnackbar("You do not have enough crypto");
                    $(".order_quantity_range").val(0);
                }
            }
            

        } else {
            $(".order_quantity").addClass("is-invalid");
            $(".order_quantity").removeClass("is-valid");
            var order_btc_quantity = 0;//localStorage.getItem(crypto_asset_balance);//BTC
            mysnackbar("Enter Quantity");
        }        
    }
               
}


function dsh_contact(user_name,con_from,conn_id,chat_message,is_empty) {
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { contact: 12, username: user_name,connect_from: con_from ,connects_id: conn_id, chat_message:chat_message, is_empty:is_empty  },
        processData: true,
        url: api_server_url + '/cordova/loli/contact.php',
        success: function searchSuccess(response) {
            mysnackbar(chat_message);
        },
        error: function searchError(xhr, err) {
            mysnackbar('Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '');
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
$(".signin_page").click(function(){
    $("#signup_html").hide();
    $("#signin_html").show();
});
$(".signup_page").click(function(){
    $("#signin_html").hide();
    $("#signup_html").show();
});
$(".forgot_password_page").click(function(){
    $("#signin_html").hide();
    $("#forgot_password_html").show();
});

$(".pills-home-tab").click(function(){
    $("#main_mkt").addClass("is-visible");
    //$("#leanders_mkt").addClass("d-none");
    //$("#oder_book").removeClass("d-none");
    //$(".pills-home-tab").addClass("d-none");
    //$(".pills-assets-tab").removeClass("d-none");
});
$(".pills-assets-tab").click(function(){
    $("#main_mkt").addClass("is-visible");
    $("#direct_chat").hide();
    $("#mkt_dash").show();
    //$("#leanders_mkt").removeClass("d-none");
    //$("#oder_book").addClass("d-none");
    //$(".pills-assets-tab").addClass("d-none");
    //$(".pills-home-tab").removeClass("d-none");
}); 
$(document).on('input', '.order_quantity_range', function() {
    $(".order_quantity_range").val($(this).val());
    var crypto_asset_balance = localStorage.getItem("asset");
    crypto_asset_balance = "" + crypto_asset_balance + "_balance";
    if(localStorage.getItem(crypto_asset_balance) == null) {
        localStorage.setItem(crypto_asset_balance,0);//BTC
    }
    var max_va = $(this).val();// max 5 => 100%
    var order_quantity_pct = (max_va/5)*100;
    
    var account_balance = localStorage.getItem("account_balance");//USD
    var pct_account_balance = (Number(account_balance)*Number(order_quantity_pct))/100;
    pct_account_balance = pct_account_balance.toFixed(2);
    
    var bitcoin_balance = localStorage.getItem(crypto_asset_balance);//BTC
    var pct_bitcoin_balance = (Number(bitcoin_balance) *Number(order_quantity_pct))/100;
    pct_bitcoin_balance = pct_bitcoin_balance.toFixed(8);
    // && localStorage.getItem("account_balance") > 0
    //if (localStorage.getItem(crypto_asset_balance) <= 0) {
    //    mysnackbar("Deficient " + crypto_asset_balance + ", try buying some");
    //} else 
    if (localStorage.getItem("account_balance") <= 0) {
        mysnackbar("Insufficient balance, load your account.");
        display_account_action("show");
    } else {
        if (localStorage.getItem("aisa_options") == "sell") {
            $(".order_quantity").val(pct_bitcoin_balance);
            mysnackbar(pct_bitcoin_balance);
        } else {
            $(".order_quantity").val(pct_account_balance);
            mysnackbar(pct_account_balance);
        }
    }
    
});
//myChart();
/**function myChart(){
    // Graphs
    
    var dataPoints = [];

    var chart = new CanvasJS.Chart("myChart", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        title: {
            text: "Netflix Stock Price in 2016"
        },
        subtitles: [{
            text: "Weekly Averages"
        }],
        axisX: {
            interval: 1,
            valueFormatString: "MMM"
        },
        axisY: {
            prefix: "$",
            title: "Price"
        },
        toolTip: {
            content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
        },
        data: [{
            type: "candlestick",
            yValueFormatString: "$##0.00",
            dataPoints: dataPoints
        }]
    });
    
    $.get("https://canvasjs.com/data/gallery/javascript/netflix-stock-price.csv", getDataPointsFromCSV);
    
    function getDataPointsFromCSV(csv) {
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                dataPoints.push({
                    x: new Date(
                        parseInt(points[0].split("-")[0]),
                        parseInt(points[0].split("-")[1]),
                        parseInt(points[0].split("-")[2])
                    ),
                    y: [
                        parseFloat(points[1]),
                        parseFloat(points[2]),
                        parseFloat(points[3]),
                        parseFloat(points[4])
                    ]
                });
            }
        }
        chart.render();
    }
} */
function display_account_action(action) {
    if (action == "hide") {
        $("#account_action").hide();
    } else {
        $("#account_action").show();
    }
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
