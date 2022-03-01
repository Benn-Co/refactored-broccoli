let lo = '';
let la = '';
var api_server_url = localStorage.getItem("api_server_url");
get_country_codes(lo,la);
function get_country_codes(lo,la) {
  $.ajax({
    type: "POST", // Type of request to be send, called as 
    dataType: 'json',
    data: { lo: lo, la: la},
    processData: true,
    url: api_server_url + '/cordova/get_country_codes.php',
    success: function searchSuccess(response) {
      try { 
         let countries = response.countries;
         let fLen = countries.length;
         
         for (let i = 0; i < fLen; i++) {
           if (i < 1) {
             $(".select_currency").html(countries[i].cname);
             $(".mcode").html(countries[i].mcode);
             localStorage.setItem("mcode", countries[i].mcode);
             localStorage.setItem("ccode", countries[i].ccode);
             localStorage.setItem("exrate", countries[i].exrate);
             localStorage.setItem("cname", countries[i].cname);
             //localStorage.setItem("pr_exrate", localStorage.getItem("exrate"));
             
             //alert(localStorage.getItem("ccode"));
             //onDeviceReady();
             Query_Symbol('Query Symbol','','');

             if (countries[i].mcode == '+254') {
              $(".mpesa").show();
             } else {
               //mpesa
               $(".mpesa").hide();
             }
             var account_balance = Number(localStorage.getItem("usd_account_balance"))*Number(localStorage.getItem("exrate"));
             if (account_balance.toFixed(2) < 1) {
                 account_balance = account_balance.toFixed(4);
             } else {
                 account_balance = account_balance.toFixed(2);                            
             }
             //var account_balance = localStorage.getItem("account_balance");
             $(".account_balance").attr("account_balance",account_balance);
             $(".account_balance").html(localStorage.getItem("ccode") + " " + account_balance);
             localStorage.setItem("account_balance", account_balance);

             //1 USD = 113.55 KES
             //113.55 KES = 1 USD
             // 1 KES = ? USD => 1/113.55 USD

             var curre = '<li><a class="dropdown-item active currency_option" cname="' + countries[i].cname + '" mcode="' + countries[i].mcode + '" exchange_rate="' + countries[i].exrate + '" ccode="' + countries[i].ccode + '" currency_name="' + countries[i].ccode + '" country_name="' + countries[i].name + '" href="">' + countries[i].cname + '</a></li>' +
                         '<li><hr class="dropdown-divider"></li>';
                         $(".currency_list").append(curre);
                         
             var mcode_list = '<li><a class="dropdown-item currency_option" cname="' + countries[i].cname + '" mcode="' + countries[i].mcode + '" exchange_rate="' + countries[i].exrate + '" ccode="' + countries[i].ccode + '" currency_name="' + countries[i].ccode + '" country_name="' + countries[i].name + '" href="">' + countries[i].mcode + '</a></li>';
                         $(".mcode_list").append(mcode_list);
      
             $(".select_country").html(countries[i].name);
             var country = '<li><a class="dropdown-item active country_option" cname="' + countries[i].cname + '" mcode="' + countries[i].mcode + '" exchange_rate="' + countries[i].exrate + '" ccode="' + countries[i].ccode + '" currency_name="' + countries[i].ccode + '" country_name="' + countries[i].name + '" href="">' + countries[i].name + '</a></li>' +
                           '<li><hr class="dropdown-divider"></li>';
                           $(".country_list").append(country);
             //bybit_mkt('Query Symbol','',''); 
             //Query_Symbol_Book();
             //arybit('Query Kline',localStorage.getItem("asset"),'');
             //Query_Symbol('Query Symbol','','');
             //Query_Kline_Book();
           }else{
             var curre = '<li><a class="dropdown-item currency_option" cname="' + countries[i].cname + '" mcode="' + countries[i].mcode + '" exchange_rate="' + countries[i].exrate + '" ccode="' + countries[i].ccode + '" currency_name="' + countries[i].ccode + '" country_name="' + countries[i].name + '" href="">' + countries[i].cname + '</a></li>' +
                         '<li><hr class="dropdown-divider"></li>';
                         $(".currency_list").append(curre);
             var mcode_list = '<li><a class="dropdown-item currency_option" cname="' + countries[i].cname + '" mcode="' + countries[i].mcode + '" exchange_rate="' + countries[i].exrate + '" ccode="' + countries[i].ccode + '" currency_name="' + countries[i].ccode + '" country_name="' + countries[i].name + '" href="">' + countries[i].mcode + '</a></li>';
                         $(".mcode_list").append(mcode_list);
      
             var country = '<li><a class="dropdown-item active country_option" cname="' + countries[i].cname + '" mcode="' + countries[i].mcode + '" exchange_rate="' + countries[i].exrate + '" ccode="' + countries[i].ccode + '" currency_name="' + countries[i].ccode + '" country_name="' + countries[i].name + '" href="">' + countries[i].name + '</a></li>' +
                           '<li><hr class="dropdown-divider"></li>';
                           $(".country_list").append(country);
           }                            
         }

      } catch (error) {
        //alert(error);
      }

    },
    error: function searchError(xhr, err) {
      //alert(err);
      //mysnackbar("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
    }
});
}
   
   