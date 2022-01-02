/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
//let hostname = '';
$(document).ready(function(){
    let hostname = window.location.hostname;
    let path_protocol = location.protocol;
    if (hostname.includes("benn-co.github.io") || hostname.includes("oramla") || hostname.includes("localhost") || hostname.includes("192.")) {
        if (hostname.includes("localhost") || hostname.includes("192.")) {            
            onDeviceReady();
        } else {
            if (location.protocol !== 'https:') {
                path_protocol = "https:";
                window.location.href="" + path_protocol + "//" + window.location.hostnam + "";
            }
            onDeviceReady();
        }
    } else {
        document.addEventListener('deviceready', onDeviceReady, false);
    }
});

var username = '';
var api_server_url = 'https://oramla.com';
//var api_server_url = 'http://localhost';
localStorage.setItem("api_server_url", api_server_url);

var updte_is_typing = 0;

var IMAGE_url_path_name = 'https://'  + api_server_url + '/product_images/';

function onDeviceReady() {
    // Cordova is now initialized. Have fun!   
    username = localStorage.getItem("username");
    if (localStorage.getItem("account_balance") == null || localStorage.getItem("bitcoin_balance") == null) {
        localStorage.setItem("account_balance",0);//BTC
        localStorage.setItem("bitcoin_balance",0);//BTC
    } 
    //mysnackbar(localStorage.getItem("account_balance"));
    if (username == null || username == '') {
        $("#pills-account-tab").removeClass("d-none");
        localStorage.setItem("account_balance",0);//USD
        localStorage.setItem("bitcoin_balance",0);//BTC
        localStorage.setItem("username_pic","");
        localStorage.setItem("user_location","");
        localStorage.setItem("user_email","");
        localStorage.setItem("user_phone","");
        $(".username").html(username);
        $(".username_seen").html("last seen " + new Date());
        $(".username_pic").html('<img class="avatar-img" src="./assets/img/favicon/favicon-256x256.png" alt="#">');
        $(".user_location").html(localStorage.getItem("user_location"));
        $(".user_email").html(localStorage.getItem("user_email"));
        $(".user_phone").html(localStorage.getItem("user_phone"));
        $(".bitcoin_balance").html(0);
        $(".bitcoin_balance_usd").html(0);
    } else {
        $("#pills-account-tab").addClass("d-none");
        //alert(username);
        $(".username").html(username);
        $(".username_seen").html("last seen " + new Date());
        $(".username_pic").html('<img class="avatar-img" src="' + localStorage.getItem("username_pic") + '" alt="#">');
        $(".user_location").html(localStorage.getItem("user_location"));
        $(".user_email").html(localStorage.getItem("user_email"));
        $(".user_phone").html(localStorage.getItem("user_phone"));
        //alert(username);

    }
    let file_name = window.location.pathname;
    if (file_name.includes("chat-direct")) {
        var connect_from = localStorage.getItem("connect_from");
        var connect_image_url = localStorage.getItem("connect_image_url");
        $("#connect_from_title").html(connect_from);
        var connect_from_image = document.getElementById('connect_from_image');
        var connect_from_image_av1 = document.getElementById('connect_from_image_av1');
        var connect_from_image_av2 = document.getElementById('connect_from_image_av2');
        connect_from_image.src = connect_image_url;
        connect_from_image_av1.src = connect_image_url;
        connect_from_image_av2.src = connect_image_url;
        
        update_direct_chat(localStorage.getItem("is_typing"),localStorage.getItem("is_online"),localStorage.getItem("connects_time"));
        
        var conn_id = '';
        var chat_message = '';
        var is_empty = '';
        contact(username,connect_from,conn_id,chat_message,is_empty);
    } else {
        localStorage.setItem("connect_from",'');
        localStorage.setItem("connect_image_url",'');
        localStorage.setItem("is_typing",'');
        localStorage.setItem("is_online",'');
        localStorage.setItem("connects_time",'');
        update_direct_chat(localStorage.getItem("is_typing"),localStorage.getItem("is_online"),localStorage.getItem("connects_time"));
        //mysnackbar(username);
    }
    loadconnects();    
}
var IMAGE_pic_url = 0;
var data_length = 0;
function contact(user_name,con_from,conn_id,chat_message,is_empty) {
    if (con_from != '') {
        $.ajax({
            type: "POST", // Type of request to be send, called as
            dataType: 'json',
            data: { contact: 12, username: user_name,connect_from: con_from ,connects_id: conn_id, chat_message:chat_message, is_empty:is_empty  },
            processData: true,
            url: api_server_url + '/cordova/loli/contact.php',
            success: function searchSuccess(response) {
                try {
                    if (response.message == "success") {
                        var connects_data = response.connects;
                        connects_datalength = connects_datalengthnow;
                        connects_datalengthnow = connects_data.length; 
                        var connects_name_image =  response.connects_name_IMAGE; 
                        if (connects_name_image.includes("http", 0)) {
                            IMAGE_pic_url = connects_name_image + '';
                        } else {
                            IMAGE_pic_url = IMAGE_url_path_name + connects_name_image + '';
                        }   
                        if (connects_datalength < connects_datalengthnow || connects_datalength > connects_datalengthnow) {
                            if (response.connect_from != '') {
                                data_length =  connects_data.length;
                                $("#chat").html('');
                                connects_data.forEach(chat_contacts_datamyFunction);                                
                            }
                        }
                    } else {
                        if (response_message_from < 1) {
                            response_message_from = 1;
                            connects_datalengthnow = 0;
                            var is_empty = 'no';
                            contact(con_from ,user_name,conn_id,'Hello ' + user_name + ', My name is ' + con_from  + '. How can i help you?',is_empty);
                        }                    
                    }           
                } catch(e) {
                    mysnackbar('contact Json persing error');
                }
            },
            error: function searchError(xhr, err) {
                mysnackbar('Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '');
            }
        });         
    } else {        
        if (response_message < 1) {
            response_message = 1;
            connects_datalengthnow = 0;
            var is_empty = 'no';
            contact('Mo-pal' ,user_name,conn_id,'Hello ' + user_name + ', My name is ' + 'Mo-pal'  + '. How can i help you?',is_empty);
        }
    }    
}
function chat_contacts_datamyFunction(item, index) {
    var data_i = data_length-1;
    var connect_status = item.connect_status;
    //alert(item.connect_message);
    //alert(connect_status);
    //var _status = JSON.parse(item.connect_status);
    //var item_connect_status = _status.connect_status;
    //const _status_is_typing_array = connect_status.split(',');
    //var who_is_typing = _status_is_typing_array[0];
    //var _status_is_typing = _status_is_typing_array[1];
    //var who_is_typing_to = _status_is_typing_array[2];
    //localStorage.setItem("who_is_typing_to",who_is_typing_to);
    //localStorage.setItem("_status_is_typing",_status_is_typing);
    //localStorage.setItem("who_is_typing",who_is_typing);

    //mysnackbar(connect_status);

    if (connect_status == "unread") {
        var check_status = '<span>✓</span>';
    } else {
        var check_status = '<span class ="text-primary">✓✓</span>';
    }
    if (username != item.connect_from) {
        if (Number.isNaN(Date.parse(item.connects_time))) {
            var connect_date = item.connects_time;
            //var connect_date = new Date(item.connects_time);
        } else {
            var msec = Date.parse(item.connects_time);
            var d = new Date(msec);
            var connect_date =d.toDateString();
            var connect_date = new Date(item.connects_time);
        }
        var item_connects_time = connect_date;
        var connects_name_image = item.connect_message;
        var is_message = item.connect_message;
        if (connects_name_image.includes("reply_message", 0)) {
            const myArray = connects_name_image.split("{,}");
            var reply_message_connect_from = myArray[1];
            var reply_message_connect_message = myArray[2];
            var reply_message_connect_messages_id = myArray[3];
            is_message = myArray[4];

            if (reply_message_connect_from == username) {
                var illiam_Wright = "You";
            } else {
                var illiam_Wright = reply_message_connect_from;
            }

            var reply_message = '<blockquote class="blockquote overflow-hidden reply_ref" mess_ref="message_'+ reply_message_connect_messages_id +'">' + 
            '<h6 class="text-reset text-truncate">' + illiam_Wright + '</h6>' + 
            '<p class="small text-truncate">' + reply_message_connect_message + '</p>' + 
            '</blockquote>';
            
        } else {
            var reply_message = '';
        }
        if (is_message.includes("http", 0)) {
            IMAGE_pic_url = is_message + '';
            var message_gallary = '<div class="message-gallery">' + reply_message +

            '<div class="row gx-3">' +
    
            '<div class="col">' +
            '<img class="img-fluid rounded" src="' + IMAGE_pic_url + '" data-action="zoom" alt="">' +
            '</div>' +
    
            '<div class="col">' +
            '<img class="img-fluid rounded" src="' + IMAGE_pic_url + '" data-action="zoom" alt="">' +
            '</div>' +
    
            '<div class="col">' +
            '<img class="img-fluid rounded" src="' + IMAGE_pic_url + '" data-action="zoom" alt="">' +
            '</div>' +
    
            '</div>' +
            '</div>';
            var message_is_type  = message_gallary;

        } else {
            //IMAGE_pic_url = IMAGE_url_path_name + connects_name_image + '';
            var message_text = '<div class="message-text">' + reply_message + 
            '<p>' + is_message + '</p>' +
            '</div>';
            var message_is_type  = message_text;

        }
        var connect_messages = '<div id="message_' + item.connect_messages_id + '" class="message" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<a href="#" data-bs-toggle="modal" data-bs-target="#modal-user-profile" class="avatar avatar-responsive">' +
        '<img class="avatar-img" src="' + IMAGE_pic_url + '" alt="">' +
        '</a>' +

        '<div class="message-inner">' +
        '<div class="message-body">' +
        '<div class="message-content">' + message_is_type +

        '<!-- Dropdown -->' +
        '<div class="message-action">' +
        '<div class="dropdown">' +
        '<a class="icon text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>' +
        '</a>' +

        '<ul class="dropdown-menu">' +
        '<li>' +
        '<a class="dropdown-item d-flex align-items-center edit_message" href="#" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<span class="me-auto">Edit</span>' +
        '<div class="icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>' +
        '</div>' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a class="dropdown-item d-flex align-items-center reply_message" href="#" connect_message="' + is_message + '" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<span class="me-auto">Reply</span>' +
        '<div class="icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-up-left"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>' +
        '</div>' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<hr class="dropdown-divider">' +
        '</li>' +
        '<li>' +
        '<a class="dropdown-item d-flex align-items-center text-danger delete_message" href="#" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<span class="me-auto">Delete</span>' +
        '<div class="icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>' +
        '</div>' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="message-footer">' +
        '<span class="extra-small text-muted">' + item_connects_time + '</span>' + 
        '</div>' +
        '</div>' +
        '</div>';
           
    } else {
        if (Number.isNaN(Date.parse(item.connects_time))) {
            var connect_date = item.connects_time;
            //var connect_date = new Date(item.connects_time);
        } else {
            var msec = Date.parse(item.connects_time);
            var d = new Date(msec);
            var connect_date =d.toDateString();
            var connect_date = new Date(item.connects_time);
        }
        var item_connects_time = connect_date;

        var connects_name_image = item.connect_message;
        var is_message = item.connect_message;
        if (connects_name_image.includes("reply_message", 0)) {
            const myArray = connects_name_image.split("{,}");
            var reply_message_connect_from = myArray[1];
            var reply_message_connect_message = myArray[2];
            var reply_message_connect_messages_id = myArray[3];
            is_message = myArray[4];

            if (reply_message_connect_from == username) {
                var illiam_Wright = "You";
            } else {
                var illiam_Wright = reply_message_connect_from;
            }

            var reply_message = '<blockquote class="blockquote overflow-hidden reply_ref" mess_ref="message_'+ reply_message_connect_messages_id +'">' + 
            '<h6 class="text-reset text-truncate">' + illiam_Wright + '</h6>' + 
            '<p class="small text-truncate">' + reply_message_connect_message + '</p>' + 
            '</blockquote>';
            
        } else {
            var reply_message = '';
        }

        if (is_message.includes("http", 0)) {
            IMAGE_pic_url = is_message + '';
            var message_gallary = '<div class="message-gallery">' + reply_message + 
            '<div class="row gx-3">' +
    
            '<div class="col">' +
            '<img class="img-fluid rounded" src="' + IMAGE_pic_url + '" data-action="zoom" alt="">' +
            '</div>' +
    
            '<div class="col">' +
            '<img class="img-fluid rounded" src="' + IMAGE_pic_url + '" data-action="zoom" alt="">' +
            '</div>' +
    
            '<div class="col">' +
            '<img class="img-fluid rounded" src="' + IMAGE_pic_url + '" data-action="zoom" alt="">' +
            '</div>' +
    
            '</div>' +
            '</div>';
            var message_is_type  = message_gallary;

        } else {
            //IMAGE_pic_url = IMAGE_url_path_name + connects_name_image + '';
            var message_text = '<div class="message-text">' + reply_message + 
            '<p>' + is_message + '</p>' +
            '</div>';
            var message_is_type  = message_text;

        }

        var connect_messages  = '<div id="message_' + item.connect_messages_id + '" class="message message-out" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<a href="#" data-bs-toggle="modal" data-bs-target="#modal-profile" class="avatar avatar-responsive">' +
        '<img class="avatar-img" src="' + IMAGE_pic_url + '" alt="">' +
        '</a>' +

        '<div class="message-inner">' +
        '<div class="message-body">' +
        '<div class="message-content">' + message_is_type +        

        '<!-- Dropdown -->' +
        '<div class="message-action">' +
        '<div class="dropdown">' +
        '<a class="icon text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>' +
        '</a>' +

        '<ul class="dropdown-menu">' +
        '<li>' +
        '<a class="dropdown-item d-flex align-items-center edit_message" href="#" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<span class="me-auto">Edit</span>' +
        '<div class="icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>' +
        '</div>' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a class="dropdown-item d-flex align-items-center reply_message" href="#" connect_message="' + is_message + '" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<span class="me-auto">Reply</span>' +
        '<div class="icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-up-left"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>' +
        '</div>' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<hr class="dropdown-divider">' +
        '</li>' +
        '<li>' +
        '<a class="dropdown-item d-flex align-items-center text-danger delete_message" href="#" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' +
        '<span class="me-auto">Delete</span>' +
        '<div class="icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>' +
        '</div>' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="message-footer">' +
        '<span class="extra-small text-muted">' + item_connects_time + '</span>' + check_status +
        '</div>' +
        '</div>' +
        '</div>';
        
    }

    if (username != '') {
        var reply_from = '';
    } else {
        var reply_to = '';
    }

    if (data_i == index) {
        var is_typing = localStorage.getItem("is_typing");
        //alert(localStorage.getItem("is_typing"));
        //localStorage.getItem("who_is_typing")
        //localStorage.getItem("who_is_typing_to")
        //localStorage.getItem("_status_is_typing")
        if (is_typing == 'is typing') {
            var typing = '<div class="message">' +
            '<a href="#" data-bs-toggle="modal" data-bs-target="#modal-user-profile" class="avatar avatar-responsive">' +
            '<img class="avatar-img" src="' + IMAGE_pic_url + '" alt="">' +
            '</a>' +
    
            '<div class="message-inner">' +
            '<div class="message-body">' +
            '<div class="message-content">' +
            '<div class="message-text">' +
            '<p>' + localStorage.getItem("who_is_typing_to") + ' is typing<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
            //$("#chat").append(connect_messages + typing);
        } 
        $("#chat").append(connect_messages);
        $("#chat").append('<pan id="chat_message_end"></span>');
        window.location.href="#chat_message_end";         
    } else {
        $("#chat").append(connect_messages);
    }
    
}
function loadconnects() {
    //conectset = 1;
    if (username == null || username == '') {
        var file_name = window.location.pathname;
        if (file_name.includes("index")) { 
            let fik_path = "signin.html";
            //let file_name = window.location.pathname;
            let text = file_name;
            const myArray = text.split("/");
            let newText = text.replace(myArray[myArray.length - 1], "");
            let new_window_location_pathname = newText + fik_path;
            let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
            window.location.href= window_location_href;

            /**if (file_name.includes("light")) {
                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "signin.html";
            } else if (file_name.includes("dark")) {
                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "signin.html";
            } else {
                window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "signin.html";
            } */
        } else {
            
        }        
    } else{
        loadchat(localStorage.getItem("connect_from"));
        setTimeout(loadconnects, 3000);
    }    
}
var is_true = 0;
function  loadchat(item_connect_from) { 
    //alert(api_server_url + '/cordova/loli/chat_main_container.php');
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { chat_main_container: 12, username: username,is_online: is_online,is_typing: is_typing, item_connect_from: item_connect_from },
        processData: true,
        url: api_server_url + '/cordova/loli/chat_main_container.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {
                    var connects_data = response.connects;
                    connects_datalength = connect_messages;
                    connect_messages = response.connect_messages;
                    if (connects_datalength < connect_messages || connects_datalength > connect_messages) {
                        is_true = 1;
                        bumcondition = 1;
                        tab_count_chats = 0;
                        $("#tab_count_chats").html(tab_count_chats);                     
                        if (localStorage.getItem("connect_from") != '' ) {
                            var is_empty = '';
                            contact(username,localStorage.getItem("connect_from"),'','',is_empty);
                        }
                    } else {
                        is_true = 0;
                        tab_count_chats = 0;
                    }
                    $("#connects_chat").html('');
                    connects_data.forEach(connects_datamyFunction);                    
                } else {
                    var is_empty = 'no';
                    contact('Mo-pal' ,username,'','Hello ' + username + ', My name is ' + 'Mo-pal'  + '. How can i help you?',is_empty);
                }
            } catch(e) {
                mysnackbar('loadchat Json persing error');
            }          
        },
        error: function searchError(xhr, err) {
            mysnackbar('Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr));
        }
    });    
}
var bum = 0;
var tab_count_chats = 0;
var bumcondition = 0;
var connects_datalength = 0;
var connects_datalengthnow = 0;
var connect_messages = 0;
var is_typing = "";
var is_online = "";

function connects_datamyFunction(item, index) {
    var i = 0;
    //var IMAGE_url = '../img/jeans3.jpg';
    var is_message = item.connect_message;
    var connects_name_image = item.connect_message;
    if (connects_name_image.includes("reply_message", 0)) {
        const myArray = connects_name_image.split("{,}");
        var reply_message_connect_from = myArray[1];
        var reply_message_connect_message = myArray[2];
        var reply_message_connect_messages_id = myArray[3];
        is_message = myArray[4];
        
    } else {
        //var reply_message = '';
    }
    var messag = is_message;

        
    var chat_message = "";
    if (messag.length <= 30) {
        chat_message = messag;
    } else {
        chat_message = messag.substring(0, 30) + "...";
    }
    if (item.connect_from == username) {
        var connect_name = item.connect_to;
    } else {
        var connect_name = item.connect_from;  
    }
    var _status = JSON.parse(item.connect_status);
    var item_connect_status = _status.connect_status;
    var is_online = _status.is_online;
    var _status_is_typing_arr = _status.is_typing;
    
    const _status_is_typing_array = _status_is_typing_arr.split(',');
    var who_is_typing = _status_is_typing_array[0];
    var _status_is_typing = _status_is_typing_array[1];
    var who_is_typing_to = _status_is_typing_array[2];
    
    localStorage.setItem("who_is_typing",who_is_typing);

    var connect_from_tryping = 0;
    if (localStorage.getItem("connect_from") == who_is_typing) {
    //if (username == who_is_typing) {
        var is_typing = _status_is_typing;
        //connect_from_tryping = 1;
    } else {
        var is_typing = '';
    }
    var last_seen = _status.last_seen;

    bum =  Number(_status.count);
    
    if (bumcondition == 1) {
        tab_count_chats = tab_count_chats + bum;
        $("#tab_count_chats").html(tab_count_chats);
    }

    if (item_connect_status == "unread") {
        var check_status = '<span>✓</span>';
    } else {
        var check_status = '<span class ="text-primary">✓✓</span>';
    }

    if (bum == 0 ) {
        var bumr = '' + check_status + '';
    } else {
        var bumr = '<div class="badge badge-circle bg-primary ms-5">' +
        '<span>' + bum + '</span>' +
        '</div>';
    }

    var connects_image =  _status.connects_name_IMAGE; 
    if (connects_image.includes("http", 0)) {
        var IMAGE_url = connects_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + connects_image + '';
    }
    
    if (Number.isNaN(Date.parse(item.connects_time))) {
        var connect_date = item.connects_time;
        //var connect_date = new Date(item.connects_time);
    } else {
        var msec = Date.parse(item.connects_time);
        var d = new Date(msec);
        var connect_date =d.toDateString();
        var connect_date = new Date(item.connects_time);
    }    

    if (is_online == "is online") {
        var online_status = 'avatar-online';
    } else {
        var online_status = '';
    } 
    
    if (is_typing == "is typing" && connect_name == localStorage.getItem("connect_from")) {
        chat_message = 'is typing<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
        //updte_is_typing = 1;
        update_direct_chat(localStorage.getItem("is_typing"),localStorage.getItem("is_online"),localStorage.getItem("connects_time"));
    } else {
        //updte_is_typing = 1;
        //if (connect_from_tryping == 1) {
           // connect_from_tryping = 0;
        update_direct_chat(localStorage.getItem("is_typing"),localStorage.getItem("is_online"),localStorage.getItem("connects_time"));
        //}
    }

    var redirect_html_val = 'chat-direct.html';
    var direct_chat = ' <a hrf="' + redirect_html_val + '" class="card border-0 text-reset get_contact" redirect_html_val="' + redirect_html_val + '" is_typing="' + is_typing + '" is_online="' + is_online + '" connect_image_url="' + IMAGE_url + '" connect_from="' + connect_name + '" connects_id="' + item.connects_id + '" connects_time="' + item.connects_time + '">' +
    '<div class="card-body">' +
    '<div class="row gx-5">' +
    '<div class="col-auto">' +
    '<div class="avatar ' + online_status + '">' +
    '<img src="' + IMAGE_url + '" alt="#" class="avatar-img">' +
    '</div>' +
    '</div>' +

    '<div class="col">' +
    '<div class="d-flex align-items-center mb-3">' +
    '<h5 class="me-auto mb-0">' + connect_name + '</h5>' +
    '<span class="text-muted extra-small ms-2">' + connect_date + '</span>' +
    '</div>' +

    '<div class="d-flex align-items-center">' +
    '<div class="line-clamp me-auto">' +
    '' + chat_message + '' +
    '</div>' + bumr +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>';
    $("#connects_chat").append(direct_chat);
       

    /**var group_chat = '<a href="chat-group.html" class="card border-0 text-reset">' +
    '<div class="card-body">' +
    '<div class="row gx-5">' +
    '<div class="col-auto">' +
    '<div class="avatar avatar-online">' +
    '<img src="https://lh3.googleusercontent.com/ogw/ADea4I59K0EGsOZ-WpO1NWPVScrbSR0Zlil2kOpOZQyJ=s32-c-mo" alt="#" class="avatar-img">' +
    '</div>' +
    '</div>' +
    '<div class="col">' +
    '<div class="d-flex align-items-center mb-3">' +
    '<h5 class="me-auto mb-0">William Wright</h5>' +
    '<span class="text-muted extra-small ms-2">12:45 PM</span>' +
    '</div>' +
    '<div class="d-flex align-items-center">' +
    '<div class="line-clamp me-auto">' +
    'Hello! Yeah, I am going to meet my friend of mine at the departments stores now.' +
    '</div>' +
    '<div class="badge badge-circle bg-primary ms-5">' +
    '<span>3</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="card-footer">' +
    '<div class="row align-items-center gx-4">' +
    '<div class="col-auto">' +
    '<div class="avatar avatar-xs">' +
    '<img class="avatar-img" src="assets/img/avatars/bootstrap.svg" alt="Bootstrap Community">' +
    '</div>' +
    '</div>' +
    '<div class="col">' +
    '<h6 class="mb-0">Bootstrap Community</h6>' +
    '</div>' +
    '<div class="col-auto">' +
    '<div class="avatar-group">' +
    '<div class="avatar avatar-xs">' +
    '<img src="assets/img/avatars/12.jpg" alt="#" class="avatar-img">' +
    '</div>' +
    '<div class="avatar avatar-xs">' +
    '<img src="assets/img/avatars/11.jpg" alt="#" class="avatar-img">' +
    '</div>' +
    '<div class="avatar avatar-xs">' +
    '<img src="assets/img/avatars/9.jpg" alt="#" class="avatar-img">' +
    '</div>' +
    '<div class="avatar avatar-xs">' +
    '<span class="avatar-text">+5</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>';
    $("#connects_chat").append(group_chat); */

    

    /**var typing_chat = ' <a href="chat-empty.html" class="card border-0 text-reset">' +
    '<div class="card-body">' +
    '<div class="row gx-5">' +
    '<div class="col-auto">' +
    '<div class="avatar avatar-online">' +
    '<img src="assets/img/avatars/8.jpg" alt="#" class="avatar-img">' +
    '</div>' +
    '</div>' +
    '<div class="col">' +
    '<div class="d-flex align-items-center mb-3">' +
    '<h5 class="me-auto mb-0">Elise Dennis</h5>' +
    '<span class="text-muted extra-small ms-2">08:35 PM</span>' +
    '</div>' +
    '<div class="d-flex align-items-center">' +
    '<div class="line-clamp me-auto">' +
    'is typing<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>';
    $("#connects_chat").append(typing_chat); */ 
}

$("body").delegate(".get_contact","click",function(event){
    event.preventDefault();    
    localStorage.setItem("connect_from",$(this).attr('connect_from'));
    localStorage.setItem("connect_image_url",$(this).attr('connect_image_url'));
    localStorage.setItem("is_typing",$(this).attr('is_typing'));
    localStorage.setItem("is_online",$(this).attr('is_online'));
    localStorage.setItem("connects_time",$(this).attr('connects_time'));

    localStorage.setItem("who_is_typing_to",$(this).attr('connect_from'));
    localStorage.setItem("_status_is_typing",$(this).attr('is_typing'));
    localStorage.setItem("who_is_typing",username);

    let fik_path = $(this).attr('redirect_html_val');
    let file_name = window.location.pathname;
    let text = file_name;
    const myArray = text.split("/");
    let newText = text.replace(myArray[myArray.length - 1], "");
    let new_window_location_pathname = newText + fik_path;
    let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
    window.location.href= window_location_href;

    /**var file_name = window.location.pathname;
    if (file_name.includes("light")) {
        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + $(this).attr('redirect_html_val') + "";
    } else if (file_name.includes("dark")) {
        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + $(this).attr('redirect_html_val') + "";
    } else {
        window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + $(this).attr('redirect_html_val') + "";
    } */ 
});
var reply_message_on = 0;
var reply_message_connect_from = '';
var reply_message_connect_message = '';
var reply_message_connect_messages_id = '';

$("body").delegate(".reply_message","click",function(event){
    var connect_from = $(this).attr('connect_from');
    var connect_message = $(this).attr('connect_message');
    var connect_messages_id = $(this).attr('connect_messages_id');
    if (connect_from == username) {
        var reply_mess_preview = '<div class="message message-out">' + 
        '<div class="message-inner">' +
        '<div class="message-body">' +
        '<div class="message-content">' +
        '<div class="message-text">' +
        '<blockquote class="blockquote overflow-hidden">' +
        '<h6 class="text-reset text-truncate">You</h6>' +
        '<p class="small text-truncate">' + connect_message + '</p>' +
        '</blockquote>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    } else {
        var reply_mess_preview = '<div class="message">' + 
        '<div class="message-inner">' +
        '<div class="message-body">' +
        '<div class="message-content">' +
        '<div class="message-text">' +
        '<blockquote class="blockquote overflow-hidden">' +
        '<h6 class="text-reset text-truncate">' + connect_from + '</h6>' +
        '<p class="small text-truncate">' + connect_message + '</p>' +
        '</blockquote>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    }
    $('#dz-preview-row').html(reply_mess_preview);
    //dz-preview-row
    $('#chat_message').focus();
    reply_message_connect_from = connect_from;
    reply_message_connect_message = connect_message;
    reply_message_connect_messages_id = connect_messages_id;

    reply_message_on = 1;
});
$("body").delegate(".delete_message","click",function(event){
    var connect_from = $(this).attr('connect_from');
    var connect_message = $(this).attr('connect_message');

});
$("body").delegate(".edit_message","click",function(event){
    var connect_from = $(this).attr('connect_from');
    var connect_message = $(this).attr('connect_message');

});
$("body").delegate(".reply_ref","click",function(event){
    //var connect_from = $(this).attr('mess_ref');
    window.location.href="#" + $(this).attr('mess_ref') + "";
});
$("body").delegate(".logout_me","click",function(event){
    event.preventDefault(); 
    username = '';
    localStorage.setItem("account_balance",0);//USD
    localStorage.setItem("bitcoin_balance",0);//BTC
    $(".bitcoin_balance").html(0);
    $(".bitcoin_balance_usd").html(0);
    /**localStorage.setItem("account_balance",account_balance);//USD
                    localStorage.setItem("bitcoin_balance",bitcoin_balance);//BTC
                    $(".bitcoin_balance").html(account_balance);
                    $(".bitcoin_balance_usd").html(account_balance); */
    localStorage.setItem("username", username);
    $("#pills-account-tab").removeClass("d-none");
    localStorage.clear();
    onDeviceReady()
    //loadconnects();
});
$("#ttab-support").click(function(){ 
    //pings.html
    var file_name = window.location.pathname;
    if (file_name.includes("pings")) {

        let fik_path = "pings.html";
        let file_name = window.location.pathname;
        let text = file_name;
        const myArray = text.split("/");
        let newText = text.replace(myArray[myArray.length - 1], "");
        let new_window_location_pathname = newText + fik_path;
        let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
        window.location.href= window_location_href;

        /**if (file_name.includes("light")) {
            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "pings.html" + "";
        } else if (file_name.includes("dark")) {
            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "pings.html" + "";
        } else {
            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "pings.html" + "";
        } */
    } else {

        let fik_path = "pings.html";
        let file_name = window.location.pathname;
        let text = file_name;
        const myArray = text.split("/");
        let newText = text.replace(myArray[myArray.length - 1], "");
        let new_window_location_pathname = newText + fik_path;
        let window_location_href ="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + new_window_location_pathname;
        window.location.href= window_location_href;

        /**if (file_name.includes("light")) {
            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "pings.html" + "";
        } else if (file_name.includes("dark")) {
            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "pings.html" + "";
        } else {
            window.location.href="" + location.protocol + "//" + window.location.hostname + "" + ":" + "" + window.location.port + window.location.pathname + "pings.html" + "";
        } */
    }   
    
});
$("#send_button").click(function(){
    var str = $("#chat_message").val();
    if (/^\s*$/.test(str)) {
    } else {
        send_message($("#chat_message").val());
    }
});
$("#chat_message").on('keypress',function(e) {
    if(e.which == 13) {
        var str = $("#chat_message").val();
        if (/^\s*$/.test(str)) {
        } else {
            send_message($("#chat_message").val());
        }
    }
});
function send_message(chat_message) {
    const regex_emoji = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;
    if (regex_emoji.test(chat_message) || chat_message != '') {
        var is_empty = 'no';
        if (reply_message_on == 1) {
            reply_message_on = 0;
            $('#dz-preview-row').html('');
            var is_message = chat_message;
            chat_message = "reply_message{,}" + reply_message_connect_from + "{,}" + reply_message_connect_message + "{,}" + reply_message_connect_messages_id + "{,}" + is_message + "";
        } else {
            
        }
        contact(username,localStorage.getItem("connect_from"),'',chat_message,is_empty);
        $("#chat_message").val('');
    } else {
        var is_empty = '';
    }
}
$("#chat_message").keypress(function(){
    is_typing = 'is typing';
    localStorage.setItem("is_typing",is_typing);
    //updte_is_typing = 1;
    //update_direct_chat(is_typing,localStorage.getItem("is_online"),localStorage.getItem("connects_time"));
    setTimeout(not_typing, 4500);
});
function not_typing() {
    is_typing = '';
    localStorage.setItem("is_typing",is_typing);
    //updte_is_typing = 1;
    //update_direct_chat(is_typing,localStorage.getItem("is_online"),localStorage.getItem("connects_time"));
}
function update_direct_chat(is_typing,is_online,connects_time) {
    if (is_typing == 'is typing' && localStorage.getItem("connect_from") == localStorage.getItem("who_is_typing")) {
        $("#connect_from_action").html("is typing<span class='typing-dots'><span>.</span><span>.</span><span>.</span></span>");
    } else {
        $("#connect_from_action").html(connects_time);
    }

    if (is_online == 'is online') {
        $("#connect_from_online").addClass('avatar-online');
    } else {
        $("#connect_from_online").removeClass('avatar-online');
    }

    localStorage.setItem("who_is_typing_to",localStorage.getItem("connect_from"));
    localStorage.setItem("_status_is_typing",is_typing);
    localStorage.setItem("who_is_typing",username);

     //updte_is_typing = 1;
    //contact(username,localStorage.getItem("connect_from"),'','',is_empty);

}


















$("body").delegate(".volume_mute_fill","click",function(event){
    event.preventDefault();
    mysnackbar("volume_mute_fill: ");
});

$("body").delegate(".volume_up_fill","click",function(event){
    event.preventDefault();
    mysnackbar("volume_up_fill: ");
});

$("body").delegate(".video_play_fill","click",function(event){
    event.preventDefault();
    mysnackbar("video_play_fill: ");
});

$("body").delegate(".video_pause_fill","click",function(event){
    event.preventDefault();
    mysnackbar("video_pause_fill: ");
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
//var container_video = '<video class="" src="' + IMAGE_url + '" loop="1" preload="auto" muted="" width="100%" height="100%"></video>';


$("body").delegate(".alpha_video","mouseover",function(event){
    event.preventDefault();
    $('video', this).get(0).play();
});
$("body").delegate(".alpha_video","mouseout",function(event){
    event.preventDefault();
    $('video', this).get(0).pause();
});



/**function chats(username){
    $.ajax({
          type: "POST", // Type of request to be send, called as
          data: { login_user: 12, login_email: 'ohnn@gmail.com', login_password:'oramlaco', login_details_username:'ohnn', login_details_email:'' },
          processData: true,
          url: api_server_url + '/cordova/loli/login_user.php',
          success: function searchSuccess(response) {
            try {
              if (response.message == "success") {
                mysnackbar("response: " + response.message);
              } else {
                mysnackbar("response: " + response.message);
              }
            } catch(e) {
                mysnackbar("exception: " + e);
            }
          },
          error: function searchError(xhr, err) {
            mysnackbar("err: " + err + ' ' + JSON.stringify(xhr));  
          }
    });
} */