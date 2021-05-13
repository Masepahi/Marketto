$('#instaLogin').on('click', function() {
    $.ajax({
        type: "POST",
        url: "https://api.instagram.com/oauth/authorize",
        data: "{client_id: 292833199041245, redirect_uri: 'https://impt-matketto.herokuapp.com/auth', scope: 'user_profile,user_media', response_type: 'code'}",
        dataType: "dataType",
        success: function (response) {
            console.log(response);
        }
    });
})