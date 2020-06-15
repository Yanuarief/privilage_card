export default 
$(function() {
    /* AJAX FUNCTION */
    $.Array = function(datastring) {
        var newData = [];
        datastring.forEach(function(item) {
          var existing = newData.filter(function(v, i) {
            return v.name == item.name;
          });
          if (existing.length) {
            var existingIndex = newData.indexOf(existing[0]);
            newData[existingIndex].value = newData[existingIndex].value.concat(','+item.value);
          } else {
            if (typeof item.value == 'string')
              item.value = item.value;
            newData.push(item);
          }
        });

        return newData;
    }

    $.get = function(prosess, url, token='') {
        var settings = {
            async: true,
            url: url,
            method: "GET",
            headers: {
              "Authorization" : "Basic " + token
            },
            cache: true,
            beforeSend : function(request) {
            },
            success: function(data) {
                prosess.successData = data;
                $("#app").ready(function() {
                  var preLoder = $("#preloader");
                  preLoder.addClass('hide');
                });
            },
            error: function(data) {
                prosess.errorData = data;
            }
        }

        $.ajax(settings).done(function (response) {

        });
    };

    $.delete = function(prosess, url, token='') {
        var settings = {
            async: true,
            url: url,
            method: "GET",
            headers: {
              "Authorization" : "Basic " + token,
              "Send-Type" : "DELETE",
            },
            cache: false,
            beforeSend : function(request) {
            },
            success: function(data) {
                prosess.successData = data;
            },
            error: function(data) {
                prosess.errorData = data;
            }
        }

        $.ajax(settings).done(function (response) {

        });
    };

    $.Login = function(prosess, url, data, token='') {
          var settings = {
            async: true,
            "url": url,
            "method": "POST",
            "headers": {
              "Authorization" : token,
            },
            "data" : data,
            "processData": false,
            "contentType": false,
            "cache": false,
            beforeSend : function(request) {
                
            },
            success: function(data) {
                prosess.successData = data;
            },
            error: function(data) {
                prosess.errorData = data;
            }
          }

      $.ajax(settings).done(function (response) {

      });
    };

    $.post = function(prosess, url, data, token='') {
          var settings = {
            async: true,
            "url": url,
            "method": "POST",
            "headers": {
              "Authorization" : token,
            },
            "data" : data,
            "processData": false,
            "contentType": false,
            "cache": false,
            beforeSend : function(request) {
                
            },
            success: function(data) {
                prosess.successData = data;
            },
            error: function(data) {
                prosess.errorData = data;
            }
          }

      $.ajax(settings).done(function (response) {

      });
    };

    $.edit = function(prosess, url, data, token='') {
          var settings = {
            async: true,
            "url": url,
            "method": "POST",
            "headers": {
              "Authorization" : "Basic " + token,
              "Send-Type" : "EDIT",
            },
            "data" : data,
            "processData": false,
            "contentType": false,
            "cache": false,
            beforeSend : function(request) {
                
            },
            success: function(data) {
                prosess.successData = data;
            },
            error: function(data) {
                prosess.errorData = data;
            }
          }

      $.ajax(settings).done(function (response) {

      });
    };
    /* End Ajax Function */
});