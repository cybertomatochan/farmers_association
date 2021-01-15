let Google_appId = "156146918732-6paguni0saa0q23trs6j41mvlvnbtn53.apps.googleusercontent.com";
 
// Called when Google Javascript API Javascript is loaded
function HandleGoogleApiLibrary() {
    // Load "client" & "auth2" libraries
    gapi.load('client:auth2', {
        callback: function () {
            // Initialize client & auth libraries
            gapi.client.init({
                clientId: Google_appId,
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
            }).then(
                function (success) {
                    // Google Libraries are initialized successfully
                    // You can now make API calls 
                    console.log("Google Libraries are initialized successfully");
                },
                function (error) {
                    // Error occurred
                    console.log(error);// to find the reason 
                }
            );
        },
        onerror: function () {
            // Failed to load libraries
            console.log("Failed to load libraries");
        }
    });
}



function GoogleLogin() {
    // API call for Google login  
    gapi.auth2.getAuthInstance().signIn().then(
        function (success) {
            // Login API call is successful 
            console.log('成功登入google')
            console.log(success);
            let Google_ID = success["El"];
           //這邊可以寫抓到登入資訊後要做的事，比如將會員資料寫到資料庫之類的
             
        },
        function (error) {
            // Error occurred
            // console.log(error) to find the reason
            console.log(error);
        }
    );

}

//監聽

const googleBtn = document.getElementById('googleLogin');

googleBtn.addEventListener('click',()=>{
    GoogleLogin()
});


const fbBtn = document.getElementById('fbLogin');
fbBtn.addEventListener('click',()=>{
    FBLogin()
});


//  FB LOGIN

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1288529518180235',
      cookie     : true,
      xfbml      : true,
      version    : 'v9.0'
    });
      
    FB.AppEvents.logPageView();   
      
};

  (function(d, s, id){
     let js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

    function FBLogin() {
             
        FB.login(function (response) {
            //debug用
            console.log(response);
            if (response.status === 'connected') {
                //user登入成功
                //抓userID
                let fb_id = response["authResponse"]["userID"];
                //接著可以對帳號做處理
                console.log('成功登入FB')
                
            } else {
                // user FB取消授權
                alert("Facebook帳號無法登入");
            }
        }, { scope: 'public_profile,email' });

    };