var mkt_option_clicked = 0;
var lacal_asset_not_eq_to_this = 0;
var buy_asset_cliwecked = 0;

var api_server_url = localStorage.getItem("api_server_url");

//const TronWeb = require('tronweb');
//const tronWeb = new TronWeb({
    //fullHost: 'https://api.trongrid.io',
    //headers: { "TRON-PRO-API-KEY": '88d99c54-ad96-4421-97b8-76245145f3e9' }
//});
const fullNode = 'https://testhttpapi.tronex.io';
const solidityNode = 'https://testhttpapi.tronex.io';
const eventServer = 'https://testhttpapi.tronex.io';
const sideOptions = {
  fullNode: 'https://suntest.tronex.io',
  solidityNode: 'https://suntest.tronex.io',
  eventServer: 'https://suntest.tronex.io',
  mainGatewayAddress: 'TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU',
  sideGatewayAddress: 'TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX',
  sideChainId: '413AF23F37DA0D48234FDD43D89931E98E1144481B'
}
const tronWeb = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  {
    fullNode: sideOptions.fullNode,
    solidityNode: sideOptions.solidityNode,
    eventServer: sideOptions.eventServer,
    mainGatewayAddress: sideOptions.mainGatewayAddress,
    sideGatewayAddress: sideOptions.sideGatewayAddress,
    sideChainId: sideOptions.sideChainId
  }
);
/**const input = document.getElementsByClassName('order_quantity');
//const log = document.getElementById('values');

input.addEventListener('input', updateValue);

function updateValue(e) {
  //log.textContent = e.target.value;
  $(".order_quantity").val(e.target.value);
  account_mkt_evaluation(localStorage.getItem("aisa_options"));

} */
//const input_quantity = document.getElementsByClassName('order_quantity');
//const log = document.getElementById('values');

//input_quantity.addEventListener('input', update_quantityValue);

//const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
localStorage.setItem("asset_pre",0);                                 

var condition_aisa_options_cliked = 0;
$('.order_quantity').on('input',function(e){ 
    $(".order_quantity").val(e.target.value);
    condition_aisa_options_cliked = 1;
    account_mkt_evaluation(localStorage.getItem("aisa_options"));
});
$('.amount_to_deposit').on('input',function(e){ 
    $(".amount_to_deposit").val(e.target.value);
    amount_to_deposit_usd($(this).attr("intenti"));
});
$('.amount_to_withdraw').on('input',function(e){ 
    $(".amount_to_withdraw").val(e.target.value);
    amount_to_deposit_usd($(this).attr("intenti"));
});

$('.withdraw_address').on('input',function(e){ 
    $(".withdraw_address").val(e.target.value);
    //amount_to_deposit_usd($(this).attr("intenti"));
});
var withdraw_address_amount = 0;
$('.withdraw_address_amount').on('input',function(e){ 
    $(".withdraw_address_amount").val(e.target.value);
    withdraw_address_amount = Number($(".withdraw_address_amount").val());
    //var amount_to_deposit = Number($(".amount_to_deposit").val());
    withdraw_address_amount = withdraw_address_amount/Number(localStorage.getItem("exrate"));
    withdraw_address_amount = withdraw_address_amount.toFixed(2);
    $(".withdraw_address_amount_err").html('<span class="text-info">Withdraw <span class="text-warning">' + withdraw_address_amount + ' USDT</span> ?</span>');
    if (withdraw_address_amount == "" || withdraw_address_amount < 10) {
        $(".withdraw_address_amount_err").html('The minimum withdrawal amount is <span class="text-warning">10 USDT</span>');
    }
    //amount_to_deposit_usd($(this).attr("intenti"));
});
var button_loader = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>';

//https://silicon.createx.studio/assets/img/landing/conference/hero-video.mp4
$("body").delegate(".mkt_option","click",function(event){
    event.preventDefault();
    
        //alert($(".order_quantity").val());
        /**web3.eth.sendTransaction({from: '0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF', data: '0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF'})
        .once('sending', function(payload){
            alert("sending " + payload);
        })
        .once('sent', function(payload){
            alert("sent " + payload);

        })
        .once('transactionHash', function(hash){
            alert("transactionHash " + hash);

        })
        .once('receipt', function(receipt){ 
            alert("receipt " + receipt);

         })
        .on('confirmation', function(confNumber, receipt, latestBlockHash){ 
            alert("confirmation " + confNumber);

         })
        .on('error', function(error){ 
            alert("error " + error);

         })
        .then(function(receipt){
            alert("receipt " + receipt);

            // will be fired once the receipt is mined
        }); */

        $(".mkt_option").attr("price",$(this).attr('price'));
        localStorage.setItem("price",$(this).attr('price'));
        localStorage.setItem("price",$(this).attr('price'));

        localStorage.setItem("aisa_options",$(this).attr('aisa_options'));
        //$(".mkt_option").attr("asset",localStorage.getItem("asset"));    

        //localStorage.setItem("price_open",$(this).attr('price_open'));
        //localStorage.setItem("day_high",$(this).attr('day_high'));
        //localStorage.setItem("day_low",$(this).attr('day_low'));

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
            
        //$("#current_crypto_symbolModal").modal('toggle');


        if (localStorage.getItem("asset") != $(this).attr('asset')) {
            localStorage.setItem("asset",$(this).attr('asset'));

            lacal_asset_not_eq_to_this = 1;
            buy_asset_cliwecked = 1;
            $(".loader_center").show();
            $(".loader_span").html(localStorage.getItem("asset"));
            arybit('Query Kline',localStorage.getItem("asset"),'');
            //$("#current_crypto_symbolModal").modal('toggle');

        } else{
            condition_aisa_options_cliked = 1;
            account_mkt_evaluation(localStorage.getItem("aisa_options"));

            $("#current_crypto_symbolModal").modal('show');

        }
        $(".mkt_option").attr("asset",localStorage.getItem("asset"));    
        localStorage.setItem("price_open",$(this).attr('price_open'));
        localStorage.setItem("day_high",$(this).attr('day_high'));
        localStorage.setItem("day_low",$(this).attr('day_low'));

        
        /**localStorage.setItem("aisa_options",$(this).attr('aisa_options'));
        $(".mkt_option").attr("asset",localStorage.getItem("asset"));    

        localStorage.setItem("price_open",$(this).attr('price_open'));
        localStorage.setItem("day_high",$(this).attr('day_high'));
        localStorage.setItem("day_low",$(this).attr('day_low')); */

        var order_price = $(".order_price").val();
        if (localStorage.getItem("username") == null || localStorage.getItem("username") == "") {
            $(".mkt_err_evaluation").html("Please sign in to proceed");
            //mysnackbar("Please sign in to proceed");
        } else {
            if (order_price !== "") {
                $(".order_price").removeClass("is-invalid");
                $(".order_price").addClass("is-valid");
                var order_quantity = $(".order_quantity").val();
                //alert($(".order_quantity").val());
                //$(".order_quantity").val(pct_account_balance);

                if (order_quantity !== "") {
                    $(".order_quantity").removeClass("is-invalid");
                    $(".order_quantity").addClass("is-valid");
                    //account_mkt_evaluation(localStorage.getItem("aisa_options"));
                    account_mkt_balance(localStorage.getItem("aisa_options"));  
        
                } else {
                    $(".order_quantity").removeClass("is-valid");
                    $(".order_quantity").addClass("is-invalid");

                    $(".mkt_err_evaluation").html("Enter Quantity");

                    //mysnackbar("Enter Quantity");
    
                }
            } else {
                $(".order_price").removeClass("is-valid");
                $(".order_price").addClass("is-invalid");
            }
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

    condition_aisa_options_cliked = 1;
    account_mkt_evaluation(localStorage.getItem("aisa_options"));
    $("#current_crypto_symbolModal").modal('show');

       
    /**if ($(this).attr('order_book_side') =="Buy") {
        localStorage.setItem("aisa_options","sell");
        localStorage.setItem("price",$(this).attr('order_book_price'));

    } else {
        localStorage.setItem("aisa_options","buy");
        localStorage.setItem("price",$(this).attr('order_book_price'));

    }
    
    if ($(".order_price").val(localStorage.getItem("price")) == '' || $(".order_price").val(localStorage.getItem("price")) == null) {
        $(".order_price").val(localStorage.getItem("price"));  
    }
    arybit('Query Kline',localStorage.getItem("asset"),'');

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
    } */
});

$("body").delegate(".currency_option","click",function(event){
    event.preventDefault();
    localStorage.setItem("pr_exrate", localStorage.getItem("exrate"));
    $(".select_currency").html($(this).attr('cname'));
    $(".select_currency_price").html($(this).attr('exchange_rate') + " " + $(this).attr('ccode'));

    $(".select_country").html($(this).attr('country_name')); 
    $(".mcode").html($(this).attr('mcode'));
    localStorage.setItem("cname", $(this).attr('cname'));
    localStorage.setItem("mcode", $(this).attr('mcode'));
    localStorage.setItem("ccode", $(this).attr('ccode'));
    localStorage.setItem("exrate", $(this).attr('exchange_rate'));
    var account_balance = Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));
    if (account_balance.toFixed(2) < 1) {
        account_balance = account_balance.toFixed(4);
    } else {
        account_balance = account_balance.toFixed(2);                            
    }
    arybit('Query Kline',localStorage.getItem("asset"),'');

    localStorage.setItem("account_balance", account_balance);
    //mysnackbar(localStorage.getItem("asset"));
    //new_seriesData = [];
    //Query_Kline('Query Kline',localStorage.getItem("asset"),'');
    //$(".asset_info_candlestick").html('');
    //$("#simple-candlestick").html('');
    //new_seriesData = [];
    //mysnackbar(localStorage.getItem("asset"));
    //Order_Book();
    //Query_Kline_Book();
    //Query_Kline('Query Kline',localStorage.getItem("asset"),'');

});
$("body").delegate(".country_option","click",function(event){
    event.preventDefault();
    localStorage.setItem("pr_exrate", localStorage.getItem("exrate"));

    $(".select_country").html($(this).attr('country_name')); 
    $(".select_currency").html($(this).attr('exchange_rate') + " " + $(this).attr('cname'));
    $(".select_currency_price").html($(this).attr('ccode'));

    $(".mcode").html($(this).attr('mcode'));
    localStorage.setItem("mcode", $(this).attr('mcode'));
    localStorage.setItem("ccode", $(this).attr('ccode'));
    localStorage.setItem("exrate", $(this).attr('exchange_rate'));
    localStorage.setItem("cname", $(this).attr('cname'));
    var account_balance = Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));
    if (account_balance.toFixed(2) < 1) {
        account_balance = account_balance.toFixed(4);
    } else {
        account_balance = account_balance.toFixed(2);                            
    }
    arybit('Query Kline',localStorage.getItem("asset"),'');

    localStorage.setItem("account_balance", account_balance);
    //mysnackbar(localStorage.getItem("asset"));
    //new_seriesData = [];
    //Query_Kline('Query Kline',localStorage.getItem("asset"),'');
    //$(".asset_info_candlestick").html('');
    //$("#simple-candlestick").html('');
    //new_seriesData = [];
    //mysnackbar(localStorage.getItem("asset"));
    //Order_Book();
    //Query_Kline_Book();
    //Query_Kline('Query Kline',localStorage.getItem("asset"),'');

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
    var email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (email_format.test($(".gift_email").val()) && $(".gift_email").val() !='') {
        localStorage.setItem("gift_email",$(".gift_email").val());
        $(".gift_send").html(button_loader);
        send_email(localStorage.getItem("gift_email"),localStorage.getItem("username"),"gift_card");
    } else {
        mysnackbar("Enter a valid email address, e.g name@example.com"); 
    }    
});

var div_loader = '<div class="div_loader"></div>';
$("body").delegate(".account_activation","click",function(event){
    event.preventDefault();
    $(".account_activation").html(div_loader); 
    send_email(localStorage.getItem("email"),localStorage.getItem("username"),"account_activation");
});

$("body").delegate(".activation_code_button","click",function(event){
    event.preventDefault();
    if ($("#activation-code").val() == '') {
        $(".activation_code_button_err").html('Enter the code');
    } else {
        $(".activation_code_button_err").html('');
        $(".activation_code_button").html(button_loader);
        send_email(localStorage.getItem("email"),localStorage.getItem("username"),$("#activation-code").val());

    }    
});

$("body").delegate(".complete_account_authentication","click",function(event){
    event.preventDefault();
    if ($(".account_authentication_phone_number").val() == '') {
        $(".account_authentication_phone_numberfeedback").html('<span class="text-danger">Enter phone number</span>');
    } else {
        var phone_num = $(".account_authentication_phone_number").val();
        phone_num = "" + phone_num + "";
        if(phone_num.charAt(0) === "0"){
            phone_num = phone_num.replace(0, "");
        }
        if (phone_num.length < 9 || phone_num.length > 9) {
            $(".account_authentication_phone_numberfeedback").html('<span class="text-danger">Enter valid phone number</span>');

        } else {
            var mcode = localStorage.getItem("mcode");
            phone_num = mcode + "" + phone_num;
            $(".account_authentication_phone_numberfeedback").html('<span class="text-success">'+ phone_num + '</span>');
            $(".complete_account_authentication").html(button_loader);
            localStorage.setItem("user_phone", phone_num);

            send_email(localStorage.getItem("email"),localStorage.getItem("username"),'account_authentication');

        }      
    }    
});

$("body").delegate(".get_asset_assets","click",function(event){
    $("#main_mkt").removeClass("is-visible");
});
 
$("body").delegate(".get_asset","click",function(event){
    event.preventDefault();
    //alert($(this).attr('asset'));
    if (localStorage.getItem("asset") != $(this).attr('asset')) {
        localStorage.setItem("asset",$(this).attr('asset'));
        $(".mkt_option").attr("asset",localStorage.getItem("asset"));
        lacal_asset_not_eq_to_this = 1;
        buy_asset_cliwecked = 1;
        $(".loader_center").show();
        $(".loader_span").html(localStorage.getItem("asset"));
        arybit('Query Kline',localStorage.getItem("asset"),'');
    }
    //localStorage.setItem("asset",$(this).attr('asset'));

    //$(".loader_center").show();
    //$(".loader_span").html(localStorage.getItem("asset"));
    //arybit('Query Kline',localStorage.getItem("asset"),'');
 
    //mysnackbar(localStorage.getItem("asset"));
    //new_seriesData = [];
    //Query_Kline_Book();
    //Query_Kline('Query Kline',localStorage.getItem("asset"),'');
    //$(".asset_info_candlestick").html(''); 
    //$("#simple-candlestick").html('');
    //Order_Book();
    //Query_Kline_Book();  
    //Query_Kline('Query Kline',localStorage.getItem("asset"),'');
    /**$(".mkt_option").attr("asset",localStorage.getItem("asset"));
    $(".asset_info_candlestick").html(''); 
    $("#simple-candlestick").html('');
    new_seriesData = [];
    //Query_Kline('Query Kline',localStorage.getItem("asset"),'');

    mkt_option_clicked = 1;
    $(".order_price").val(0);
    $(".order_quantity").val(0);
    $(".order_quantity_range").val(0);

    $(".crypto_mkt_buy").html('');
    $(".crypto_mkt_sell").html(''); 
    bybit_mkt('Order Book',localStorage.getItem("asset"),''); */ 
});
var de_time = 5000;
localStorage.setItem("de_time",de_time);
$("body").delegate(".refresh_interval","click",function(event){
    event.preventDefault();
    $(".refresh_interval").removeClass("active");
    $(this).addClass("active");

    var u_de_time = de_time*Number($(this).attr('int_val'));
    localStorage.setItem("de_time",u_de_time);

    localStorage.setItem("interval",$(this).attr('interval'));

    arybit('Query Kline',localStorage.getItem("asset"),'');

 
});
$("body").delegate(".selected_recipient_type","click",function(event){
    event.preventDefault();
    $(".recipient_type").html("" + $(this).html()); 
    localStorage.setItem("selected_recipient_type",$(this).html());
    if (localStorage.getItem("selected_recipient_type") ==null || localStorage.getItem("selected_recipient_type") == "EMAIL") {
        localStorage.setItem("selected_recipient_type","EMAIL");
        $(".recipient_type").html("" + localStorage.getItem("selected_recipient_type")); 
        $(".entrer_email").show();
        $(".entrer_phoner").hide();
        $(".paypal_id").hide();
        $(".user_withdraw_email").val(localStorage.getItem("email"));

    } else if(localStorage.getItem("selected_recipient_type") == "PHONE") {
        $(".recipient_type").html("" + localStorage.getItem("selected_recipient_type")); 
        $(".entrer_email").hide();
        $(".paypal_id").hide();
        $(".entrer_phoner").show();

        //$(".user_withdraw_phone_number").val(localStorage.getItem("user_phone"));

    } else if(localStorage.getItem("selected_recipient_type") == "PAYPAL_ID") {
        $(".recipient_type").html("" + localStorage.getItem("selected_recipient_type")); 
        $(".entrer_phoner").hide();
        $(".entrer_email").hide();
        $(".paypal_id").show();

    }
});


document.getElementById("copy_deposit_address_Button").addEventListener("click", function() {
    copyToClipboardMsg(document.getElementById("deposit_address"), "msg");
    //var tronWebObj  = JSON.stringify(tronWeb.createAccount());
    //alert(tronWeb.isAddress("TJEE314hCxxYLGZZFtJE6iJAjwTQXKBjuk"));
    //tronWeb.getEventByTransactionID("78938dc73353a9a2cc45f7e20e4f9344f99e31bfcd5d54337a0bd9f2c8626604").then(result => {
        //alert(JSON.stringify(result));
    //});
    //alert(tronWeb.address.toHex("TW3gGESLzWYsLrJcJ6ZMNzx2qCPRgtkuSm"));
    //tronWeb.getEventResult("TJEE314hCxxYLGZZFtJE6iJAjwTQXKBjuk",{eventName:"RNGIterated",size:2}).then(result => {
        //alert(JSON.stringify(result));
    //})

    //alert(tronWeb.address.toHex("TW3gGESLzWYsLrJcJ6ZMNzx2qCPRgtkuSm"));
    //alert(tronWeb.address.fromHex("418840E6C55B9ADA326D211D818C34A994AECED808"));
    /**const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; //mainnet USDT contract
    let contract = await tronWeb.contract().at(trc20ContractAddress);
    
    //contract.[eventname].watch(callback) enventname is the name of the event of the contract
    await contract && contract.Transfer().watch((err, event) => {
      if(err)
        return alert('Error with "Message" event:'+ err);
     
        alert('New event received');
        alert('- Contract Address:'+event.contract);
        alert('- Event Name:'+ event.name);
        alert('- Transaction:'+event.transaction);
        alert('- Block number:'+event.block);
        alert('- Result:'+ event.result +'\n');
      //console.groupEnd();
    }); */

});


function copyToClipboardMsg(elem, msgElem) {
	  var succeed = copyToClipboard(elem);
    var msg;
    if (!succeed) {
        msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
    } else {
        msg = "Address copied to the clipboard."
    }
    if (typeof msgElem === "string") {
        msgElem = document.getElementById(msgElem);
    }
    msgElem.innerHTML = msg;
    setTimeout(function() {
        msgElem.innerHTML = "";
    }, 2000);
}

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

$("body").delegate(".proccess_withdrawal_address","click",function(event){
    event.preventDefault();
    if ($(".withdraw_address").val() == "") {
        $(".withdraw_address_err").html("Required!");
    } else if ($(".withdraw_address_amount").val() == "") {
        $(".withdraw_address_amount_err").html("Required!");
        $(".withdraw_address_err").html("");

    } else {
        if (withdraw_address_amount == "" || withdraw_address_amount < 10) {
            $(".withdraw_address_amount_err").html('The minimum withdrawal amount is <span class="text-warning">10 USDT</span>');
        } else {
            $(".withdraw_address_err").html("");
            //$(".withdraw_address_amount_err").html("");
    
            var amount_to_deposit = withdraw_address_amount;
            var selected_payment_option = localStorage.getItem("selected_crypto_network");
            var useremail_ = localStorage.getItem("selected_crypto_option");
            var proccessing_number = tronWeb.address.toHex($(".withdraw_address").val());
            var intent = 'deposit';
            $(".proccess_withdrawal_address").html(button_loader);
            //$(".withdraw_address_err").html(selected_payment_option + " selected_crypto_network " + useremail_);
            proccess_transaction(localStorage.getItem("cname"),localStorage.getItem("exrate"), amount_to_deposit,selected_payment_option,useremail_,proccessing_number,intent);               
        }        
        //
    }    
});

$("body").delegate(".selected_crypto_option","click",function(event){
    event.preventDefault();

    //var svg_src = $(this).attr("asset");
    let text = $(this).attr("asset");
    const myArray = text.split("USD");
    var et_svg = myArray[0];
    et_svg = et_svg.toLowerCase();
    var svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + et_svg + ".svg";

    if ($(this).attr("asset") == "BTCUSDT") {
        var asset_received = '<span>'+
        '<img src="https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png" class="rounded-circle" width="28" alt="Avatar"> USDT TetherUS' +
        '</span>';
        $(".crypto_option").html("" + asset_received);
    } else if ($(this).attr("asset") == "BTCUSD") {
        var asset_received = '<span>'+
        '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> BTC Bitcoin' + 
        '</span>';
        $(".crypto_option").html("" + asset_received);
    } else if ($(this).attr("asset") == "ETHUSD") {
        var asset_received = '<span>'+
        '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> ETH Ethereum' + 
        '</span>';
        $(".crypto_option").html("" + asset_received);
    }
     

    localStorage.setItem("selected_crypto_option",$(this).attr("asset"));
    
});

$("body").delegate(".selected_network_type","click",function(event){
    event.preventDefault();

    $(".network_type").html($(this).html());
    localStorage.setItem("selected_crypto_network",$(this).html());
    
});

$("body").delegate(".selected_payment_option","click",function(event){
    event.preventDefault();
    $(".payment_option").html("" + $(this).html()); 
    localStorage.setItem("selected_payment_option",$(this).html());
    $(".complete_trasaction").show();
    $(".complete_card_trasaction").hide();
    $(".complete_trasaction").html("Complete");
    if (localStorage.getItem("selected_payment_option") == "Paying with Paypal") {
        $(".paypal_btn_grp").removeClass("d-none");
    } else {
        $(".paypal_btn_grp").addClass("d-none");
    }
    if ($(this).html() == "Paying with M-Pesa") {
        $(".entrer_phoner").show();
        $(".entrer_email").hide();
        $(".entrer_cards").hide();
        $(".deposit_footer").show();
        $(".payment_option").removeClass("btn-secondary");
        $(".payment_option").removeClass("btn-danger");
        $(".payment_option").removeClass("btn-info");
        $(".payment_option").addClass("btn-success");
        
    } else if ($(this).html() == "Paying with Paypal"){
        $(".entrer_phoner").hide();
        $(".entrer_cards").hide();
        $(".deposit_footer").show();
        $(".entrer_email").show();
        $("#paypal-button-container").html('');

        $(".user_deposit_email").val(localStorage.getItem("user_email"));
        $(".user_withdraw_email").val(localStorage.getItem("user_email"));
        $(".payment_option").removeClass("btn-secondary");
        $(".payment_option").removeClass("btn-danger");
        $(".payment_option").removeClass("btn-success");
        $(".payment_option").addClass("btn-info");
    }  else if($(this).html() == "Paying with Card"){
        //entrer_cards
        $(".entrer_phoner").hide();
        $(".entrer_email").hide();
        $(".entrer_cards").show();
        $(".deposit_footer").show();
        $(".payment_option").removeClass("btn-info");
        $(".payment_option").removeClass("btn-danger");
        $(".payment_option").removeClass("btn-success");
        $(".payment_option").addClass("btn-secondary");

        $("#dropin-container").html("");

        //braintree_gettoken();
    } 
});
//var clientToken = '';

$(".complete_trasaction").click(function(){
    //alert(localStorage.getItem("email_account_activation") == 0);

    var intent = $(this).attr("intenti");
    $(".complete_trasaction").html(intent);

    if (username==null) {
        mysnackbar("Please login...");
    } else {
        if ($(this).attr("intenti") == "withdraw") {
            if ($(".amount_to_withdraw").val() == '') {
                $(".amount_to_withdraw").removeClass("is-valid");
                $(".amount_to_withdraw_feedback").removeClass("valid-feedback");
                $(".amount_to_withdraw").addClass("is-invalid");
                $(".amount_to_withdraw_feedback").addClass("invalid-feedback");
                $(".amount_to_withdraw_feedback").html("Please provide a valid amount.");
            }
        } else {
            if ($(".amount_to_deposit").val() == '') {
                $(".amount_to_deposit").removeClass("is-valid");
                $(".amount_to_deposit_feedback").removeClass("valid-feedback");
                $(".amount_to_deposit").addClass("is-invalid");
                $(".amount_to_deposit_feedback").addClass("invalid-feedback");
                $(".amount_to_deposit_feedback").html("Please provide a valid amount.");
            }
        }
        
        if ( localStorage.getItem("selected_payment_option") == null) {
            $(".payment_option").removeClass("btn-primary");
            $(".payment_option").addClass("btn-danger");
            mysnackbar("select payment option");
        } else {
            //$(".payment_option").removeClass("btn-danger");
            //$(".payment_option").addClass("btn-success");
            $(".payment_option").html(localStorage.getItem("selected_payment_option")); 
    
             
            if ($(this).attr("intenti") == "withdraw") {
                if ($(".amount_to_withdraw").val() == '') {
                    $(".amount_to_withdraw").removeClass("is-valid");
                    $(".amount_to_withdraw_feedback").removeClass("valid-feedback");
                    $(".amount_to_withdraw").addClass("is-invalid");
                    $(".amount_to_withdraw_feedback").addClass("invalid-feedback");
                    $(".amount_to_withdraw_feedback").html("Please provide a valid amount.");
                    var amount_to_deposit =0;
        
                } else {
                    $(".amount_to_withdraw").removeClass("is-invalid");
                    $(".amount_to_withdraw_feedback").removeClass("invalid-feedback");
                    $(".amount_to_withdraw").addClass("is-valid");
                    $(".amount_to_withdraw_feedback").addClass("valid-feedback");
                    $(".amount_to_withdraw_feedback").html("Looks good!");
                    var amount_to_deposit = Number($(".amount_to_withdraw").val());
                    //var amount_to_deposit = Number($(".amount_to_deposit").val());
                    amount_in_usd = amount_to_deposit/Number(localStorage.getItem("exrate"));
                    amount_in_usd = amount_in_usd.toFixed(2);
                    $(".amount_to_withdraw_feedback").html("$" + amount_in_usd + " will be withdrew.");
        
                }            
            } else {
                if ($(".amount_to_deposit").val() == '') {
                    $(".amount_to_deposit").removeClass("is-valid");
                    $(".amount_to_deposit_feedback").removeClass("valid-feedback");
                    $(".amount_to_deposit").addClass("is-invalid");
                    $(".amount_to_deposit_feedback").addClass("invalid-feedback");
                    $(".amount_to_deposit_feedback").html("Please provide a valid amount.");
                    var amount_to_deposit =0;
        
                } else {
                    $(".amount_to_deposit").removeClass("is-invalid");
                    $(".amount_to_deposit_feedback").removeClass("invalid-feedback");
                    $(".amount_to_deposit").addClass("is-valid");
                    $(".amount_to_deposit_feedback").addClass("valid-feedback");
                    $(".amount_to_deposit_feedback").html("Looks good!");
                    var amount_to_deposit = Number($(".amount_to_deposit").val());
                    amount_in_usd = amount_to_deposit/Number(localStorage.getItem("exrate"));
                    amount_in_usd = amount_in_usd.toFixed(2);
                    $(".amount_to_deposit_feedback").html("$" + amount_in_usd + " will be deposited.");
                }            
            }      
    
            var selected_payment_option  = localStorage.getItem("selected_payment_option");
    
            if (selected_payment_option == "Paying with M-Pesa") {
                $(".payment_option").removeClass("btn-danger");
                $(".payment_option").removeClass("btn-info");
                $(".payment_option").addClass("btn-success");
                $(".entrer_cards").hide();
                $(".entrer_email").hide();
                $(".entrer_phoner").show();                
                if ($(this).attr("intenti") == "withdraw") {
                    var user_phone_ = $(".user_withdraw_phone_number").val();
                } else {
                    var user_phone_ = $(".user_phone_number").val();
                }
                //var phone_num = $(".user_phone_number").val();
                var phone_num = "" + user_phone_ + "";
                if(phone_num.charAt(0) == "0"){
                    phone_num = phone_num.replace(0, "");
                }

                //alert(user_phone_ == '' || phone_num.length < 9 || phone_num.length > 9);
                //alert(phone_num);

                if (user_phone_ == '' || phone_num.length < 9 || phone_num.length > 9) {
                    if ($(this).attr("intenti") == "withdraw") {
                        $(".user_withdraw_phone_number").removeClass("is-valid");
                        $(".user_withdraw_phone_numberfeedback").removeClass("valid-feedback");
                        $(".user_withdraw_phone_number").addClass("is-invalid");
                        $(".user_withdraw_phone_numberfeedback").addClass("invalid-feedback");
                        $(".user_withdraw_phone_numberfeedback").html("Please provide a valid 10 digits phone number.");
                    } else {
                        $(".user_phone_number").removeClass("is-valid");
                        $(".user_phone_numberfeedback").removeClass("valid-feedback");
                        $(".user_phone_number").addClass("is-invalid");
                        $(".user_phone_numberfeedback").addClass("invalid-feedback");
                        $(".user_phone_numberfeedback").html("Please provide a valid 10 digits phone number.");
                        
                    }                
                } else {
                    if ($(this).attr("intenti") == "withdraw") {
                        $(".user_withdraw_phone_number").removeClass("is-invalid");
                        $(".user_withdraw_phone_numberfeedback").removeClass("invalid-feedback");
                        $(".user_withdraw_phone_numberfeedback").addClass("valid-feedback");
                        $(".user_withdraw_phone_number").addClass("is-valid");
                        var mcode = localStorage.getItem("mcode");
                        phone_num = mcode + "" + phone_num;
                        $(".user_withdraw_phone_numberfeedback").html(phone_num + " good!"); 
                    } else {
                        $(".user_phone_number").removeClass("is-invalid");
                        $(".user_phone_numberfeedback").removeClass("invalid-feedback");
                        $(".user_phone_numberfeedback").addClass("valid-feedback");
                        $(".user_phone_number").addClass("is-valid");
                        var mcode = localStorage.getItem("mcode");
                        phone_num = mcode + "" + phone_num;
                        $(".user_phone_numberfeedback").html(phone_num + " good!"); 
                    }
                    
                    localStorage.setItem("user_phone", phone_num);
    
                    var proccessing_number = "" + localStorage.getItem("user_phone") + "";
                    proccessing_number = "" + proccessing_number + "";
                    if(proccessing_number.charAt(0) == "+"){
                        proccessing_number = proccessing_number.replace("+", "");
                    }
    
                    complete_trasaction(amount_to_deposit,selected_payment_option,"useremail_",proccessing_number,intent);
                    
                }
            } else if (selected_payment_option == "Paying with Paypal") {
                $(".payment_option").removeClass("btn-danger");
                $(".payment_option").removeClass("btn-success");
                $(".payment_option").addClass("btn-info");
                $(".entrer_cards").hide();
                //$(".entrer_phoner").hide();
                if ($(this).attr("intenti") == "withdraw") {
                    if (amount_to_deposit == "" || amount_to_deposit < 1) {
                        mysnackbar("Enter valid amount");
                    } else {
                        if (localStorage.getItem("selected_recipient_type") ==null || localStorage.getItem("selected_recipient_type") == "EMAIL") {
                            localStorage.setItem("selected_recipient_type","EMAIL");                           
                            var email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                            if (email_format.test($(".user_withdraw_email").val()) && $(".user_withdraw_email").val() !='') {
                                var user_withdraw_email = $(".user_withdraw_email").val();
                                $(".user_withdraw_email").removeClass("is-invalid");
                                $(".user_withdraw_emailfeedback").removeClass("invalid-feedback");
                                $(".user_withdraw_emailfeedback").addClass("valid-feedback");
                                $(".user_withdraw_email").addClass("is-valid"); 
                                $(".user_withdraw_emailfeedback").html(user_withdraw_email);   
                                complete_trasaction(amount_to_deposit,selected_payment_option,localStorage.getItem("selected_recipient_type"),user_withdraw_email,intent);
                            } else {
                                $(".user_withdraw_email").removeClass("is-valid");
                                $(".user_withdraw_emailfeedback").removeClass("valid-feedback");
                                $(".user_withdraw_email").addClass("is-invalid");
                                $(".user_withdraw_emailfeedback").addClass("invalid-feedback");
                                $(".user_withdraw_emailfeedback").html("Please provide a valid email.");
                            }                    
                        } else if(localStorage.getItem("selected_recipient_type") == "PHONE") {
                            var user_phone_ = $(".user_withdraw_phone_number").val();
                            var phone_num = "" + user_phone_ + "";
                            if(phone_num.charAt(0) == "0"){
                                phone_num = phone_num.replace(0, "");
                            }
                            if (user_phone_ == '' || phone_num.length < 9 || phone_num.length > 9) {
                                $(".user_withdraw_phone_number").removeClass("is-valid");
                                $(".user_withdraw_phone_numberfeedback").removeClass("valid-feedback");
                                $(".user_withdraw_phone_number").addClass("is-invalid");
                                $(".user_withdraw_phone_numberfeedback").addClass("invalid-feedback");
                                $(".user_withdraw_phone_numberfeedback").html("Please provide a valid 10 digits phone number.");                
                            } else {
                                $(".user_withdraw_phone_number").removeClass("is-invalid");
                                $(".user_withdraw_phone_numberfeedback").removeClass("invalid-feedback");
                                $(".user_withdraw_phone_numberfeedback").addClass("valid-feedback");
                                $(".user_withdraw_phone_number").addClass("is-valid");
                                var mcode = localStorage.getItem("mcode");
                                phone_num = mcode + "" + phone_num;
                                $(".user_withdraw_phone_numberfeedback").html(phone_num + " good!"); 
                                
                                localStorage.setItem("user_phone", phone_num);
                
                                var proccessing_number = "" + localStorage.getItem("user_phone") + "";
                                proccessing_number = "" + proccessing_number + "";
                                if(proccessing_number.charAt(0) == "+"){
                                    proccessing_number = proccessing_number.replace("+", "");
                                }                
                                complete_trasaction(amount_to_deposit,selected_payment_option,localStorage.getItem("selected_recipient_type"),proccessing_number,intent);
                            }                    
                        } else if(localStorage.getItem("selected_recipient_type") == "PAYPAL_ID") {
                            $(".recipient_type").html("" + localStorage.getItem("selected_recipient_type")); 
                            $(".entrer_phoner").hide();
                            $(".entrer_email").hide();
                            $(".paypal_id").show();
                            if ($(".user_withdraw_paypal_id").val() !='') {
                                var user_withdraw_paypal_id = $(".user_withdraw_paypal_id").val();
                                $(".user_withdraw_paypal_id").removeClass("is-invalid");
                                $(".user_withdraw_paypal_idfeedback").removeClass("invalid-feedback");
                                $(".user_withdraw_paypal_idfeedback").addClass("valid-feedback");
                                $(".user_withdraw_paypal_id").addClass("is-valid"); 
                                $(".user_withdraw_paypal_idfeedback").html(user_withdraw_paypal_id);   
                                complete_trasaction(amount_to_deposit,selected_payment_option,localStorage.getItem("selected_recipient_type"),user_withdraw_paypal_id,intent);
                            } else {
                                $(".user_withdraw_paypal_id").removeClass("is-valid");
                                $(".user_withdraw_paypal_idfeedback").removeClass("valid-feedback");
                                $(".user_withdraw_paypal_id").addClass("is-invalid");
                                $(".user_withdraw_paypal_idfeedback").addClass("invalid-feedback");
                                $(".user_withdraw_paypal_idfeedback").html("Please provide a valid paypal id.");
                            }                    
                        }
                        
                    }
                } else {
                    if (amount_to_deposit == "" || amount_to_deposit < 1) {
                        mysnackbar("Enter valid amount");
                    } else {
                        $(".deposit_footer").hide();
    
                        var element = document.getElementById('paypal-button-container');
                        element.innerHTML = '';
    
                        paypal.Buttons({
                            // Sets up the transaction when a payment button is clicked
                            createOrder: function(data, actions) {
                              return actions.order.create({
                                purchase_units: [{
                                  amount: {
                                    value: '' + amount_in_usd + '' // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                                  }
                                }]
                              });
                            },
                            // Finalize the transaction after payer approval
                            onApprove: function(data, actions) {
                                return actions.order.capture().then(function(orderData) {
                                  // Successful capture! For dev/demo purposes:
                                  $(".deposit_footer").show();
                                  $(".complete_trasaction").show();
                                  $(".complete_trasaction").html(button_loader);
    
                                  //var element = document.getElementById('paypal-button-container');
                                      //element.innerHTML = JSON.stringify(orderData, null, 2);
                                      /**var element = document.getElementById('paypal-button-container');
                                      element.innerHTML = JSON.stringify(orderData, null, 2);
    
                                      var elementjson = { 
                                          "id": "2LD38181TF5660020", 
                                          "intent": "CAPTURE", 
                                          "status": "COMPLETED", 
                                          "purchase_units": [ 
                                              { 
                                                  "reference_id": "default", 
                                                  "amount": { "currency_code": "USD", "value": "0.01" },
                                                  "payee": { "email_address": "sb-bhmmj13327590@business.example.com", "merchant_id": "5CK94BM6JJ6Q2" },
                                                  "soft_descriptor": "PAYPAL *TEST STORE TES", 
                                                  "shipping": { 
                                                      "name": { "full_name": "Stephen Wambui" }, 
                                                      "address": { "address_line_1": "60 st", "admin_area_2": "Ngewa", "admin_area_1": "DE", "postal_code": "00901", "country_code": "KE" } 
                                                  }, 
                                                  "payments": { 
                                                      "captures": [ 
                                                          { 
                                                              "id": "14V8317388532025B", 
                                                              "status": "COMPLETED", 
                                                              "amount": { "currency_code": "USD", "value": "0.01" }, 
                                                              "final_capture": true, 
                                                              "disbursement_mode": "INSTANT", 
                                                              "seller_protection": { "status": "ELIGIBLE", "dispute_categories": [ "ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION" ] }, 
                                                              "create_time": "2022-02-11T11:19:25Z", 
                                                              "update_time": "2022-02-11T11:19:25Z" 
                                                          } 
                                                      ] 
                                                  } 
                                              } 
                                          ], 
                                          "payer": { 
                                              "name": { "given_name": "Stephen", "surname": "Wambui" }, 
                                              "email_address": "loliping21@gmail.com", 
                                              "payer_id": "32URW6PHSXGW2", 
                                              "address": { "country_code": "KE" } 
                                          }, 
                                          "create_time": "2022-02-11T11:10:09Z", 
                                          "update_time": "2022-02-11T11:19:25Z", 
                                          "links": [ { "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2LD38181TF5660020", "rel": "self", "method": "GET" } ] 
                                      }; */
    
                                      /**{ "id": "6U89135944570623Y", "intent": "CAPTURE", "status": "COMPLETED", "purchase_units": [ { "reference_id": "default", "amount": { "currency_code": "USD", "value": "10.00" }, "payee": { "email_address": "wambuistephen@outlook.com", "merchant_id": "7SWMQRBNCGS62" }, "soft_descriptor": "PAYPAL *ORAMLA", "shipping": { "name": { "full_name": "Stephen Wambui" }, "address": { "address_line_1": "60", "admin_area_2": "Ngewa", "admin_area_1": "Select region", "postal_code": "00901", "country_code": "KE" } }, "payments": { "captures": [ { "id": "91L58246WD634093A", "status": "COMPLETED", "amount": { "currency_code": "USD", "value": "10.00" }, "final_capture": true, "seller_protection": { "status": "NOT_ELIGIBLE" }, "create_time": "2022-03-07T18:17:47Z", "update_time": "2022-03-07T18:17:47Z" } ] } } ], "payer": { "name": { "given_name": "Stephen", "surname": "Wambui" }, "email_address": "karitustephen@gmail.com", "payer_id": "P9Z5XKWZ85JYY", "address": { "country_code": "KE" } }, "create_time": "2022-03-07T18:13:52Z", "update_time": "2022-03-07T18:17:47Z", "links": [ { "href": "https://api.paypal.com/v2/checkout/orders/6U89135944570623Y", "rel": "self", "method": "GET" } ] } */
                                      
                                      var orderData_id = orderData.id;
                                      var inteent = orderData.intent;
                                      var status = orderData.status;
                                      var email_address = orderData.purchase_units[0].payee.email_address;
                                      var merchant_id = orderData.purchase_units[0].payee.merchant_id;
                                      var full_name = orderData.purchase_units[0].shipping.name.full_name;
    
                                      var transaction = orderData.purchase_units[0].payments.captures[0];
    
                                      var transaction_id = transaction.id;
                                      var transaction_status = transaction.status;
                                      var transaction_amount = transaction.amount;
    
                                      var payer = orderData.payer;
                                      if (transaction_status == 'COMPLETED') {
                                        complete_trasaction(amount_to_deposit,selected_payment_option,'useremail_',orderData_id,intent);
                                      } else {
                                          
                                      }
    
                                      //alert(full_name);
    
                                      //alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
                                      //complete_trasaction(amount_to_deposit,selected_payment_option,'useremail_',transaction_id,intent);
        
                                  // When ready to go live, remove the alert and show a success message within this page. For example:
                                  // var element = document.getElementById('paypal-button-container');
                                  // element.innerHTML = '';
                                  // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                                  // Or go to another URL:  actions.redirect('thank_you.html');
                                });
                            }
                        }).render('#paypal-button-container');
                    } 
                }
                
                

                /**var email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var valid = 1;

                if ($(this).attr("intenti") == "withdraw") {
                    if (email_format.test($(".user_withdraw_email").val())) {
                        //$(".user_withdraw_email").val(localStorage.getItem("user_email"));
                        var useremail_ = $(".user_withdraw_email").val();
                        $(".user_withdraw_email").removeClass("is-invalid");
                        $(".user_withdraw_emailfeedback").removeClass("invalid-feedback");
                        $(".user_withdraw_emailfeedback").addClass("valid-feedback");
                        $(".user_withdraw_email").addClass("is-valid");                       
                        valid = 1;
                    } else {
                        $(".user_withdraw_email").removeClass("is-valid");
                        $(".user_withdraw_emailfeedback").removeClass("valid-feedback");
                        $(".user_withdraw_email").addClass("is-invalid");
                        $(".user_withdraw_emailfeedback").addClass("invalid-feedback");
                        $(".user_withdraw_emailfeedback").html("Please provide a valid email.");
                        valid = 0;
                    }
                } else {
                    if (email_format.test($(".user_deposit_email").val())) {
                        //$(".user_deposit_email").val(localStorage.getItem("user_email"));
                        var useremail_ = $(".user_deposit_email").val(); 
                        $(".user_deposit_email").removeClass("is-invalid");
                        $(".user_deposit_emailfeedback").removeClass("invalid-feedback");
                        $(".user_deposit_emailfeedback").addClass("valid-feedback");
                        $(".user_deposit_email").addClass("is-valid");
                        valid = 1;                   
                    } else {
                        $(".user_deposit_email").removeClass("is-valid");
                        $(".user_deposit_emailfeedback").removeClass("valid-feedback");
                        $(".user_deposit_email").addClass("is-invalid");
                        $(".user_deposit_emailfeedback").addClass("invalid-feedback");
                        $(".user_deposit_emailfeedback").html("Please provide a valid email.");
                        valid = 0;
                    }
                }
                if (valid == 1) {
                    complete_trasaction(amount_to_deposit,selected_payment_option,useremail_,"proccessing_number",intent);
                } */

            } else if(selected_payment_option == "Paying with Card"){
                $(".entrer_phoner").hide();
                $(".entrer_email").hide();
                $(".entrer_cards").show();
                if (amount_to_deposit == "" || amount_to_deposit < 1) {
                    mysnackbar("Enter valid amount");
                } else {
                    $("#dropin-container").html("Loading Cards...");
                    $(".complete_trasaction").html("please wait...");
                    braintree_gettoken(amount_in_usd,selected_payment_option,'','',intent);
                }
                
            }   
            
        }
    }
    
});

function complete_trasaction(amount_to_deposit,selected_payment_option,useremail_,proccessing_number,intent) {
    //alert(localStorage.getItem("email_account_activation"));
    if (amount_to_deposit == "" || amount_to_deposit < 1) {
        mysnackbar("Enter valid amount");
    } else if(localStorage.getItem("email_account_activation") == 0){
        if (selected_payment_option == "Paying with Card") {
            $(".complete_card_trasaction").removeClass("btn-primary");
            $(".complete_card_trasaction").addClass("btn-warning");
            $(".complete_card_trasaction").html(button_loader);
        } else {
            $(".complete_trasaction").removeClass("btn-primary");
            $(".complete_trasaction").addClass("btn-warning");
            $(".complete_trasaction").html(button_loader);
        }
        
        //$(".complete_trasaction").show();
        //$(".complete_card_trasaction").hide();
        proccess_transaction(localStorage.getItem("cname"),localStorage.getItem("exrate"), amount_to_deposit,selected_payment_option,useremail_,proccessing_number,intent);               
    } else {
        $(".user_phone_numberfeedback").html('<span class="text-danger ">Verify your email to continue funding!</span>');
    }
}

var local_asset = "";
var local_asset_time_min = '';
var seriesData = [];
var crypto_svgData = [];


var rebro_Aisha_url = window.location.hostname;//api_server_url;
var Aisha_url = 'https://arybit.com/cordova/arybit_Aisha.php';

$('#myform-check-1').on('change', ':checkbox', function () {
    if ($(this).is(':checked')) {
        //mysnackbar($(this).val() + ' on');
        localStorage.setItem("bot_notifications", 'true');
        $(".bot_activity").show();

    } else {
        //mysnackbar($(this).val() + ' off');
        localStorage.setItem("bot_notifications", 'false');
        $(".bot_activity").hide();

    }
});
$('#myform-check-2').on('change', ':checkbox', function () {
    if ($(this).is(':checked')) {
        mysnackbar($(this).val() + ' on');
        localStorage.setItem("bot_training", 'true');
    } else {
        mysnackbar($(this).val() + ' off');
        localStorage.setItem("bot_training", 'false');
    }
});
$('#myform-check-3').on('change', ':checkbox', function () {
    if ($(this).is(':checked')) {
        mysnackbar($(this).val() + ' on');
        localStorage.setItem("bot_trading", 'true');
    } else {
        mysnackbar($(this).val() + ' off');
        localStorage.setItem("bot_trading", 'false');
    }
});
localStorage.setItem("cad_bot_interval", 1);
localStorage.setItem("tradeview_bot_interval", "1m");

$("body").delegate(".bot_timer","click",function(event){
    event.preventDefault();
    //alert($(this).attr('bot_timer'));
    $(".bot_timer").removeClass("bg-primary");
    $(this).removeClass("bg-secondary");
    $(this).addClass("bg-primary");
    one_min_timmer = one_min_timmer*Number($(this).attr('bot_timer'));
    localStorage.setItem("bot_interval", one_min_timmer);
    localStorage.setItem("cad_bot_interval", $(this).attr('bot_timer'));

    var text = $(this).attr('bot_timer');
    text = text + "m";
    //text.replace(" ","");
    localStorage.setItem("asset_pre",0);   
    localStorage.setItem("tradeview_bot_interval", text);
    $(".bot_activity").html(text);

    //$(".bot_activity").html('');
    $(".bot_inter").html($(this).html());
    Query_Kline_Book();
});
var reset_all_models = 0;

$("body").delegate(".reset_all_models","click",function(event){
    event.preventDefault(); 
    $(".bot_activity").html('');
    localStorage.setItem("aisa_options","hold");
    reset_all_models = 1;
    Query_Kline_Book();
});




function rebro_Aisha(training,user_name,asset,aisa_options,price,price_open,day_high,day_low) {
    if (reset_all_models == 1) {
        reset_all_models = 0;
        var reset_training_models = "true";
    } else {
        var reset_training_models = "false";
    }
    //alert('response_mkt_message');


    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { price: price, price_open: price_open, day_high: day_high, day_low:day_low, options:aisa_options, asset:asset, user_name:user_name, training:training, reset_training_models: reset_training_models},
        processData: true,
        url: 'https://arybit.com/cordova/arybit_Aisha.php',
        success: function searchSuccess(response) { 
            try {
                //var bot_activity = '<li class="list-group-item">aisa_options ' + localStorage.getItem("aisa_options") + ' response ' + response.mkt_message + ' buy_price ' + localStorage.getItem("buy_price") + ' sell_price ' + localStorage.getItem("sell_price") + ' <span class="text-success">'+ new Date() + '</span.</li>';
                //mysnackbar("aisa_options " + localStorage.getItem("aisa_options") + " response " + response.mkt_message + " buy_price " + localStorage.getItem("buy_price") + " sell_price " + localStorage.getItem("sell_price"));
                var response_mkt_message = response.mkt_message;

                //alert(response_mkt_message);

                var str2 = response_mkt_message.replace(/\n|\r/g, " : ");
                //document.getElementById("demo").innerHTML = txt;
                const obj = JSON.parse(str2);                
                  
                var obj_smy = '';
                //obj_smy +=  response_mkt_message + "<br>";

                //obj_smy +=  obj.price + "<br>";
                //obj_smy +=  obj.price_open + "<br>";
                //obj_smy +=  obj.day_high + "<br>";
                //obj_smy +=  obj.day_low + "<br>";
                //obj_smy +=  obj.options + "<br>";
                //obj_smy +=  obj.aisha_options + "<br>";

                var obj_aisha_options = obj.aisha_options;
                obj_aisha_options = obj_aisha_options.replace("[","");
                obj_aisha_options = obj_aisha_options.replace("]","");
                
                var Predicted_value = '';
                const obj_aisha_options_myArray = obj_aisha_options.split(",");
                for (let index = 0; index < obj_aisha_options_myArray.length; index++) {
                    const element = obj_aisha_options_myArray[index];
                    obj_smy += element + "<br>";
                    const element_obj_aisha_options_myArray = element.split(":");
                    Predicted_value = element_obj_aisha_options_myArray[1];
                }
                //obj_smy += "Predicted_value " + Predicted_value + "<br>";


                //obj_smy +=  obj.training + "<br>";
                //obj_smy +=  obj.noaim + "<br>";
                //obj_smy +=  obj.noas + "<br>";

                var smy = obj.smy;
                smy = smy.replace(/Name/g,",,Name");
                smy = smy.replace(/Num/g,",,Num");
                smy = smy.replace(/1 pe/g,",,1 pe");
                smy = smy.replace(/2 pe/g,",,2 pe");
                smy = smy.replace(/3 pe/g,",,3 pe");
                smy = smy.replace(/4 ac/g,",,4 ac");
                smy = smy.replace(/Nom/g,",,Nom");

                const myArray = smy.split(",,");
                for (let index = 0; index < myArray.length; index++) {
                    const element = myArray[index];
                    if (index >= myArray.length - 8) {
                        //obj_smy += element + "<br>";
                    }
                }

                /**const f = myArray.entries();
                for (let x of f) {
                    obj_smy += x + "<br>";
                } */

                //obj_smy +=  obj.stock_data + "<br>";
                //obj_smy +=  obj.stock_training + "<br>";
                var order_quantity_pct  = localStorage.getItem("order_quantity_pct");
                if (localStorage.getItem("bot_trading") == "true") {
                    if (order_quantity_pct == null) {
                        var obj_smy_span = '<span class="text-danger">';
                        var obj_smy_span_e = '</span>';
                        obj_smy += obj_smy_span + "Enter the amount in % of the account balance " + obj_smy_span_e + "<br>";
                        
                        obj_smy_span = '<span class="text-primary">';
                        obj_smy_span_e = '</span>';
                        
                        obj_smy += obj_smy_span + '<input type="range" class="form-range order_quantity_range" min="0" max="5" step="0.5" id="customRange3r"> ' + obj_smy_span_e + "<br>";

                    
                    } else {
                        if (Predicted_value != aisa_options) {
                            var obj_smy_span = '<span class="text-primary">';
                            var obj_smy_span_e = '</span>';
                            obj_smy += obj_smy_span + "Market : " + aisa_options + " " + order_quantity_pct + "%, override " + Predicted_value + " " + localStorage.getItem("bot_trading")  + obj_smy_span_e + "<br>";
                        }
    
                        if (Predicted_value == "sell") {
                            var crypto_asset_balance = localStorage.getItem("asset");
                            crypto_asset_balance = "" + crypto_asset_balance + "_balance";
                            if(localStorage.getItem(crypto_asset_balance) == null) {
                                localStorage.setItem(crypto_asset_balance,0);//BTC
                            }                
                            var bitcoin_balance = localStorage.getItem(crypto_asset_balance);//BTC
                            
                            var pct_bitcoin_balance = (Number(bitcoin_balance) *Number(order_quantity_pct))/100;
                            pct_bitcoin_balance = pct_bitcoin_balance.toFixed(8);
                            if (localStorage.getItem(crypto_asset_balance) <= 0) {
                                var obj_smy_span = '<span class="text-info">';
                                var obj_smy_span_e = '</span>';
                                obj_smy += obj_smy_span + "Deficient " + localStorage.getItem("asset") + " Balance, try buying some" + obj_smy_span_e + "<br>";
                                                            
                            } else {
    
                                $(".order_quantity").val(pct_bitcoin_balance);
                                var obj_smy_span = '<span class="text-danger">';
                                var obj_smy_span_e = '</span>';
                                obj_smy += obj_smy_span + "Selling " + pct_bitcoin_balance + " " + order_quantity_pct + "% of " + bitcoin_balance + obj_smy_span_e + "<br>";
    
                            }                
                        } else if (Predicted_value == "buy"){
                            var account_balance = Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));//CC
                            
                            var pct_account_balance = (Number(account_balance)*Number(order_quantity_pct))/100;
                            pct_account_balance = pct_account_balance.toFixed(2);
                            if (localStorage.getItem("account_balance") <= 0) {
                                var obj_smy_span = '<span class="text-info">';
                                var obj_smy_span_e = '</span>';
                                obj_smy += obj_smy_span + "Insufficient balance, load your account." + obj_smy_span_e + "<br>";
    
                                display_account_action("show");
                            } else {
    
                                $(".order_quantity").val(pct_account_balance);
                                var obj_smy_span = '<span class="text-success">';
                                var obj_smy_span_e = '</span>';
                                obj_smy += obj_smy_span + "Buying " + pct_account_balance + " " + order_quantity_pct + "% of " + account_balance + obj_smy_span_e + "<br>";
                            }
                        } else {
                            var obj_smy_span = '<span class="text-warning">';
                            var obj_smy_span_e = '</span>';
                            obj_smy += obj_smy_span + "Holding " + order_quantity_pct + "%  " + obj_smy_span_e + "<br>";
    
                        }
                        account_mkt_balance(Predicted_value);
                    }
                    
                    //account_mkt_balance(Predicted_value);
                }

                var bot_activity = '<li class="list-group-item">' + obj_smy + ' <span class="text-success">'+ new Date() + '</span.</li>';
                $(".bot_activity").append(bot_activity);

                if (current_trading_click == 0) {
                    //localStorage.setItem("aisa_options","hold");
                } else {
                    current_trading_click = 0;
                }

                //$(".bot_activity").append("order_quantity_pct " + order_quantity_pct + " % of ");

                
                
                //localStorage.setItem("aisa_options","hold");
                //current_trading_click = 0;
                if (condition_aisa_options_cliked == 0) {
                    //localStorage.setItem("aisa_options","hold");
                } else {
                    condition_aisa_options_cliked = 0;
                }

            } catch (error) {
               // mysnackbar(error);
            }
        },
        error: function searchError(xhr, err) {
          //mysnackbar(" Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });   
}

function send_email(gift_email,username,main) {
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { gift_email: gift_email, username: username, main: main, user_phone:localStorage.getItem("user_phone")},
        processData: true,
        url: 'https://oramla.com/cordova/arybit.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {
                    //alert(response.validate_message);
                    if (main == "gift_card") {
                        $(".gift_send").html("Send invites");
                        $(".gift_email").val("");
                        mysnackbar(response.validate_message);

                    }else if (main == "account_activation") {
                        var account_activation = '<div class="card-body text-info">'+
                        '<h5 class="card-title">Verify Your Identity</h5>'+
                        '<p class="card-text">Get verified to enable account funding.</p>'+
                        '</div>';
                        $(".account_activation").html(account_activation);
                        $("#account_code_activation").modal('show');
                        mysnackbar(response.validate_message);

                    } else if(main == "account_authentication"){
                        if (response.validate_message) {
                            $(".account_authentication_phone_numberfeedback").html('<span class="text-success">'+ response.validate_message + '</span>');
                            $(".complete_account_authentication").html('Authenticate');
                            $("#account_authentication").modal('hide');
                            $(".method_account_authentication").hide();
                        }                        
                    } else {
                        if (response.validate_message == main) {
                            $(".activation_code_button").html('Verify code');
                            $("#account_code_activation").modal('hide');
                        } else {
                            $(".activation_code_button").html('Verify code');
                            $(".activation_code_button_err").html('Invalid code'); 
                        }
                    }
                    
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
                //mysnackbar('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
          //$('#app-cover-spin').hide(0);
          //mysnackbar("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}

//includes(2)
localStorage.setItem("limit", 200);
localStorage.setItem("interval", 1);
localStorage.setItem("bot_interval", 1);

var bot_called_from_timmer = 0;
var current_trading_click = 0;

var one_min_timmer = 60000;

function Query_Kline_Book() {
    //alert('Query_Kline_Book');
    new_seriesData = [];
    let text = window.location.href;
    const myArray = text.split("https://wallet.arybit.com/#");
    var et_svg = myArray[1];
    if (myArray.length > 1) {
        //localStorage.setItem("asset",et_svg);
    }
    bot_called_from_timmer = 1;
    arybit('Query Kline',localStorage.getItem("asset"),'');
    setTimeout(Query_Kline_Book, one_min_timmer);
}
var time_cuddle = 0;
var base_lengt = 0;
var caller = 0;

$(function() {
    $(document).on("change",".uploadFile", function() {
        var uploadFile = $(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
 
        if (/^image/.test( files[0].type)) { // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file
            reader.onloadend = function(){ // set image data as background of div
                var this_result = this.result;
                var formData = $(".fileToUploadForm").submit(function (e) {
                    return;
                });
                //formData[0] contain form data only 
                // You can directly make object via using form id but it require all ajax operation inside $("form").submit(<!-- Ajax Here   -->)
                var formData = new FormData(formData[0]);
                $.ajax({
                    url: api_server_url + '/cordova/upload_image_from_file.php?q=',
                    type: 'POST',
                    data: formData,
                    success: function (response) {

                        $(".username_pic").html('<img class="avatar-img" src="' + this_result + '" alt="#">');
                    },
                    error: function searchError(xhr, err) {
                        mysnackbar("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
                    },
                    contentType: false,
                    processData: false,
                    cache: false
                });

               // mysnackbar("image file selected");
            }                
        }
        else {
            mysnackbar("only image file");
        }

    });
});


//var buy_cliwecked_do=0;
function arybit(crypto,asset,aisa_options) {
    //alert(crypto);
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { crypto:crypto, asset: asset, limit: localStorage.getItem("limit"), de_time: localStorage.getItem("de_time"), interval: localStorage.getItem("interval"), aisa_options: aisa_options},
        processData: true,
        url: 'https://arybit.com/cordova/',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {                    

                    if (lacal_asset_not_eq_to_this == 1) {
                        lacal_asset_not_eq_to_this = 0;
                        $("#current_crypto_symbolModal").modal('show');
                    }

                    let text = localStorage.getItem("asset");
                    const myArray = text.split("USD");
                    var et_svg = myArray[0];
                    et_svg = et_svg.toLowerCase();
                    var svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + et_svg + ".svg";
                    //$(".card_img_asset").html('<img class="card-img-top" src="' + svg_src + '" alt="' + localStorage.getItem("asset") + '">');


                    var query_kline = response.query_kline;
                    if (query_kline !=null) {
                        $(".current_crypto_symbol").removeClass("bg-soft-danger");
                        $(".current_crypto_symbol").addClass("bg-soft-warning");
                        var results = query_kline;
                        var response_time_now = response.time_now;
                        var t_time = new Date(Number(response_time_now));
                        var trade_time = "" + t_time.getHours() + ":" + t_time.getMinutes() + ":" + t_time.getSeconds() + "";
                        var cusymbal = '';
                        new_leads_chart_params=0;
                        params=[];
                        base_lengt = results.length;
                        var trade_time_cu = '';
                        for (let i = 0; i < results.length; i++) {                            
                            let text1 = "" + results[i].open_time + "";
                            let text2 = "000";
                            let open_response_time_now = text1.concat("",text2);
                            var open_t_time = new Date(Number(open_response_time_now));
                            var open_trade_time = "" + open_t_time.getHours() + ":" + open_t_time.getMinutes() + ":" + open_t_time.getSeconds() + "";
                            trade_time_cu = open_trade_time;

                            var results_open = Number(results[i].open)*Number(localStorage.getItem("exrate"));
                            if (results_open.toFixed(2) < 1) {
                                results_open = results_open.toFixed(4);
                            } else {
                                results_open = results_open.toFixed(2);                            
                            }

                            var results_high = Number(results[i].high)*Number(localStorage.getItem("exrate"));
                            if (results_high.toFixed(2) < 1) {
                                results_high = results_high.toFixed(4);
                            } else {
                                results_high = results_high.toFixed(2);                            
                            }

                            var results_low = Number(results[i].low)*Number(localStorage.getItem("exrate"));
                            if (results_low.toFixed(2) < 1) {
                                results_low = results_low.toFixed(4);
                            } else {
                                results_low = results_low.toFixed(2);                            
                            }

                            var results_close = Number(results[i].close)*Number(localStorage.getItem("exrate"));
                            if (results_close.toFixed(2) < 1) {
                                results_close = results_close.toFixed(4);
                            } else {
                                results_close = results_close.toFixed(2);                            
                            }
                            
                            new_seriesData[i] = {
                                x: new Date(Number(open_response_time_now)),
                                y: [results_open, results_high, results_low, results_close]
                            };
                            params[i] = results_open;
                            
                            let text = results[i].symbol;
                            const myArray = text.split("USD");
                            var et_svg = myArray[0];
                            et_svg = et_svg.toLowerCase();
                            var svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + et_svg + ".svg";

                            if (i >= results.length-1) {
                                var asset_info = '<a class="text-primary position-relative mr-2" title="Symbol" href="#' + results[i].symbol + '">' + 
                                '<div class="rounded-circle" style="width: 32px; height: 32px;">'+
                                '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> '+ 
                                '</div>'+
                                '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">'+ results[i].symbol +'</span></a>'+                            
                                '<span class="text-info d-none d-xl-block position-relative" title="Interval">' + results[i].interval + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">Interval</span></span>'+
                                '<span class="text-info d-none d-xl-block position-relative" title="Open time">' + open_trade_time + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">Open time</span></span>'+
                                '<span class="text-primary position-relative mr-2" title="' + results[i].interval + 'Min Open">' + results_open + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">' + results[i].interval + 'Min Open</span></span>'+
                                '<span class="text-success position-relative mr-2" title="' + results[i].interval + 'Min High">' + results_high + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">' + results[i].interval + 'Min High</span></span>'+
                                '<span class="text-danger position-relative mr-2" title="' + results[i].interval + 'Min Low">' + results_low + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">' + results[i].interval + 'Min Low</span></span>'+
                                '<span class="text-warning position-relative" title="' + results[i].interval + 'Min Clase">' + results_close + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">' + results[i].interval + 'Min Close</span></span>'+
                                '<span class="text-info d-none d-xl-block position-relative" title="Volume">' + results[i].volume + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">Volume</span></span>'+
                                '<span class="text-info d-none d-xl-block position-relative" title="Turnover">' + results[i].turnover + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">Turnover</span></span>'+
                                '<span class="text-info d-none d-xl-block position-relative" title="Time">' + trade_time + '<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill">Time</span></span>'+
                                '';
                                localStorage.setItem("price_open",results_open);
                                $(".mkt_option").attr("price_open",localStorage.getItem("price_open"));
                                localStorage.setItem("day_high",results_high);
                                $(".mkt_option").attr("day_high",localStorage.getItem("day_high"));
                                localStorage.setItem("day_low",results_low);
                                $(".mkt_option").attr("day_low",localStorage.getItem("day_low"));
                                localStorage.setItem("day_close",results_close);
                                $(".asset_info_candlestick").html('');
                                $(".asset_info_candlestick").append(asset_info);
                                time_cuddle = open_response_time_now;
                                cusymbal = results[i].symbol 
                            }                            
                        }
                        if (cusymbal == localStorage.getItem("asset")) {
                            $("#leanders_mkt").addClass("d-none");
                            $("#leanders_mkt_c").removeClass("d-none");
                            condition_params = 0;
                            $("#leanders_mkt_c").addClass("d-none");
                            $("#leanders_mkt").removeClass("d-none");
                            //simple_candlestick(new_seriesData); 
                            //show_charts_cry('','','',new_seriesData);

                        } else {
                            new_leads_chart_params=0;
                            params=[];
                            condition_params = 1;
                            $("#leanders_mkt_c").addClass("d-none");
                            $("#leanders_mkt").removeClass("d-none");
                        }                                   
                    } else{
                        if (cusymbal_condition_params != localStorage.getItem("asset")) {
                            cusymbal_condition_params = localStorage.getItem("asset");
                            new_leads_chart_params=0;
                            params=[];
                        }
                        condition_params = 1;
                        $("#leanders_mkt_c").addClass("d-none");
                        $("#leanders_mkt").removeClass("d-none");

                        $(".current_crypto_symbol").removeClass("bg-soft-warning");
                        $(".current_crypto_symbol").addClass("bg-soft-danger");
                    }

                    var order_book = response.order_book;
                    if (order_book !=null> 0) {

                        let text = localStorage.getItem("asset");
                        const myArray = text.split("USD");
                        var et_svg = myArray[0];
                        et_svg = et_svg.toLowerCase();
                        var svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + et_svg + ".svg";

                        
                        var current_crypto_symbol = '<span class="">' + 
                        '<span class="rounded-circle" style="width: 32px; height: 32px;">'+
                        '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> ' + 
                        '</span>' + localStorage.getItem("asset") + ' <span class="id_' + localStorage.getItem("asset") + '"></span></span>';

                        var cur_crypto_symbol = '<span class="">' + 
                        '<span class="rounded-circle" style="width: 32px; height: 32px;">'+
                        '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> ' + 
                        '</span>' + localStorage.getItem("asset") + '</span>';

                        var acc_crypto_symbol = '<span class="">' + 
                        '<span class="rounded-circle" style="width: 32px; height: 32px;">'+
                        '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> ' + 
                        '</span>' + localStorage.getItem("asset") + ' <br> at <span class="id_' + localStorage.getItem("asset") + '"></span></span>';

                        //var asseimg = ;
                        $(".cur_crypto_symbol").html(cur_crypto_symbol);
                        $(".current_crypto_symbol").html(current_crypto_symbol);
                        $(".acc_crypto_symbol").html(acc_crypto_symbol);

                        var results = order_book;
                        $(".crypto_mkt_buy").html('');
                        $(".crypto_mkt_sell").html('');
                        var response_time_now = response.time_now;
                        var t_time = new Date(Number(response_time_now));
                        var trade_time = "" + t_time.getHours() + ":" + t_time.getMinutes() + ":" + t_time.getSeconds() + "";
                        let buy_price_i = 0;
                        let sell_price_i = 0;
                        var crypto_symbol = '';
                        
                        for (let i = 0; i < results.length; i++) {                           
                            crypto_symbol = results[i].symbol;

                            var results_price = Number(results[i].price)*Number(localStorage.getItem("exrate"));
                            if (results_price.toFixed(2) < 1) {
                                results_price = results_price.toFixed(4);
                            } else {
                                results_price = results_price.toFixed(2);                            
                            }

                            let text = results[i].symbol;
                            const myArray = text.split("USD");
                            var et_svg = myArray[0];
                            et_svg = et_svg.toLowerCase();
                            var svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + et_svg + ".svg";

                            if (crypto_symbol == localStorage.getItem("asset")) {
                                if (results[i].side == 'Buy') {
                                    var order_book = '<li class="list-group-item d-flex justify-content-between align-items-center order_book_mkt" order_book_side="' + results[i].side + '" order_book_price="' + results_price + '">'+
                                    '<span class="text-primary">' + 
                                    '<div class="rounded-circle" style="width: 32px; height: 32px;">'+
                                    '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> '+ 
                                    '</div>'+ results[i].symbol +'</span>'+
                                    '<span class="text-info">' + results_price + '</span>'+
                                    '<span class="text-warning">' + results[i].size + '</span>'+
                                    '<span class="text-success"><small>' + trade_time + '</small></span>'+
                                    '</li>';
                                    if (buy_price_i < 1) {
                                        $(".mkt_option").attr("price",results_price);

                                        localStorage.setItem("buy_price",results_price);
                                    }
                                    buy_price_i++;
                                    $(".crypto_mkt_buy").append(order_book);
                                } else {
                                    var order_book = '<li class="list-group-item d-flex justify-content-between align-items-center order_book_mkt" order_book_side="' + results[i].side + '" order_book_price="' + results_price + '">'+
                                    '<span class="text-primary">' + 
                                    '<div class="rounded-circle" style="width: 32px; height: 32px;">'+
                                    '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> '+ 
                                    '</div>'+ results[i].symbol +'</span>'+
                                    '<span class="text-info">' + results_price + '</span>'+
                                    '<span class="text-warning">' + results[i].size + '</span>'+
                                    '<span class="text-danger"><small>' + trade_time + '</small></span>'+
                                    '</li>';
                                    if (sell_price_i < 1) {
                                        if (mkt_option_clicked == 1) {
                                            mkt_option_clicked = 0;
                                        } else {
                                            localStorage.setItem("sell_price",results_price);
                                            localStorage.setItem("price",results_price);
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
                        }  
                      
                    }
                    var latest_info = response.latest_info;
                    if (latest_info !=null) {
                        $(".leanders_mkt_assets").html('');
                        $(".crypto_you_own").html('');
                        $(".crypto_wacthlist").html('');

                        var results = latest_info;
                        var potential_usd_account_balance = localStorage.getItem("usd_account_balance");

                        var tab_count_assets = 0;
                        var tab_count_wacthlist = 0;
                        var new_account_balanceData_asset=[];
                        //account_balance_potential_usd_account_balance
                        //localStorage.setItem("usd_account_balance", Number(localStorage.getItem("account_balance"))/Number(localStorage.getItem("exrate")));

                        new_account_balanceData_asset[tab_count_assets] = {
                            //"account_balance": Number(localStorage.getItem("account_balance"))/Number(localStorage.getItem("exrate")),
                            "initial_balance": localStorage.getItem("initial_balance"),
                            "account_balance": localStorage.getItem("usd_account_balance"),
                            "coin_usd_value": localStorage.getItem("exrate"),
                            "account_balance_symbol" : localStorage.getItem("ccode"),
                            "price": ["results_bid_price", "results_high_price_24h", "results_low_price_24h", "results_last_price"]
                        };                        
                        $(".tab_count_assets").html(tab_count_assets);
                        $(".tab_count_wacthlist").html(tab_count_wacthlist);
                        var now_aac =Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));
                        now_aac = now_aac.toFixed(2);

                        $(".account_balance").html(localStorage.getItem("ccode") + " " + now_aac + '');

                        //localStorage.setItem("usd_account_balance", Number(localStorage.getItem("account_balance"))/Number(localStorage.getItem("exrate")));

                        var ta_asset_value = 0;
                        //var ta_asset_cage_pct = 0;

                        var total_asset_acc_balance = 0;
                        //alert("crypto_account_data " + new_account_balanceData_asset);

                        var tab_count_ = new_account_balanceData_asset.length;
                        for (let i = 0; i < results.length; i++) {
                            var results_last_price = Number(results[i].last_price)*Number(localStorage.getItem("exrate"));
                            if (results_last_price.toFixed(2) < 1) {
                                results_last_price = results_last_price.toFixed(4);
                            } else {
                                results_last_price = results_last_price.toFixed(2);
                            }

                            var results_low_price_24h = Number(results[i].low_price_24h)*Number(localStorage.getItem("exrate"));
                            if (results_low_price_24h.toFixed(2) < 1) {
                                results_low_price_24h = results_low_price_24h.toFixed(4);
                            } else {
                                results_low_price_24h = results_low_price_24h.toFixed(2);
                            }

                            var results_bid_price = Number(results[i].bid_price)*Number(localStorage.getItem("exrate"));
                            if (results_bid_price.toFixed(2) < 1) {
                                results_bid_price = results_bid_price.toFixed(4);
                            } else {
                                results_bid_price = results_bid_price.toFixed(2);                            
                            }

                            var results_high_price_24h = Number(results[i].high_price_24h)*Number(localStorage.getItem("exrate"));
                            if (results_high_price_24h.toFixed(2) < 1) {
                                results_high_price_24h = results_high_price_24h.toFixed(4);
                            } else {
                                results_high_price_24h = results_high_price_24h.toFixed(2);                            
                            }

                            let text = results[i].symbol;
                            const myArray = text.split("USD");
                            var et_svg = myArray[0];
                            et_svg = et_svg.toLowerCase();
                            var svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + et_svg + ".svg";

                            let symbol_pre_price = localStorage.getItem("" + results[i].symbol + "");// Get Symbol preveous price
                            if (symbol_pre_price == null) {
                                symbol_pre_price = 0;
                                caller = 0;
                            } else{                                
                                if (localStorage.getItem("exrate") != localStorage.getItem("pr_exrate")){
                                    //chan_pri = 0.00;
                                    symbol_pre_price = symbol_pre_price/Number(localStorage.getItem("pr_exrate"));
                                    symbol_pre_price = symbol_pre_price*Number(localStorage.getItem("exrate"));    
                                }
                                caller = 1;
                            }
                            

                            if (symbol_pre_price != '' || symbol_pre_price != null) {
                                let price_now = results_last_price;
                                var chan_pri = 0.00;
                                var chan_pri_chart = "";
                                var wacthlist_prct_bg = "";
                                var wacthlist_prct = 0.00;

                                if (symbol_pre_price < price_now) {
                                    var symbol_chan_pri = price_now - symbol_pre_price;

                                    //alert(localStorage.getItem("exrate") != localStorage.getItem("pr_exrate"));

                                    if (symbol_pre_price == 0 ) {
                                        chan_pri = 0.00;

                                    } else {
                                        chan_pri = (symbol_chan_pri/symbol_pre_price)*100; 
                                    }
                                    //Infinity
                                    //alert(chan_pri);
                                    chan_pri = "+" + chan_pri.toFixed(4);
                                    chan_pri_chart = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
                                    var bg_ = "bg-soft-success";
                                    var chan_pri_bg = "bg-success";
                                    wacthlist_prct_bg = "success";
                                    if (current_trading_click == 0) {                                        
                                        //localStorage.setItem("aisa_options","sell");
                                    }
                                    localStorage.setItem("aisa_options","sell");

                                    //alert("success " + chan_pri);

                                } else if (symbol_pre_price == price_now){
                                    var symbol_chan_pri = symbol_pre_price - price_now;
                                    chan_pri = (symbol_chan_pri/symbol_pre_price)*100;
                                    chan_pri = "-" + chan_pri.toFixed(4);
                                    chan_pri_chart = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
                                    var bg_ = "bg-soft-secondary";
                                    var chan_pri_bg = "bg-secondary";
                                    wacthlist_prct_bg = "secondary";
                                    if (current_trading_click == 0) {                                        
                                        //localStorage.setItem("aisa_options","hold");
                                    }
                                    localStorage.setItem("aisa_options","hold");


                                } else if (symbol_pre_price > price_now){
                                    var symbol_chan_pri = symbol_pre_price - price_now;
                                    chan_pri = (symbol_chan_pri/symbol_pre_price)*100;
                                    chan_pri = "-" + chan_pri.toFixed(4);
                                    chan_pri_chart = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-down"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
                                    var bg_ = "bg-soft-danger";
                                    var chan_pri_bg = "bg-danger";
                                    wacthlist_prct_bg = "danger";
                                    
                                    if (current_trading_click == 0) {                                        
                                       // localStorage.setItem("aisa_options","buy");
                                    }
                                    localStorage.setItem("aisa_options","buy");



                                   // alert("danger " + chan_pri);

                                }
                                
                                wacthlist_prct = chan_pri;

                                localStorage.setItem("" + results[i].symbol + "",results_last_price);// Set Symbol its price
                               
                                if (bot_called_from_timmer == 1 && current_trading_click == 0) {
                                    bot_called_from_timmer = 0;
                                    rebro_Aisha(localStorage.getItem("bot_training"),localStorage.getItem("username"),localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
                                }

                            } else{
                                var chan_pri = 0.00;
                                var bg_ = "bg-light";
                                localStorage.setItem("" + results[i].symbol + "",results_last_price);// Set Symbol its price
                            }

                            var crypto_asset_balance = "" + results[i].symbol + "_balance";

                            if (localStorage.getItem(crypto_asset_balance) == null) {
                               var group_btr = '<li class="btn-group" role="group">' +
                               '<a href="" class="me-0 btn btn-sm btn-soft-success mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results_low_price_24h + '" price_open="'+ results_bid_price + '" day_high="'+ results_high_price_24h + '"  price="'+ results_last_price + '" aisa_options="buy">Buy</a>' +
                               '</li>'; 
                            } else if (localStorage.getItem(crypto_asset_balance) ==0){
                                var group_btr = '<li class="btn-group" role="group">' +
                                '<a href="" class="me-0 btn btn-sm btn-soft-success mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results_low_price_24h + '" price_open="'+ results_bid_price + '" day_high="'+ results_high_price_24h + '"  price="'+ results_last_price + '" aisa_options="buy">Buy</a>' +
                                '</li>';
                            } else {
                                var group_btr = '<li class="btn-group" role="group">' +
                               '<a href="" class="d-none d-lg-block me-0 btn btn-sm btn-soft-success mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results_low_price_24h + '" price_open="'+ results_bid_price + '" day_high="'+ results_high_price_24h + '"  price="'+ results_last_price + '" aisa_options="buy">Buy</a>' +
                               '<a href="" class="me-0 btn btn-sm btn-soft-danger mkt_option get_asset_assets" asset="'+ results[i].symbol + '" day_low="'+ results_low_price_24h + '" price_open="'+ results_bid_price + '" day_high="'+ results_high_price_24h + '"  price="'+ results_last_price + '" aisa_options="sell">Sell</a>' +
                               '</li>';
                            }                            
                            
                            if (localStorage.getItem("asset") == results[i].symbol) {
                                $(".cur_crypto_symbol_price").html(localStorage.getItem("ccode") + ' ' + results_last_price);
                                $(".cur_crypto_symbol_change").html('<span class="text-' + wacthlist_prct_bg + ' me-2"><i class="mdi mdi-arrow-down-bold"></i> '+ chan_pri + '%</span>');
                                
                                if (condition_params == 1) {
                                    if (params.length > base_lengt) {
                                        params.shift();
                                        new_leads_chart_params = params.length;
                                    }                             
                                    params[new_leads_chart_params] = results_last_price;
    
                                }
                                if (localStorage.getItem("asset") !=localStorage.getItem("asset_pre")) {
                                    new TradingView.widget( {
                                        "autosize": true,
                                        "symbol": "BYBIT:" + localStorage.getItem("asset") + "",
                                        "interval": "" + localStorage.getItem("cad_bot_interval") + "",
                                        "timezone": "Etc/UTC",
                                        "theme": "dark",
                                        "style": "1",
                                        "locale": "en",
                                        "toolbar_bg": "#f1f3f6",
                                        "enable_publishing": false,
                                        "allow_symbol_change": true,
                                        "container_id": "tradingview_39940"
                                    });
                                    var script_data = '<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js" async>{"symbol": "BYBIT:' + localStorage.getItem("asset") + '","width": 350,"colorTheme": "dark","isTransparent": true,"locale": "en"}</script>';
                                    $("#script_data").html(script_data); 

                                    var technical_script_data = '<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>{"interval": "' + localStorage.getItem("tradeview_bot_interval") + '","width": "425","isTransparent": true,"height": "450","symbol": "BYBIT:' + localStorage.getItem("asset") + '","showIntervalTabs": true,"locale": "en","colorTheme": "dark"}</script>';
                                    $("#technical_script_data").html(technical_script_data); 

                                    localStorage.setItem("asset_pre",localStorage.getItem("asset"));                                 
                                }

                                

                                //var jsonScript = document.querySelector('script[id="data"]');
                                // parse the json-data element into a JS object
                                //var json = JSON.parse(jsonScript.innerHTML);
                                
                                // Set the object properties as required
                                //json["symbol"] = "BYBIT:" + localStorage.getItem("asset") + "";
                                //json["description"] = "My description"
                                
                                // write out the object back to the script tag (with pretty formatting)
                                // check in your browser developer tools to see the modified tag
                                //jsonScript.innerHTML = JSON.stringify(json, null, 2);


                                //localStorage.setItem("" + results[i].symbol + "",results_last_price);// Set Symbol its price

                                //show_charts_cry(params,'update',results[i].symbol,new_seriesData);
                                //new_leads_chart(params,'update');

                                //dash_revenue_chart(params,results[i].symbol);

                                //simple_candlestick(new_seriesData);
                                
                            }

                            var leanders_mkt_assets = '<div class="card border-0 mb-5" id="'+ results[i].symbol + '">' +
                            '<ul class="nav nav-pills nav-fill  ' + bg_ + '">' +
                            '<li class="nav-item avatar">' +
                            '<div class="rounded-circle" style="width: 32px; height: 32px;">'+
                            '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> '+  
                            '</div> ' + results[i].symbol +                            
                            '</li>' +
                            '<li class="nav-item ">' +
                            '<a class="nav-link" href="">' + localStorage.getItem("ccode") + ' '+ results_last_price + ' </a>' +
                            '</li>' +
                            '<li class="nav-item d-none d-lg-block d-md-block">' +
                            '<span class="badge ' + chan_pri_bg + '">'+ chan_pri + '%</span>' +
                            '<span class="">'+ chan_pri_chart + '</span>' +
                            '</li>' + group_btr +
                            '</ul>' +
                            '</div>';

                            $(".id_" + results[i].symbol + "").html(localStorage.getItem("ccode") + ' '+ results_last_price + ' <i class="text-' + wacthlist_prct_bg + '">' + wacthlist_prct + '%</i>' );
                            $(".get_asset_id_" + results[i].symbol + "").html(group_btr);

                            $(".leanders_mkt_assets").append(leanders_mkt_assets);

                            //$(".account_balance").html(localStorage.getItem("ccode") + " " + potential_usd_account_balance);

                            if(localStorage.getItem(crypto_asset_balance) == null) {

                            } else if(localStorage.getItem(crypto_asset_balance) < 0 || localStorage.getItem(crypto_asset_balance) == 0 || localStorage.getItem(crypto_asset_balance) == "null" ) {
                                tab_count_wacthlist++;
                                $(".tab_count_wacthlist").html(tab_count_wacthlist);

                                localStorage.setItem(crypto_asset_balance,0);


                                var crypto_wacthlist = '<li class="list-group-item d-flex justify-content-between align-items-center">' +
                                '<span class="text-primary">' +
                                '<div class="rounded-circle" style="width: 32px; height: 32px;">'+
                                '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar">' +
                                '</div>' + 
                                '<a href="#' + results[i].symbol + '">' + results[i].symbol + '</a>' +
                                '</span>' +
                                '<span class="text-' + wacthlist_prct_bg + '">' + wacthlist_prct + '%</span>' +
                                '<span class="text-info">' + localStorage.getItem("ccode") + ' ' + results_last_price + '</span>' +
                                
                                '<span class="">' +
                                '<a href="" class="btn btn-sm btn-soft-success mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results_low_price_24h + '" price_open="'+ results_bid_price + '" day_high="'+ results_high_price_24h + '"  price="'+ results_last_price + '" aisa_options="buy">Buy</a>' +
                                '</span>' +
                                
                                '</li>';
                                //localStorage.setItem("" + results[i].symbol + "_usd_value",Number(results_last_price)/Number(localStorage.getItem("exrate"))); //USD
                                localStorage.removeItem("" + results[i].symbol + "_usd_value");
                                let BTC_balance = localStorage.getItem(crypto_asset_balance);//BTC

                                new_account_balanceData_asset[tab_count_] = {
                                    "initial_balance": BTC_balance,
                                    "account_balance": BTC_balance,
                                    "coin_usd_value": results_last_price,
                                    "account_balance_symbol" : results[i].symbol,
                                    "price": [results_bid_price, results_high_price_24h, results_low_price_24h, results_last_price]
                                };
                                tab_count_ = new_account_balanceData_asset.length;
                                $(".crypto_wacthlist").append(crypto_wacthlist);

                            } else {
                                tab_count_assets++;
                                $(".tab_count_assets").html(tab_count_assets);


                                

                                let highest_buy_price = results_last_price;
                                let BTC_balance = localStorage.getItem(crypto_asset_balance);//BTC
                                let USD_balance = (Number(BTC_balance)/1)*Number(highest_buy_price); //USD
                                USD_balance = USD_balance.toFixed(2);
                                
                                let coin_usd_value = localStorage.getItem("" + results[i].symbol + "_usd_value"); //USD

                                //alert("_usd_value " + localStorage.getItem("" + results[i].symbol + "_usd_value"));
                                
                                var coin_value_ = Number(coin_usd_value)*Number(localStorage.getItem("exrate"));
                                coin_value_ = coin_value_.toFixed(2);

                                
                                //var coin_value_ = Number(localStorage.getItem("" + results[i].symbol + "_usd_value"))*Number(localStorage.getItem("exrate"));

                                //var price_of_the_coin_in_ccode = coin_value_;
                                //potential_usd_account_balance
                                //var potential_account_balance = Number(potential_usd_account_balance) - Number(coin_value_);
                                //var potential_account_balance = Number(localStorage.getItem("account_balance")) - Number(coin_value_);

                                
                                let coin_value = Number(USD_balance) - Number(coin_value_);
                                coin_value = coin_value.toFixed(2);


                                var the_diff = coin_value;
                                var initial_val = coin_value_;
                                var pert_chang = (the_diff/initial_val)*100;
                                pert_chang = pert_chang.toFixed(2);
                                if (pert_chang >= 0) {
                                    var pr_bg = "bg-success";
                                    var pr_bg_text = "success"; 

                                } else {
                                    var pr_bg = "bg-danger"; 
                                    var pr_bg_text = "danger"; 

                                }
                                if (i< 1) {
                                    //alert("BTC_balance " + Number(BTC_balance)  + " USD_balance " + Number(USD_balance)  + " coin_value_ " + Number(coin_value_) + " the_diff " + the_diff + " pert_chang " + pert_chang);
    
                                }

                                //ta_asset_cage_pct = Number(ta_asset_cage_pct) + Number(pert_chang);

                                var aria_valuenow = Math.abs(pert_chang);
                                
                                var mysnaccount_ackbar = " BTC " + BTC_balance + " " + results[i].symbol + " balance " + USD_balance + "  value added " + coin_value + " change " + pert_chang + "%";


                                var progres_dash = '<div class="progress">' +
                                '<div class="progress-bar ' + pr_bg + '" role="progressbar" style="width: ' + aria_valuenow + '%;" aria-valuenow="' + aria_valuenow + '" aria-valuemin="0" aria-valuemax="100">' + aria_valuenow + '%</div>' + 
                                '</div>';

                                var mysnaccountackbar = progres_dash;
                                
                                //let letpotential_usd_account_balance = Number(potential_account_balance) + Number(USD_balance);
                                //let letpotential_usd_account_balance = Number(Number(localStorage.getItem("account_balance")) - Number(Number(localStorage.getItem("" + results[i].symbol + "_usd_value"))*Number(localStorage.getItem("exrate")))) + Number(USD_balance);

                                //var actual_account_balance = Number(localStorage.getItem("usd_account_balance")*Number(localStorage.getItem("exrate"))) - Number(Number(localStorage.getItem("" + results[i].symbol + "_usd_value"))*Number(localStorage.getItem("exrate")));
                                //localStorage.setItem("usd_account_balance", Number(actual_account_balance/Number(localStorage.getItem("exrate"))));
                                //localStorage.getItem("actual_account_balance");
                                //var actual_account_balance = Number(localStorage.getItem("actual_account_balance"));
                                //let letpotential_usd_account_balance = Number(actual_account_balance) + Number(USD_balance);
                                //let letpotential_usd_account_balance = actual_account_balance;
                                //localStorage.getItem("usd_account_balance");
                                //let letpotential_usd_account_balance = Number(localStorage.getItem("actual_account_balance")) + Number(USD_balance);

                                
                                //localStorage.setItem("account_balance_potential_usd_account_balance",potential_usd_account_balance);// Set account_balance_potential_usd_account_balance
                                
                                if (localStorage.getItem("asset") === results[i].symbol) {
                                    var aria_expanded = 'true'; 
                                } else {
                                    var aria_expanded = 'false';
                                }
                                var crypto_you_own = '<li id="asset_' + results[i].symbol + '" class="list-group-item get_asset" asset="' + results[i].symbol + '">' + 
                                
                                '<span class="d-flex justify-content-between align-items-center" style="height: 10px;">' +
                                '<span class="rounded-circle" style="width: 32px; height: 32px;">'+
                                '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="'+ results[i].symbol + '"> '+ 
                                '</span>'+ results[i].symbol + 
                                '<span class="text-success">' + localStorage.getItem("ccode") + ' ' + USD_balance + '</span>' +
                                '<span class="text-warning">' + BTC_balance + '</span>' +  
                                '</span>'+                              
                                '<br>'+ 
                                '<span class="d-flex justify-content-between align-items-center" style="height: 10px;">' +
                                '<span class="text-info">' + localStorage.getItem("ccode") + ' '+ results_last_price + '</span>' +
                                '<span class="text-' + pr_bg_text + '">' + pert_chang + '%</span>' +
                                '<span class="text-success btn-group">' + 
                                '<a href="" class="btn btn-sm btn-soft-success mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results_low_price_24h + '" price_open="'+ results_bid_price + '" day_high="'+ results_high_price_24h + '"  price="'+ results_last_price + '" aisa_options="buy">Buy</a>' +
                                '<a href="" class="btn btn-sm btn-soft-danger mkt_option" asset="'+ results[i].symbol + '" day_low="'+ results_low_price_24h + '" price_open="'+ results_bid_price + '" day_high="'+ results_high_price_24h + '"  price="'+ results_last_price + '" aisa_options="sell">Sell</a>' +
                                '</span>' +
                                '</span>'+
                                
                                '</li>' + 
                                '<li class="list-group-item"> ' + mysnaccountackbar + '</li>';

                                
                                //total_asset_acc_balance = Number(total_asset_acc_balance) + Number(USD_balance);

                                new_account_balanceData_asset[tab_count_] = {
                                    "initial_balance": BTC_balance,
                                    "account_balance": BTC_balance,
                                    "coin_usd_value": coin_usd_value,
                                    "account_balance_symbol" : results[i].symbol,
                                    "price": [results_bid_price, results_high_price_24h, results_low_price_24h, results_last_price]
                                };
                                tab_count_ = new_account_balanceData_asset.length;
                                ta_asset_value = Number(ta_asset_value) + Number(USD_balance);
                                
                                var viable_balance = Number(Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"))) + Number(ta_asset_value);
                                viable_balance = viable_balance.toFixed(2);
                                
                                var ta_asset_cage_pct = Number(viable_balance) - Number(Number(localStorage.getItem("initial_balance"))*Number(localStorage.getItem("exrate")));
                                ta_asset_cage_pct = ta_asset_cage_pct/Number(Number(localStorage.getItem("initial_balance"))*Number(localStorage.getItem("exrate")));
                                ta_asset_cage_pct= ta_asset_cage_pct*100;

                                if (ta_asset_cage_pct >= 0) {
                                    var pr_bg_prt_ba = "success";
                                } else {
                                    var pr_bg_prt_ba = "danger"; 
                                }
                                ta_asset_cage_pct = ta_asset_cage_pct.toFixed(2);

                                $(".account_balance").html(localStorage.getItem("ccode") + " " + viable_balance + ' <span class="text-' + pr_bg_prt_ba + '">' + ta_asset_cage_pct + '%</span>');
                                
                                $(".crypto_you_own").append(crypto_you_own);

                            }
                            if (i == results.length-1) {
                                if (buy_cliwecked == 1) {
                                    //buy_cliwecked = 0;
                                    //alert("crypto_account_data " + new_account_balanceData_asset);
                                    //$(".snackbar_mkt_operation").html(mysnackbar_mkt_operation);
                                    //$("#mysnackbar_mkt_operationModal").modal('show');
                                    //localStorage.setItem("mysnackbar_mkt_operation", user_pass);

                                    //buy_cliwecked_do = 1;
                                    //loadchat(localStorage.getItem("connect_from"));
                                    //proccess_transaction_callerd = 1;
                                    //account_balanceData(new_account_balanceData_asset);
                                } else {
                                    //$(".loader_center").hide();
                                }
                                if (buy_asset_cliwecked == 1) {
                                    buy_asset_cliwecked = 0;
                                    $(".loader_center").hide();
                                }
                            }
                        }
                        //alert("crypto_account_data " + new_account_balanceData_asset);

                        crypto_account_data = new_account_balanceData_asset;
                        if (buy_cliwecked == 1) {
                            buy_cliwecked = 0;
                            buy_cliwecked_do = 1;
                            
                             dash_called_ind_loadchat = 1;
                            loadchat(localStorage.getItem("connect_from"));
                        } else {
                            if (localStorage.getItem("account_balance_Data") != localStorage.getItem("usd_account_balance") || crypto_init_data_length != crypto_account_data.length) {
                                dash_called_ind_loadchat = 1;
                                loadchat(localStorage.getItem("connect_from"));
                            }
                        }
                        //mysnackbar(caller);

                        if (caller== 0) {
                            Query_Kline_Book();   
                        }
                        localStorage.setItem("pr_exrate", localStorage.getItem("exrate"));

                    } 

                    condition_aisa_options_cliked = 1;
                    account_mkt_evaluation(localStorage.getItem("aisa_options"));
                    
                    /**if (bot_called_from_timmer == 1 && current_trading_click == 0) {
                        bot_called_from_timmer = 0;
                        rebro_Aisha(localStorage.getItem("bot_training"),localStorage.getItem("username"),localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
                    } */

                 
                } else {
                    
                }
            } catch(e) {

            }          
        },
        error: function searchError(xhr, err) {

        }
    });
}
var cusymbal_condition_params ="";

function Query_Symbol(crypto,asset,aisa_options) {
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { crypto:crypto, asset: asset, limit: localStorage.getItem("limit"), interval: localStorage.getItem("interval"), aisa_options: aisa_options},
        processData: true,
        url: 'https://arybit.com/cordova/Query_Symbol.php',
        success: function searchSuccess(response) {
            try {
                if (response.ret_msg == "OK") {
                    $(".current_crypto_symbol").addClass("bg-soft-warning");
                    if (crypto == 'Query Symbol') {
                        var results = response.result;
                        $(".crypto_offers_drop").html('');
                        //var svg_src = '';
                        var crypto_name = '';
                        for (let i = 0; i < results.length; i++) {
                            if (i < 1) {

                                let text = window.location.href;
                                const myArray = text.split("https://wallet.arybit.com/#");
                                var et_svg = myArray[1];
                                if (myArray.length > 1) {
                                    if (et_svg.includes("USD")) {
                                        localStorage.setItem("asset",et_svg);
                                    } else {
                                        localStorage.setItem("asset",results[i].name);
                                    }
                                } else {
                                    localStorage.setItem("asset",results[i].name);
                                }

                                let crypto_text = localStorage.getItem("asset");
                                const crypto_myArray = crypto_text.split("USD");
                                var crypto_et_svg = crypto_myArray[0];
                                crypto_et_svg = crypto_et_svg.toLowerCase();
                                var crypto_svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + crypto_et_svg + ".svg";
                            
                                var asset_received = '<span>'+
                                '<img src="'+ crypto_svg_src + '" class="rounded-circle" width="28" alt="Avatar"> BTC Bitcoin' + 
                                '</span>';
                                $(".crypto_option").html(asset_received); 
                                localStorage.setItem("selected_crypto_option",localStorage.getItem("asset"));

                                Query_Kline_Book();
                                $(".mkt_option").attr("asset",localStorage.getItem("asset"));  
                            }
                            
                            let text = results[i].name;
                            const myArray = text.split("USD");
                            var et_svg = myArray[0];
                            et_svg = et_svg.toLowerCase();
                            var svg_src = "https://s1.bycsi.com/assets/image/coins/light/" + et_svg + ".svg";

                            var query_c_symbols_asset = '<li id="offers_' + results[i].name + '" class="list-group-item d-flex justify-content-between align-items-center" asset="' + results[i].name + '">' +
                            '<div class="rounded-circle" style="width: 32px; height: 32px;">'+
                            '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="' + results[i].name + '">'+
                            '</div>'+
                            '<a class="text-primary" href="#' + results[i].name + '">' + results[i].name + '</a>' +
                            '<span class="id_' + results[i].name + '"></span>' +
                            '<span class="d-none d-lg-block text-warning">' + results[i].base_currency + '</span>' +
                            '<span class="d-none d-lg-block text-success">' + results[i].quote_currency + '</span>' +
                            '<span class="get_asset_id_' + results[i].name + '"></span>' +
                            '</li>';
                            $(".query_c_symbols_asset").append(query_c_symbols_asset);

                            var query_c_symbols = '<li id="offers_' + results[i].name + '" class="list-group-item d-flex justify-content-between align-items-center" asset="' + results[i].name + '">' +
                            '<div class="rounded-circle" style="width: 32px; height: 32px;">'+
                            '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar">'+
                            '</div>'+
                            '<a class="text-primary" href="#' + results[i].name + '">' + results[i].name + '</a>' +
                            '<span class="id_' + results[i].name + '"></span>' +
                            '<span class="get_asset_id_' + results[i].name + '"></span>' +
                            '</li>';
                            $(".query_symbols").append(query_c_symbols);


                            var crypto_offers_drop = '<li><a class="dropdown-item active get_asset" href="#' + results[i].name + '" asset="' + results[i].name + '">' + results[i].name + '</a></li>' +
                            '<li><hr class="dropdown-divider"></li>';
                            $(".crypto_offers_drop").append(crypto_offers_drop);

                            var query_symbols_skills = '<a href="#' + results[i].name + '" class="btn btn-sm get_asset" asset="' + results[i].name + '">' + 
                            '<span class="rounded-circle" style="width: 32px; height: 32px;">'+
                            '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> '+ results[i].name + 
                            '</span>'+
                            '<br><span class="id_' + results[i].name + '"></span></a>';
                            $(".query_symbols_skills").append(query_symbols_skills);

                            //https://bin.bnbstatic.com/image/admin_mgs_image_upload/20210122/2b5c7d80-7bcd-4cfb-8bd9-d1760a752afc.png
                            
                            if (results[i].name == "BTCUSD" && results[i].quote_currency == 'USD') {
                                var crypto_option_menu = '<li><a class="dropdown-item selected_crypto_option" asset="' + results[i].name + '"><span>'+
                                '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> '+ results[i].base_currency +  ' Bitcoin' + 
                                '</span>'+
                                '</a></li>';
                                //$(".crypto_option_menu").append(crypto_option_menu);
                            } else if (results[i].name == "ETHUSD" && results[i].quote_currency == 'USD'){
                                var crypto_option_menu = '<li><a class="dropdown-item selected_crypto_option" asset="' + results[i].name + '"><span>'+
                                '<img src="'+ svg_src + '" class="rounded-circle" width="28" alt="Avatar"> '+ results[i].base_currency +  ' Ethereum' + 
                                '</span>'+
                                '</a></li>';
                                //$(".crypto_option_menu").append(crypto_option_menu); 
                            } else if (results[i].name == "BTCUSDT" && results[i].quote_currency == 'USDT'){
                                var crypto_option_menu = '<li><a class="dropdown-item selected_crypto_option" asset="' + results[i].name + '"><span>'+
                                '<img src="https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png" class="rounded-circle" width="28" alt="Avatar"> '+ results[i].quote_currency + ' TetherUS' +
                                '</span>'+
                                '</a></li>';
                                $(".crypto_option_menu").append(crypto_option_menu); 

                                var asset_received = '<span>'+
                                '<img src="https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png" class="rounded-circle" width="28" alt="Avatar"> '+ results[i].quote_currency + ' TetherUS' +
                                '</span>';
                                $(".crypto_option").html(asset_received); 
                                localStorage.setItem("selected_crypto_option",results[i].name);

                            }

                        }
                    }                    
                } else{
                    $(".asset_info_candlestick").html('');
                    $("#simple-candlestick").html('');
                    $("#leanders_mkt_c").addClass("d-none");
                    $("#leanders_mkt").removeClass("d-none");
                }
            } catch(e) {
                $("#leanders_mkt_c").addClass("d-none");
                $("#leanders_mkt").removeClass("d-none");
                //mysnackbar('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
            $("#leanders_mkt_c").addClass("d-none");
            $("#leanders_mkt").removeClass("d-none");
         //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}
/**function account_balanceData(new_account_balanceData_asset) {
    account_balance_called = 0;
    new_account_balanceData_asset = JSON.stringify(new_account_balanceData_asset);
    //alert(new_account_balanceData_asset);
    var username = localStorage.getItem("username");
    var email = localStorage.getItem("email");
    var user_pass = localStorage.getItem("user_pass");
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { login_user: 12, login_email: email, login_password:user_pass, login_details_username:username, login_details_email:email, new_account_balanceData:new_account_balanceData_asset },
        processData: true,
        url: api_server_url + '/cordova/new_account_balanceData.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {                    
                    var usd_account_balance = response.account_balance;                    
                    var char = '"';
                    let balanceData = usd_account_balance.replace(/&quot;/g,char);
                    var balanceDataObj  = JSON.parse(balanceData);
                    let index = 0;
                    for (index = 0; index < balanceDataObj.length; index++) {
                        var initial_balance = balanceDataObj[index].initial_balance;
                        var account_balance = balanceDataObj[index].account_balance;
                        var coin_usd_value = balanceDataObj[index].coin_usd_value;
                        var account_balance_symbol = balanceDataObj[index].account_balance_symbol;
                        var price = balanceDataObj[index].price;
                        
                        //alert("initial_balance " + initial_balance + " account_balance " + account_balance + " coin_usd_value " + coin_usd_value + " account_balance_symbol " + account_balance_symbol);
                    }
                    if (index > 1) {

                        //alert("initial_balance " + initial_balance + " account_balance " + account_balance + " coin_usd_value " + coin_usd_value + " account_balance_symbol " + account_balance_symbol);

                        index_login_user(email,user_pass,username,email);

                        //var mkt_operation = account_balance +' ' + account_balance_symbol;
                        //var is_empty = 'no';
                        //dsh_contact(account_balance_symbol ,username,'',mkt_operation,is_empty);
                    }                    
    
                } else {

                }
            } catch(e) {
                mysnackbar('JSON parsing error');
            }
            
        },
        error: function searchError(xhr, err) {
          mysnackbar("Error on ajax call: " + api_server_url + '/cordova/login_user.php');
        }
    });
} */





var cout_token = 0;
function braintree_gettoken(amount_in_usd,selected_payment_option,useremail_,info,intent) {
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { token:'get'},
        processData: true,
        url: api_server_url + '/cordova/braintree.php',
        success: function searchSuccess(response) {
            try {
                $("#dropin-container").html("");
                var deviceData = '';
                var clientToken = response.clientToken;
                
                braintree.client.create({
                    authorization: clientToken
                }, function (err, clientInstance) {
                    // Creation of any other components...
                    braintree.dataCollector.create({
                        client: clientInstance
                    }, function (err, dataCollectorInstance) {
                        if (err) {
                            // Handle error in creation of data collector
                            return;
                        }
                        // At this point, you should access the dataCollectorInstance.deviceData value and provide it
                        // to your server, e.g. by injecting it into your form as a hidden input.
                        deviceData = dataCollectorInstance.deviceData;
                    });
                });

                //alert(clientToken);

                braintree.dropin.create({
                  authorization: clientToken,
                  selector: '#dropin-container'
                }, function (err, instance) {
                    $(".complete_card_trasaction").html("Complete trasaction");
                    $(".complete_trasaction").hide();
                    $(".complete_card_trasaction").show();

                    
                    instance.on('card:focus', function (event) {
                        //alert('a card field was focussed'); // a card field was focussed
                    });
                    instance.on('card:blur', function (event) {
                       // alert('a card field was blurred'); // a card field was blurred
                    });
                    instance.on('card:validityChange', function (event) {
                        //alert("validityChange"); // the card form went from invalid to valid or valid to invalid
                    });
                    instance.on('card:binAvailable', function (event) {
                        //alert('card:binAvailable'); // a card field was binAvailable
                    });
                    instance.on('card:empty', function (event) {
                        //alert('card:empty'); // a card field was empty
                    });
                    instance.on('card:notEmpty', function (event) {
                        //alert('card:notEmpty'); // a card field was notEmpty
                    });

                    var do_so = '';
                    //This event is emitted when the payment method available in Drop-in changes. This includes when the state of Drop-in transitions from having no payment method available to having a payment method available and when the kind of payment method available changes. This event is not fired if there is no payment method available on initialization. To check if there is a payment method requestable on initialization, use {@link Dropin#isPaymentMethodRequestable|`isPaymentMethodRequestable`}.
                    do_so = 'paymentMethodRequestable on';
                    instance.on('paymentMethodRequestable', callback);

                    if (instance.isPaymentMethodRequestable()) {
                             // This will be true if you generated the client token
                             // with a customer ID and there is a saved payment method
                             // available to tokenize with that customer.
                             //submitButton.removeAttribute('disabled');
                             //alert("payment method available");
                    }                    
                    instance.on('paymentMethodRequestable', function (event) {
                        // if the nonce is already available (via PayPal authentication
                        // or by using a stored payment method), we can request the
                        // nonce right away. Otherwise, we wait for the customer to
                        // request the nonce by pressing the submit button once they
                        // are finished entering their credit card details. This is
                        // particularly important if your credit card form includes a
                        // postal code input. The `paymentMethodRequestable` event
                        // could fire before the customer has finished entering their
                        // postal code. (International postal codes can be as few as 3
                        // characters in length)
                        //alert("type " + event.type); // The type of Payment Method, e.g 'CreditCard', 'PayPalAccount'.
                        //alert("paymentMethodIsSelected " + event.paymentMethodIsSelected); // true if a customer has selected a payment method when paymentMethodRequestable fires
                   
                        //submitButton.removeAttribute('disabled');
                        //alert("paymentMethodRequestable");
                        if (event.paymentMethodIsSelected) {
                          sendNonceToServer();
                        }
                    });
                    instance.on('noPaymentMethodRequestable', function () {
                             //submitButton.setAttribute('disabled', true);
                             //alert("noPaymentMethodRequestable");
                    });
                    
                    //Listen for when the customer navigates to different views in Drop-in
                    var changeActiveView = 0;
                    instance.on('changeActiveView', function (event) {
                        // fires when the view changes, such as going from the
                        // credit card view to the saved payment methods view
                        changeActiveView = 1;
                        sendNonceToServer();

                        //alert("oldActivePaymentViewId " + event.oldActivePaymentViewId); // card
                        //alert("newActivePaymentViewId " + event.newActivePaymentViewId); // methods
                    });


                    var callback = function (event) {
                        //alert("callback " + do_so); // do something
                    };

                    function sendNonceToServer(){                        
                        instance.requestPaymentMethod(function (err, payload) {
                            // Submit payload.nonce to your server
                            if (changeActiveView == 1) {
                                //alert("err " + err  + " " + payload.nonce);
                                changeActiveView = 0;
                                complete_trasaction(amount_in_usd,selected_payment_option,deviceData,payload.nonce,intent);
                            }
                        });
                    }

                    // allows us to still request the payment method manually, such as
                    // when filling out a credit card form
                    var complete_card_trasaction_button = document.querySelector('.complete_card_trasaction');
                    complete_card_trasaction_button.addEventListener('click', function () {   
                        
                        
                        sendNonceToServer();                    
                    });

                    
                    // later on
                    //do_so = 'paymentMethodRequestable off';
                    //instance.off('paymentMethodRequestable', callback);
                    

                    

                    /**alert("click " + err  + " " + instance.requestPaymentMethod());

                    complete_card_trasaction_button.addEventListener('click', function () {   
                        instance.requestPaymentMethod(function (err, payload) {
                            // Submit payload.nonce to your server
                            //cout_token = 0;
                            alert("err " + err  + " " + payload.nonce);
                            complete_trasaction(amount_in_usd,selected_payment_option,deviceData,payload.nonce,intent);
                        });                    
                    }); */                     
                });
            } catch(e) {
                //alert('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
         //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}
var amount_in_usd = 0;
function amount_to_deposit_usd(intenti) {
    if (intenti == "withdraw") {
        if ($(".amount_to_withdraw").val() == '') {
            $(".amount_to_withdraw").removeClass("is-valid");
            $(".amount_to_withdraw_feedback").removeClass("valid-feedback");
            $(".amount_to_withdraw").addClass("is-invalid");
            $(".amount_to_withdraw_feedback").addClass("invalid-feedback");
            $(".amount_to_withdraw_feedback").html("Please provide a valid amount.");
            var amount_to_deposit =0;

        } else {
            $(".amount_to_withdraw").removeClass("is-invalid");
            $(".amount_to_withdraw_feedback").removeClass("invalid-feedback");
            $(".amount_to_withdraw").addClass("is-valid");
            $(".amount_to_withdraw_feedback").addClass("valid-feedback");
            $(".amount_to_withdraw_feedback").html("Looks good!");
            if (localStorage.getItem("selected_payment_option") == "Paying with Paypal") {
                //alert(localStorage.getItem("selected_payment_option"));
                $(".paypal_btn_grp").removeClass("d-none");
            } else {
                $(".paypal_btn_grp").addClass("d-none");
            }
            
            var amount_to_deposit = Number($(".amount_to_withdraw").val());
            //var amount_to_deposit = Number($(".amount_to_deposit").val());
            amount_in_usd = amount_to_deposit/Number(localStorage.getItem("exrate"));
            amount_in_usd = amount_in_usd.toFixed(2);
            $(".amount_to_withdraw_feedback").html("Withdraw $ " + amount_in_usd + "?");
            if (amount_to_deposit == "" || amount_to_deposit < 1) {
                $(".amount_to_withdraw_feedback").html("Enter valid amount");
            } else {
                if (localStorage.getItem("selected_recipient_type") ==null || localStorage.getItem("selected_recipient_type") == "EMAIL") {
                    localStorage.setItem("selected_recipient_type","EMAIL");
                    $(".recipient_type").html("" + localStorage.getItem("selected_recipient_type")); 
                    $(".entrer_email").show();
                    $(".entrer_phoner").hide();
                    $(".paypal_id").hide();
                    $(".user_withdraw_email").val(localStorage.getItem("email"));

                } else if(localStorage.getItem("selected_recipient_type") == "PHONE") {
                    $(".recipient_type").html("" + localStorage.getItem("selected_recipient_type")); 
                    $(".entrer_email").hide();
                    $(".paypal_id").hide();
                    $(".entrer_phoner").show();

                    $(".user_withdraw_phone_number").val(localStorage.getItem("user_phone"));

                } else if(localStorage.getItem("selected_recipient_type") == "PAYPAL_ID") {
                    $(".recipient_type").html("" + localStorage.getItem("selected_recipient_type")); 
                    $(".entrer_phoner").hide();
                    $(".entrer_email").hide();
                    $(".paypal_id").show();
            
                }
            }
            
        }            
    } else {
        if ($(".amount_to_deposit").val() == '') {
            $(".amount_to_deposit").removeClass("is-valid");
            $(".amount_to_deposit_feedback").removeClass("valid-feedback");
            $(".amount_to_deposit").addClass("is-invalid");
            $(".amount_to_deposit_feedback").addClass("invalid-feedback");
            $(".amount_to_deposit_feedback").html("Please provide a valid amount.");
            var amount_to_deposit =0;

        } else {
            $(".amount_to_deposit").removeClass("is-invalid");
            $(".amount_to_deposit_feedback").removeClass("invalid-feedback");
            $(".amount_to_deposit").addClass("is-valid");
            $(".amount_to_deposit_feedback").addClass("valid-feedback");
            $(".amount_to_deposit_feedback").html("Looks good!");
            var amount_to_deposit = Number($(".amount_to_deposit").val());
            amount_in_usd = amount_to_deposit/Number(localStorage.getItem("exrate"));
            amount_in_usd = amount_in_usd.toFixed(2);
            $(".amount_to_deposit_feedback").html("$ " + amount_in_usd + " will be deposited.");
        }            
    }
}
function proccess_transaction(ccode,exrate,amount_to_deposit,selected_payment_option,useremail_,phone_num,intent){
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { ccode:ccode, exrate:exrate, amount_to_deposit:amount_to_deposit, selected_payment_option: selected_payment_option, useremail_:useremail_, phone_num: phone_num, username: localStorage.getItem("username"), email:localStorage.getItem("email"), user_pass:localStorage.getItem("user_pass"), intent:intent},
        processData: true,
        url: api_server_url + '/cordova/proccess_transaction.php',
        success: function searchSuccess(response) {
            try {
                //alert(response);

                if (selected_payment_option == "Paying with Card") {
                    $(".complete_card_trasaction").removeClass("btn-warning");
                    $(".complete_card_trasaction").addClass("btn-success");
                    $(".complete_card_trasaction").html(response.message);
                    $(".complete_trasaction").show();
                    $(".complete_card_trasaction").hide();
                    //$("#dropin-container").html("");

                } else if(selected_payment_option == "Paying with Paypal") {
                    $(".deposit_footer").show();
                    $(".complete_trasaction").show();
                    $(".complete_trasaction").removeClass("btn-warning");
                    $(".complete_trasaction").addClass("btn-success");
                    $(".complete_trasaction").html("success");
                    if (intent == "withdraw") {
                        $(".user_withdraw_phone_numberfeedback").html(response.message); 
                        $(".user_withdraw_emailfeedback").html(response.message);   
                        $(".user_withdraw_paypal_idfeedback").html(response.message);   

                       // $(".paypal-with_response-container").html(response.message);
                            //mysnackbar(amount_to_deposit); 
                    } else {
                        $(".complete_trasaction").html(response.message);

                        setTimeout(function(){ 
                            proccess_transaction_callerd = 1;
                        }, 5000);
                    }
                } else if(selected_payment_option == "Paying with M-Pesa") {
                    $(".complete_trasaction").removeClass("btn-warning");
                    $(".complete_trasaction").addClass("btn-success");
                    $(".complete_trasaction").html(response.message);                 
                    setTimeout(function(){ 
                        proccess_transaction_callerd = 1;
                    }, 5000);
                } else if(selected_payment_option == "TRX Tron (TRC20)") {
                    //$(".complete_trasaction").removeClass("btn-warning");
                    //$(".complete_trasaction").addClass("btn-success");
                    $(".proccess_withdrawal_address_info").html(response.message);                 

                    $(".proccess_withdrawal_address").html(response.message);                 
                    setTimeout(function(){ 
                        //proccess_transaction_callerd = 1;
                    }, 5000);
                }

                /**
{"visible":false,"txID":"b9f89f9fe328390bd232dd641bea5ad37ff4753f058fae3e60891bd7b785b484","raw_data":{"contract":[{"parameter":{"value":{"amount":100,"owner_address":"41608f8da72479edc7dd921e4c30bb7e7cddbe722e","to_address":"415a981bc14b6d1d2dbee3d9434d22ec1c2299ecf2"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"3d2b","ref_block_hash":"b4be5020230943b5","expiration":1647185685000,"timestamp":1647185629284},"raw_data_hex":"0a023d2b2208b4be5020230943b54088d4ab9ff82f5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541608f8da72479edc7dd921e4c30bb7e7cddbe722e1215415a981bc14b6d1d2dbee3d9434d22ec1c2299ecf2186470e4a0a89ff82f"} */
                
                //onDeviceReady();
                //index_login_user(localStorage.getItem("user_email"),localStorage.getItem("user_pass"),username,localStorage.getItem("user_email"));

                //mysnackbar(response.account_balance);
            } catch(e) {
                //mysnackbar('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
         //mysnackbar("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}               

var bought_bitcoins = 0;
var sold_bitcoins = 0;

let new_account_balanceData=[];

var account_balance_called = 0;
var mkt_operation = '';
var buy_cliwecked = 0;
function account_mkt_balance(aisa_options) {
    var crypto_asset_balance = localStorage.getItem("asset");
    crypto_asset_balance = "" + crypto_asset_balance + "_balance";
    var crypto_asset_value = "" + localStorage.getItem("asset") + "_value";
    $(".loader_span").html(localStorage.getItem("asset"));

    if (aisa_options =="buy") {
        if(localStorage.getItem(crypto_asset_balance) == null) {
            localStorage.setItem(crypto_asset_balance,0);//BTC
        }
        if ($(".order_quantity").val() != '' && $(".order_quantity").val() > 0) {
            $(".order_quantity").removeClass("is-invalid");
            $(".order_quantity").addClass("is-valid");
            var order_usd_quantity = $(".order_quantity").val();//USD
            var actual_aqunt_balance = Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));

            if (actual_aqunt_balance <= 0) {
                $(".mkt_err_evaluation").html("Insufficient balance, load your account.");

                //mysnackbar("Insufficient balance, load your account.");
                display_account_action("show");

            } else {
                if (order_usd_quantity <= actual_aqunt_balance) {
                    $(".mkt_err_evaluation").html();

                    if (localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value") == null || localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value") == 0) {
                        localStorage.setItem("" + localStorage.getItem("asset") + "_usd_value",Number(order_usd_quantity)/Number(localStorage.getItem("exrate")));//USD
                    } else {
                        localStorage.setItem("" + localStorage.getItem("asset") + "_usd_value",Number(localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value")) + Number(Number(order_usd_quantity)/Number(localStorage.getItem("exrate"))));//USD
                    }
 
                    localStorage.setItem(crypto_asset_value,order_usd_quantity);//USD
  
                    let lowest_sell_price = localStorage.getItem("sell_price"); //USD
                    //////////////////////////////////////////
    
                    let btc_balance_fro_usd = (Number(order_usd_quantity)/Number(lowest_sell_price))*1; //BTC
                    btc_balance_fro_usd = btc_balance_fro_usd.toFixed(8);
                    var bitcoin_balance_fro_usd = (Number(localStorage.getItem(crypto_asset_balance)) + Number(btc_balance_fro_usd));
    
                    bitcoin_balance_fro_usd = bitcoin_balance_fro_usd.toFixed(8);
                    /////////////////////////////////////////////
                    localStorage.setItem(crypto_asset_balance,bitcoin_balance_fro_usd);//BTC
    
                    if (localStorage.getItem("bot_trading") == "true") {
                        var mysmkt_operation = '' + btc_balance_fro_usd + ' ' + localStorage.getItem("asset") + ' bought worth ' + localStorage.getItem("ccode") + ' ' + localStorage.getItem(crypto_asset_value) + ' at ' + localStorage.getItem("ccode") + ' ' + localStorage.getItem("sell_price");

                    } else {
                        var mysmkt_operation = 'You bought ' + btc_balance_fro_usd + ' ' + localStorage.getItem("asset") + ' worth ' + localStorage.getItem("ccode") + ' ' + localStorage.getItem(crypto_asset_value) + ' at ' + localStorage.getItem("ccode") + ' ' + localStorage.getItem("sell_price");
 
                    }
                    localStorage.setItem("mysnackbar_mkt_operation", mysmkt_operation);

                    var usd_account_balance = Number(Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"))) - Number(order_usd_quantity);//Number(Number(localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value"))*Number(localStorage.getItem("exrate")));
                    usd_account_balance = usd_account_balance.toFixed(2);

                    localStorage.setItem("usd_account_balance", Number(Number(usd_account_balance)/Number(localStorage.getItem("exrate"))));
                    //localStorage.setItem("actual_account_balance", actual_account_balance);

                    var is_empty = 'no';
                    buy_cliwecked = 1;

                    $("#current_crypto_symbolModal").modal('hide');

                    if (localStorage.getItem("bot_trading") == "true") {
                        
                    } else {
                        $(".loader_center").show();
 
                    }

                    //Query_Kline_Book();
                    if (localStorage.getItem("bot_trading") == "true") {

                    } else {
                        current_trading_click = 1;
                        rebro_Aisha(localStorage.getItem("bot_training"),localStorage.getItem("username"),localStorage.getItem("asset"),aisa_options,localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
                    } 

                    arybit('Query Kline',localStorage.getItem("asset"),'');  

                    dsh_contact(localStorage.getItem("asset") ,username,'',localStorage.getItem("mysnackbar_mkt_operation"),is_empty);
    
                    var order_quantity = 0;
                    order_quantity = order_quantity.toFixed(8);
                    $(".order_quantity").val(order_quantity);
                    $(".order_quantity_range").val(0);
                } else {
                    $(".order_quantity").val(localStorage.getItem("usd_account_balance"));
                    $(".mkt_err_evaluation").html("You do not have enough money.");

                    //mysnackbar("You do not have enough money");
                    $(".order_quantity_range").val(0);
                } 
            }            
        } else {
            $(".order_quantity").addClass("is-invalid");
            $(".order_quantity").removeClass("is-valid");
            var order_usd_quantity = 0;//localStorage.getItem("account_balance");//USD
            $(".mkt_err_evaluation").html("Enter Quantity.");

            //mysnackbar("Enter Quantity");
        }        
    } else if (aisa_options =="sell") {
        if(localStorage.getItem(crypto_asset_balance) == null) {
            localStorage.setItem(crypto_asset_balance,0);//BTC
        }

        if ($(".order_quantity").val() != '' && $(".order_quantity").val() > 0) {
            $(".order_quantity").removeClass("is-invalid");
            $(".order_quantity").addClass("is-valid");
            var order_btc_quantity = $(".order_quantity").val();//BTC
            var assetbalanc = localStorage.getItem(crypto_asset_balance);

            if (assetbalanc < order_btc_quantity) {
                $(".mkt_err_evaluation").html("You do not have enough crypto!.");

                //mysnackbar("You do not have enough crypto!");
                //var bitcoin_balance = localStorage.getItem(crypto_asset_balance);//USD
                $(".order_quantity").val(localStorage.getItem(crypto_asset_balance))

            } else if (localStorage.getItem(crypto_asset_balance) <= 0) {
                //$(".mkt_err_evaluation").html("Deficient crypto, try buying some");

                $(".mkt_err_evaluation").html("Deficient " + localStorage.getItem("asset") + " Balance, try buying some");

                //mysnackbar("Deficient crypto, try buying some");
            } else {
                if (localStorage.getItem(crypto_asset_balance) > 0) {
                    $(".mkt_err_evaluation").html();

                    var bitcoin_balance = localStorage.getItem(crypto_asset_balance);//USD
                    var Ibitcoin_balance = bitcoin_balance;
                    bitcoin_balance = Number(bitcoin_balance) - Number(order_btc_quantity);
                    bitcoin_balance = bitcoin_balance.toFixed(8);
                    localStorage.setItem(crypto_asset_balance,bitcoin_balance);//USD
    
                    let highest_buy_price = localStorage.getItem("buy_price");//USD
                    let usd_balance_fro_btc = (order_btc_quantity/1)*highest_buy_price; //USD
                    usd_balance_fro_btc = usd_balance_fro_btc.toFixed(2);

                    var usd_account_balance_fro_btc = (Number(Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"))) + Number(usd_balance_fro_btc));

                    usd_account_balance_fro_btc = usd_account_balance_fro_btc.toFixed(2);
                    localStorage.setItem("usd_account_balance",Number(usd_account_balance_fro_btc)/Number(localStorage.getItem("exrate")));//USD

                    //ratio = Q/I -> Number(order_btc_quantity)/Number(bitcoin_balance)
                    //usd_value = ratio*usd_value
                    //alert(localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value"));

                    var ratio_usd_value = Number(order_btc_quantity)/Number(Ibitcoin_balance);
                    var asset_usd_value = Number(localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value"))*ratio_usd_value;
                    var remaining_usd_bal = Number(localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value"))-Number(asset_usd_value);

                    //alert(asset_usd_value);
                    localStorage.setItem("" + localStorage.getItem("asset") + "_usd_value",remaining_usd_bal);//USD
                    //alert(localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value"));


                    /**if (localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value") == null || localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value") == 0) {
                        localStorage.setItem("" + localStorage.getItem("asset") + "_usd_value",Number(usd_balance_fro_btc)/Number(localStorage.getItem("exrate")));//USD
                    } else {
                        localStorage.setItem("" + localStorage.getItem("asset") + "_usd_value",Number(localStorage.getItem("" + localStorage.getItem("asset") + "_usd_value")) - Number(Number(usd_balance_fro_btc)/Number(localStorage.getItem("exrate"))));//USD
                    } */

                    var initial_value = localStorage.getItem(crypto_asset_value);
                    var remaining_value = Number(initial_value) - Number(usd_balance_fro_btc);
                    remaining_value = remaining_value.toFixed(2);

                    localStorage.setItem(crypto_asset_value,remaining_value);//USD
                    //var crypt_value_remainning = Number(localStorage.getItem(crypto_asset_value));
                    //crypt_value_remainning = crypt_value_remainning.toFixed(8);
                    //localStorage.setItem(crypto_asset_value,crypt_value_remainning);//USD

                    if (localStorage.getItem("bot_trading") == "true") {
                        var mysmkt_operation = '' + order_btc_quantity + ' ' + localStorage.getItem("asset") + ' sold worth ' + localStorage.getItem("ccode") + ' ' + usd_balance_fro_btc + ' at ' + localStorage.getItem("ccode") + ' ' + localStorage.getItem("buy_price");

                    } else {
                        var mysmkt_operation = 'You sold ' + order_btc_quantity + ' ' + localStorage.getItem("asset") + ' worth ' + localStorage.getItem("ccode") + ' ' + usd_balance_fro_btc + ' at ' + localStorage.getItem("ccode") + ' ' + localStorage.getItem("buy_price");
 
                    }
                    localStorage.setItem("mysnackbar_mkt_operation", mysmkt_operation);

                    var is_empty = 'no';
                    buy_cliwecked = 1;

                    $("#current_crypto_symbolModal").modal('hide');
                    if (localStorage.getItem("bot_trading") == "true") {
                        
                    } else {
                        $(".loader_center").show();
 
                    }
                    //Query_Kline_Book();  
                    
                    if (localStorage.getItem("bot_trading") == "true") {

                    } else {
                        current_trading_click = 1;
                        rebro_Aisha(localStorage.getItem("bot_training"),localStorage.getItem("username"),localStorage.getItem("asset"),aisa_options,localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
                    }

                    arybit('Query Kline',localStorage.getItem("asset"),''); 

                    //alert("crypto_asset_balance " + localStorage.getItem(crypto_asset_balance) + " usd_account_balance " + localStorage.getItem("usd_account_balance") )
                    dsh_contact(localStorage.getItem("asset") ,username,'',localStorage.getItem("mysnackbar_mkt_operation"),is_empty);
     
                    var order_quantity = 0;
                    order_quantity = order_quantity.toFixed(2);
                    $(".order_quantity").val(order_quantity);
                    $(".order_quantity_range").val(0);
                } else{
                    $(".order_quantity").val(localStorage.getItem(crypto_asset_balance));
                    $(".mkt_err_evaluation").html("You do not have enough crypto");

                    //mysnackbar("You do not have enough crypto");
                    $(".order_quantity_range").val(0);
                }
            }            

        } else {
            $(".order_quantity").addClass("is-invalid");
            $(".order_quantity").removeClass("is-valid");
            var order_btc_quantity = 0;//localStorage.getItem(crypto_asset_balance);//BTC
            $(".mkt_err_evaluation").html("Enter Quantity");

            //mysnackbar("Enter Quantity");
        }        
    }
    //account_balance_called = 1;
    //Query_Kline_Book();
}
function account_mkt_evaluation(aisa_options) {
    if (aisa_options =="buy") {
        $("#sell_modal_crypto_assset").hide();
        $("#sell_modal_select_currency").show();

        let lowest_sell_price = localStorage.getItem("sell_price"); //USD
        let btc_balance_fro_usd = (Number($(".order_quantity").val())/Number(lowest_sell_price))*1; //BTC
        btc_balance_fro_usd = btc_balance_fro_usd.toFixed(8); //BTC
        $(".mkt_evaluation").html(btc_balance_fro_usd + " " + localStorage.getItem("asset"));
        if (localStorage.getItem("bot_trading") == "true") {
            //$(".bot_activity").append(btc_balance_fro_usd + " " + localStorage.getItem("asset"));
            //$(".bot_activity").append("<br>");

        }
    } else if (aisa_options =="sell") {
        $("#sell_modal_select_currency").hide();
        $("#sell_modal_crypto_assset").show();
        $(".select_crypto_assset").html(localStorage.getItem("asset"));

        let highest_buy_price = localStorage.getItem("buy_price");//USD
        let usd_balance_fro_btc = (Number($(".order_quantity").val())/1)*highest_buy_price; //USD
        usd_balance_fro_btc = usd_balance_fro_btc.toFixed(2); //USD
        $(".mkt_evaluation").html(localStorage.getItem("ccode") + " " + usd_balance_fro_btc);
        if (localStorage.getItem("bot_trading") == "true") {
            //$(".bot_activity").append(localStorage.getItem("ccode") + " " + usd_balance_fro_btc);
            //$(".bot_activity").append("<br>");

        }
    }    
}
var new_leads_chart_params = 0;
var new_simple_candlestick_params = 0;

var params = [];
var new_seriesData = [];
var condition_params = 0;
var seriesData = [{
    x: new Date(2016, 01, 01),
    y: [51.98, 56.29, 51.59, 53.85]
  },
  {
    x: new Date(2016, 02, 01),
    y: [53.66, 54.99, 51.35, 52.95]
  },
  {
    x: new Date(2016, 08, 01),
    y: [52.76, 57.35, 52.15, 57.03]
}];

function show_charts_cry(params,action,name,seriesData){
    new_leads_chart(params,action);
    dash_revenue_chart(params,name);
    simple_candlestick(seriesData);
}
function new_leads_chart(params,action) {
    new_leads_chart_params++;

    var colors=["#727cf5","#0acf97","#fa5c7c","#ffbc00"];
    (dataColors=$("#new-leads-chart").data("colors"))&&(colors=dataColors.split(","));
    
    var options2={
        chart:{
            type:"line",
            height:60,
            sparkline:{
                enabled:!0
            }
        },
        series:[
            {
                data: params
            }
        ],
        stroke:{
            width:2,curve:"smooth"
        },
        markers:{
            size:0
        },
        colors:colors,
        tooltip:{
            fixed:{
                enabled:!1
            },
            x:{
                show:!1
            },
            y:{
                title:{
                    formatter:function(o){return""}
                }
            },
            marker:{
                show:!1
            }
        }
    };
    var chart  = new ApexCharts(document.querySelector("#new-leads-chart"),options2);
    chart.render();
    chart.updateOptions({
        data: params
    });  

}


function dash_revenue_chart(params,name) {
    var colors=["#727cf5","#0acf97","#fa5c7c","#ffbc00"];
    (dataColors=$("#dash-revenue-chart").data("colors"))&&(colors=dataColors.split(","));
    var options2={
        chart:{
            type:"line",
            height:121,
            toolbar:{
                show:!1
            },
            sparkline:{
                enabled:!0
            }
        },
        series:[
            {
                name:name,
                type:"area",
                data:params
            }
        ],
        stroke:{
            width:2,curve:"smooth"
        },
        markers:{
            size:0
        },
        colors:colors,
        tooltip:{
            shared:!0,
            intersect:!1,
            y:{
                formatter:function(o){return void 0!==o?o.toFixed(0)+"k":o}
            }
        }
    };
    //new ApexCharts(document.querySelector("#dash-revenue-chart"),options2).render();
    var chart  = new ApexCharts(document.querySelector("#dash-revenue-chart"),options2);
    chart.render();
    chart.updateOptions({
        data: params
    });
}

function simple_candlestick(seriesData) {
    new_simple_candlestick_params++;
    var colors=["#0acf97","#fa5c7c"],dataColors=$("#simple-candlestick").data("colors");
    dataColors&&(colors=dataColors.split(","));
    var options={
        chart:{
            height:400,
            sparkline:{
                enabled:!1
            },
            type:"candlestick"
        },
        plotOptions:{
            candlestick:{
                colors:{
                    upward:colors[0],
                    downward:colors[1]
                }
            }
        },
        series:[
            {
                data:seriesData
            }
        ],
        stroke:{
            show:!0,
            colors:"#1c1f29",
            width:1
        },
        xaxis:{
            type:"datetime"
        },
        grid:{
            borderColor:"#1c1f29"
        }
    };

    //chart=new ApexCharts(document.querySelector("#simple-candlestick"),options);
    //chart.render();
    var chart  = new ApexCharts(document.querySelector("#simple-candlestick"),options);
    chart.render();
    chart.updateOptions({
        data: seriesData
    });
}


function dsh_contact(user_name,con_from,conn_id,chat_message,is_empty) {
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { contact: 12, username: user_name,connect_from: con_from ,connects_id: conn_id, chat_message:chat_message, is_empty:is_empty  },
        processData: true,
        url: api_server_url + '/cordova/loli/contact.php',
        success: function searchSuccess(response) {
            //mysnackbar(chat_message);
            account_balance_called = 1;
            //Query_Kline_Book();
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
    
    var max_va = $(this).val();// max 5 => 100%
    var order_quantity_pct = (max_va/5)*100;    
    localStorage.setItem("order_quantity_pct",order_quantity_pct);//BTC

    // && localStorage.getItem("account_balance") > 0
    //if (localStorage.getItem(crypto_asset_balance) <= 0) {
    //    mysnackbar("Deficient " + crypto_asset_balance + ", try buying some");
    //} else 
    if (localStorage.getItem("aisa_options") == "sell") {
        var crypto_asset_balance = localStorage.getItem("asset");
        crypto_asset_balance = "" + crypto_asset_balance + "_balance";
        if(localStorage.getItem(crypto_asset_balance) == null) {
            localStorage.setItem(crypto_asset_balance,0);//BTC
        }

        var bitcoin_balance = localStorage.getItem(crypto_asset_balance);//BTC
        var pct_bitcoin_balance = (Number(bitcoin_balance) *Number(order_quantity_pct))/100;
        pct_bitcoin_balance = pct_bitcoin_balance.toFixed(8);
        if (localStorage.getItem(crypto_asset_balance) <= 0) {
            $(".mkt_err_evaluation").html("Deficient " + localStorage.getItem("asset") + " Balance, try buying some");

            //mysnackbar("Deficient " + crypto_asset_balance + ", try buying some");
        } else {
            $(".mkt_err_evaluation").html();

            $(".order_quantity").val(pct_bitcoin_balance);
        }

    } else {
        //var account_balance = localStorage.getItem("account_balance");//USD
        var account_balance = Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));//CC
        var pct_account_balance = (Number(account_balance)*Number(order_quantity_pct))/100;
        pct_account_balance = pct_account_balance.toFixed(2);
        if (localStorage.getItem("account_balance") <= 0) {
            $(".mkt_err_evaluation").html("Insufficient balance, load your account.");

            //mysnackbar("Insufficient balance, load your account.");
            display_account_action("show");
        } else {
            $(".mkt_err_evaluation").html();

            $(".order_quantity").val(pct_account_balance);
        }
    }
 
    condition_aisa_options_cliked = 1;
    account_mkt_evaluation(localStorage.getItem("aisa_options"));
    
    
});

function display_account_action(action) {
    if (action == "hide") {
        $("#account_action").hide();
    } else {
        setTimeout(function(){ 
            $("#current_crypto_symbolModal").modal('hide');
            $("#account_deposit").modal('show');
        }, 3000);
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



