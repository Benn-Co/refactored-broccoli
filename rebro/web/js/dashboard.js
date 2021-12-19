
$("body").delegate(".mkt_option","click",function(event){
    event.preventDefault();    
    localStorage.setItem("asset",$(this).attr('asset'));
    localStorage.setItem("aisa_options",$(this).attr('aisa_options'));
    localStorage.setItem("price",$(this).attr('price'));
    localStorage.setItem("price_open",$(this).attr('price_open'));
    localStorage.setItem("day_high",$(this).attr('day_high'));
    localStorage.setItem("day_low",$(this).attr('day_low'));
    $("#main_mkt").addClass("is-visible");
    aisa(localStorage.getItem("asset"),localStorage.getItem("aisa_options"),localStorage.getItem("price"),localStorage.getItem("price_open"),localStorage.getItem("day_high"),localStorage.getItem("day_low"));
});

function aisa(asset,aisa_options,price,price_open,day_high,day_low) {
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: '{ "price": "' + price + '", "price_open": "' + price_open + '","day_high": "' + day_high + '" ,"day_low": "' + day_low + '", "options":"' + aisa_options + '", "asset":"' + asset + '"}',
        processData: true,
        url: 'http://localhost:8080/rebro/aisa',
        success: function searchSuccess(response) {
            try {
                mysnackbar(response.options);
            } catch (error) {
                mysnackbar(error);
            }
        },
        error: function searchError(xhr, err) {
            mysnackbar('Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '');
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
