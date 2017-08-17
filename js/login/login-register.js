let info={password:{},email:{},verificationCode:{}};//arguments user type in for register.
let loginfo={password:{},email:{}};//arguments user type in for login.
let registerInfo={email:{},verificationCode:{}};//arguments for checking email.
// let forgetPassInfo={email:{},verificationCode:{}};//arguments using when forget password.

/*---------------------------------FORM START----------------------------------*/
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.forgetBox').fadeOut('fast');
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register ');
    });
    $('.error').removeClass('alert alert-danger').html('');

}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.forgetBox').fadeOut('fast');
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

function showForgetForm() {
    $('.forgetBox').fadeIn('normal');
    $('.registerBox').fadeOut('fast');
    $('.loginBox').fadeOut('fast');
    $('.modal-title').html('Find Password');
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}
/*---------------------------------FORM END----------------------------*/

function getRandomCode() {
    let result="";
    for(let i=0;i<6;i++) {
        result+= Math.floor(Math.random() * 10).toString();
    }
    return result;
}//Get a random String for checking mailbox.

function get(registerInfo) {
    console.log("send1");
    $.get(`/sendMailForRegister`, registerInfo, function (ans) {
        console.log(ans);
        // alert(ans);
    });
}
$(document).ready(function () {
    $("#getCode").click(function () {
        let mailBox = $('#register-email').val();
        let reg=/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
        if(!reg.test(mailBox)){
            shakeModal("Mailbox Error!");
        }
        registerInfo.email = mailBox;
        let verificationCode = getRandomCode();
        registerInfo.verificationCode = verificationCode;
        info.verificationCode = verificationCode;
        get(registerInfo);
    });
});
/*------------------Register Start-----------------*/
$(document).ready(function () {
    $('#btn-register').click(function (e) {
        // alert(1);
        e.preventDefault();
        let mailBox=$('#register-email').val();
        let password=$('#register-password').val();
        let reg=/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
        if(!reg.test(mailBox)){
            shakeModal("Mailbox Error!");
        }
        info.password=password;
        info.email=mailBox;

        let confirmPass=$('#password_confirmation').val();
        let userInputVerificationCode=$('#verification_code').val();
        console.log(confirmPass);//undefiend
        console.log(info.password);

        if(confirmPass!==info.password){
            shakeModal("Two times input passwords inconsistent!");
        }
        else if(userInputVerificationCode!==info.verificationCode){
            shakeModal("Verification code error！");
        }
        else{
            $.post(`/user`,info,function (ans) {
                console.log(ans);
                if(ans!=="success"){
                    shakeModal(ans);
                }else {
                    sessionStorage.setItem('user',JSON.stringify({email:info.email}));
                    hideHeader();
                }
            });
        }
    });
});
/*--------------------Login-----------------------*/
$(document).ready(function () {
    $('#btn-login').click(function () {
        let mailBox=$('#login-email').val();
        let reg=/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
        if(!reg.test(mailBox)){
            shakeModal("Mailbox Error!");
        }
        let password=$('#login-password').val();
        loginfo.password=password;
        loginfo.email=mailBox;
        $.get(`/user/login`,loginfo,function (ans) {
            console.log("ans");
            console.log(ans);
            if(ans!=="success"){
                shakeModal(ans);
            }
            else{
                let log = {email:loginfo.email};
                sessionStorage.setItem('user',JSON.stringify(log));
                hideHeader();
            }
        });
    });
});
/*--------------------hide header------------------------*/
function hideHeader() {
    if(sessionStorage.getItem('user')===null){
        $("#user-img").show();
        $("#logined-user-email").show();
        $(".user-id").hide();
    }
    else {
        let str = `<li class="user-id">             
	                   <a href="javascript:void(0)" data-toggle="dropdown">${JSON.parse(sessionStorage.getItem('user')).email}</a>
	                   <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
		                <li role="presentation">
			                <a id="dropdown-acount" role="menuitem" tabindex="-1" href="self.html">ACOUNT</a>
		                </li>
		                <li role="presentation">
			                <a id="dropdown-exit" role="menuitem" tabindex="-1" href="#">EXIT</a>
		                </li>
		               </ul>          
               </li>`;
        $("#loginModal").modal('hide');
        $(".modal-modal-dialog").addClass("close-hidden");
        $("#user-img").hide();
        $("#logined-user-email").hide();
        $(".whenLogIn").append(str);
    }
}
$(function () {
    hideHeader();
});
/*--------------------Forget Password Start---------------------*/
$(document).ready(function () {
    $('#forgetPassword').click(function () {
        $("#forget_getCode").click(function () {
            let mailBox = $('#forget-email').val();
            let reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
            if (!reg.test(mailBox)) {
                shakeModal("Mailbox Error!");
            }
            registerInfo.email = mailBox;
            let verificationCode = getRandomCode();
            registerInfo.verificationCode = verificationCode;
            info.verificationCode = verificationCode;
            get(registerInfo);
        });
        $('#forget_btn-register').click(function (e) {
            e.preventDefault();
            let mailBox = $('#forget-email').val();
            let password = $('#forget-password').val();
            let reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
            if (!reg.test(mailBox)) {
                shakeModal("Mailbox Error!");
            }
            info.password = password;
            info.email = mailBox;

            let confirmPass = $('#forget_password_confirmation').val();
            let userInputVerificationCode = $('#forget_verification_code').val();

            if (confirmPass !== info.password) {
                shakeModal("Two times input passwords inconsistent!");
            }
            else if (userInputVerificationCode !== info.verificationCode) {
                shakeModal("Verification code error！");
            }
            else {
                $.ajax({
                    type: 'put',
                    url: `user/forget`,
                    data: info,
                    // dataType: 'json'
                })
                    .done(function () {
                        // console.log("client success");
                        showLoginForm();
                    })
                    .fail(function (ans) {
                        console.log(ans);
                        console.log("client fail");

                    })
                    .always(function () {
                        console.log("client");

                    });
            }
        });

    });
});
function shakeModal(message){
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').html(message);
    $('input[type="password"]').val('');
    setTimeout( function(){
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );
}


// // 690862036@qq.com
// // 1144180748@qq.com