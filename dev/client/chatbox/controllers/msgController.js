(function() {

    "use strict";

    var ui = chatbox.ui;
    var msgHandler = chatbox.msgHandler;
    var utils = chatbox.utils;


    ui.init.push(function() {

        $(window).keydown(function (event) {

            // When the client hits ENTER on their keyboard
            if (event.which === 13) {

                if (ui.$inputMessage.is(":focus")) {
                    sendMessage();
                    chatbox.socket.emit('stop typing', {name: chatbox.username});
                    //typing = false;
                }
            }

        });







    });

    // Send a message
    function sendMessage() {
        var message = ui.$inputMessage.val();
        // Prevent markup from being injected into the message
        message = utils.cleanInput(message);

        // if there is a non-empty message
        if (message) {
            // empty the input field
            ui.$inputMessage.val('');
            msgHandler.sendMessage(message);
        }
    }
 
    // Add it to chat area
    function addMessageElement($el) {

        ui.$messages.append($el);

        //loading media takes time so we delay the scroll down
        ui.$messages[0].scrollTop = ui.$messages[0].scrollHeight;
    }

    ui.addMessageElement = addMessageElement;

        // Log a message
    function addLog(log) {
        var $el = $('<li>').addClass('socketchatbox-log').text(log);
        addMessageElement($el);
    }

    ui.addLog = addLog;


    function addParticipantsMessage(numUsers) {
        var message = '';
        if (numUsers === 1) {

            message += "You are the only user online";

        }else {

            message += "There are " + numUsers + " users online";
        }

        addLog(message);

    }

    ui.addParticipantsMessage = addParticipantsMessage;

})();