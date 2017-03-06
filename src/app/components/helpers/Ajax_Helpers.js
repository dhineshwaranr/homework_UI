module.exports = {

    loggedIn : function() {
        return !!localStorage.getItem('pala_token');
    },

    logout : function() {
        localStorage.removeItem('pala_token');
        localStorage.removeItem('pala_current_user');
    },

    formReset : function($form) {
        $($form)[0].reset();
    },

    login:function(url, data) {
        event.preventDefault();
        var result = $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        });
        return result
    },

    postCall:function(url, data) {
        event.preventDefault();
        var token = localStorage.getItem('pala_token');
        var result = $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            headers: { 'Authorization': token }
        });
        return result
    },

    getCall:function(url) {
        var token = localStorage.getItem('pala_token');
        var result = $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            dataType: "json",
            headers: {'Authorization': token}
        });
        return result;
    }



    }

