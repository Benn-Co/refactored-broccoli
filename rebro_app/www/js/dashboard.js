var mkt_option_clicked = 0;
$("body").delegate(".mkt_option","click",function(event){
    event.preventDefault(); 
    //var order_price = $(".order_price").val();
    //$(".account_balance").attr("account_balance",localStorage.getItem("account_balance"));
    localStorage.setItem("price",$(this).attr('price'));
    if (localStorage.getItem("asset") !== $(this).attr('asset')) {
        $(".order_price").val(localStorage.getItem("price"));
        $(".order_quantity").val(0);
        $(".order_quantity_range").val(0);
        $(".crypto_mkt_buy").html('');
        $(".crypto_mkt_sell").html('');
    } 
    if ($(this).attr('aisa_options') == 'buy') {
        $(".order_price").val(localStorage.getItem("sell_price"));
    } else if ($(this).attr('aisa_options') == 'sell'){
        $(".order_price").val(localStorage.getItem("buy_price"));
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
    //bybit_mkt('Order Book',localStorage.getItem("asset"),'');

    account_mkt_balance(localStorage.getItem("aisa_options"));    
    
    localStorage.setItem("price_open",$(this).attr('price_open'));
    localStorage.setItem("day_high",$(this).attr('day_high'));
    localStorage.setItem("day_low",$(this).attr('day_low'));
    //$("#main_mkt").addClass("is-visible");    
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
    mkt_option_clicked = 1;
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

    $("#leanders_mkt").addClass("d-none");
    $("#oder_book").removeClass("d-none");
    $(".pills-home-tab").addClass("d-none");
    $(".pills-assets-tab").removeClass("d-none");

    $(".mkt_option").attr("asset",localStorage.getItem("asset"));
    $(".asset_info").html(''); 
    
    mkt_option_clicked = 1;
    $(".order_price").val(0);
    $(".order_quantity").val(0);
    $(".order_quantity_range").val(0);

    //$(".current_crypto_symbol").html(localStorage.getItem("asset")); 
    $(".crypto_mkt_buy").html('');
    $(".crypto_mkt_sell").html(''); 
    bybit_mkt('Order Book',localStorage.getItem("asset"),''); 
    //mysnackbar($(this).attr('asset'));
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
                                            $(".bitcoin_balance_price").html("$" + results[i].price);
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

                            let highest_buy_price = localStorage.getItem("buy_price");//USD
                            let BTC_balance = localStorage.getItem("bitcoin_balance");//BTC
                            $(".bitcoin_balance").html(BTC_balance);
                        
                            let USD_balance = (Number(BTC_balance)/1)*Number(highest_buy_price); //USD
                            USD_balance = USD_balance.toFixed(2);
                            $(".bitcoin_balance_usd").html(USD_balance);
                        
                            var usd_account_balance = (Number(localStorage.getItem("account_balance")) + Number(USD_balance));
                            usd_account_balance = usd_account_balance.toFixed(2);
                            $(".account_balance").html("$" + usd_account_balance);                            
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
                        $(".leanders_mkt_assets").html('');                        var results = response.result;
                        for (let i = 0; i < results.length; i++) {
                            //results[i].open
                            let symbol_pre_price = localStorage.getItem("" + results[i].symbol + "");// Get Symbol preveous price
                            if (symbol_pre_price != '' || symbol_pre_price != null) {
                                let price_now = results[i].last_price;
                                var chan_pri = 0.00;
                                var chan_pri_chart = "";
                                if (symbol_pre_price <= price_now) {
                                    var symbol_chan_pri = price_now - symbol_pre_price;
                                    chan_pri = (symbol_chan_pri/symbol_pre_price)*100;
                                    chan_pri = "+" + chan_pri.toFixed(4);
                                    chan_pri_chart = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
                                    var bg_ = "bg-soft-success";
                                    var chan_pri_bg = "bg-success";

                                } else if (symbol_pre_price >= price_now){
                                    var symbol_chan_pri = symbol_pre_price - price_now;
                                    chan_pri = (symbol_chan_pri/symbol_pre_price)*100;
                                    chan_pri = "-" + chan_pri.toFixed(4);
                                    chan_pri_chart = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-down"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
                                    var bg_ = "bg-soft-danger";
                                    var chan_pri_bg = "bg-danger";
                                }
                                localStorage.setItem("" + results[i].symbol + "",results[i].last_price);// Set Symbol its price
                            } else{
                                var chan_pri = 0.00;
                                var bg_ = "bg-light";
                                localStorage.setItem("" + results[i].symbol + "",results[i].last_price);// Set Symbol its price
                            }
                            
                            //leanders_mkt_assets
                            var leanders_mkt_assets = '<div class="card border-0 mb-5" id="'+ results[i].symbol + '">' +
                            '<ul class="nav nav-pills nav-fill  ' + bg_ + '">' +
                            '<li class="nav-item avatar">' +
                            '<img class="avatar-img" src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png" alt="">' +

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
                            '</li>' +
                            '<li class="btn-group" role="group">' +
                            '<a href="#" class="me-0 btn btn-sm btn-soft-success mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="buy">Buy</a>' +
                            '<a href="#" class="me-0 btn btn-sm btn-soft-danger mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="sell">Sell</a>' +
                            '<a href="#" class="me-0 btn btn-sm btn-soft-info mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results[i].low_price_24h + '" price_open="'+ results[i].bid_price + '" day_high="'+ results[i].high_price_24h + '"  price="'+ results[i].last_price + '" aisa_options="hold">Watch</a>' +
                            '</li>' +
                            '</ul>' +
                            '</div>';

                            $(".leanders_mkt_assets").append(leanders_mkt_assets);
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
    if (aisa_options =="buy") {
        //If it's buying I would buy from the seller on the sell side at the lowest sell_price
        if ($(".order_quantity").val() != '') {
            var order_usd_quantity = $(".order_quantity").val();//USD
        } else {
            var order_usd_quantity = localStorage.getItem("account_balance");//USD
        }
        if (order_usd_quantity <= localStorage.getItem("account_balance")) {
            var account_balance = localStorage.getItem("account_balance");//USD
            account_balance = Number(account_balance) - Number(order_usd_quantity);
            localStorage.setItem("account_balance",account_balance);//USD
    
            let lowest_sell_price = localStorage.getItem("sell_price"); //USD
            let btc_balance_fro_usd = (Number(order_usd_quantity)/Number(lowest_sell_price))*1; //BTC
            var bitcoin_balance_fro_usd = (Number(localStorage.getItem("bitcoin_balance")) + Number(btc_balance_fro_usd));
    
            bitcoin_balance_fro_usd = bitcoin_balance_fro_usd.toFixed(8);
            localStorage.setItem("bitcoin_balance",bitcoin_balance_fro_usd);//BTC
            var order_quantity = 0;
            order_quantity = order_quantity.toFixed(8);
            $(".order_quantity").val(order_quantity);
            $(".order_quantity_range").val(0);
        } else {
            $(".order_quantity").val(localStorage.getItem("account_balance"));
            mysnackbar("You do not have enough money");
            $(".order_quantity_range").val(0);
        }
    } else if (aisa_options =="sell") {
        if ($(".order_quantity").val() != '') {
            var order_btc_quantity = $(".order_quantity").val();//BTC
        } else {
            var order_btc_quantity = localStorage.getItem("bitcoin_balance");//BTC
        }
        if (order_btc_quantity <= localStorage.getItem("bitcoin_balance")) {
            var bitcoin_balance = localStorage.getItem("bitcoin_balance");//USD
            bitcoin_balance = Number(bitcoin_balance) - Number(order_btc_quantity);
            localStorage.setItem("bitcoin_balance",bitcoin_balance);//USD
    
            let highest_buy_price = localStorage.getItem("buy_price");//USD
            let usd_balance_fro_btc = (order_btc_quantity/1)*highest_buy_price; //USD
            var usd_account_balance_fro_btc = (Number(localStorage.getItem("account_balance")) + Number(usd_balance_fro_btc));
            
            usd_account_balance_fro_btc = usd_account_balance_fro_btc.toFixed(2);
            localStorage.setItem("account_balance",usd_account_balance_fro_btc);//USD
            var order_quantity = 0;
            order_quantity = order_quantity.toFixed(2);
            $(".order_quantity").val(order_quantity);
            $(".order_quantity_range").val(0);
        } else{
            $(".order_quantity").val(localStorage.getItem("bitcoin_balance"));
            mysnackbar("You do not have enough crypto");
            $(".order_quantity_range").val(0);
        }
    }//cordova create rebro_app com.benco.org Rebro
    /**let highest_buy_price = localStorage.getItem("buy_price");//USD
    let BTC_balance = localStorage.getItem("bitcoin_balance");//BTC
    $(".bitcoin_balance").html(BTC_balance);

    let USD_balance = (Number(BTC_balance)/1)*Number(highest_buy_price); //USD
    USD_balance = USD_balance.toFixed(2);
    $(".bitcoin_balance_usd").html(USD_balance);

    var usd_account_balance = (Number(localStorage.getItem("account_balance")) + Number(USD_balance));
    usd_account_balance = usd_account_balance.toFixed(2);
    $(".account_balance").html("$" + usd_account_balance); */
}
$("#pills-signin-tab").click(function(){
    $("#index_html").hide();
    $("#signin_html").show();
});
$("#pills-signup-tab").click(function(){
    $("#index_html").hide();
    $("#signup_html").show();
});
$(".pills-home-tab").click(function(){
    $("#main_mkt").addClass("is-visible");
    $("#leanders_mkt").addClass("d-none");
    $("#oder_book").removeClass("d-none");
    $(".pills-home-tab").addClass("d-none");
    $(".pills-assets-tab").removeClass("d-none");
});
$(".pills-assets-tab").click(function(){
    $("#main_mkt").addClass("is-visible");
    $("#leanders_mkt").removeClass("d-none");
    $("#oder_book").addClass("d-none");
    $(".pills-assets-tab").addClass("d-none");
    $(".pills-home-tab").removeClass("d-none");
}); 
$(document).on('input', '.order_quantity_range', function() {
    $(".order_quantity_range").val($(this).val());
    var max_va = $(this).val();// max 5 => 100%
    var order_quantity_pct = (max_va/5)*100;
    var account_balance = localStorage.getItem("account_balance");//USD
    var pct_account_balance = (Number(account_balance)*Number(order_quantity_pct))/100;
    pct_account_balance = pct_account_balance.toFixed(2);
    var bitcoin_balance = localStorage.getItem("bitcoin_balance");//BTC
    var pct_bitcoin_balance = (Number(bitcoin_balance) *Number(order_quantity_pct))/100;
    pct_bitcoin_balance = pct_bitcoin_balance.toFixed(8);
    if (localStorage.getItem("aisa_options") == "buy") {
        $(".order_quantity").val(pct_account_balance);
    } else {
        $(".order_quantity").val(pct_bitcoin_balance);
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


function mysnackbar(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");  
    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = text;  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
