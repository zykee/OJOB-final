//  let info={password:{},email:{},verificationCode:{}};//arguments user type in for register.
//  let loginfo={password:{},email:{}};//arguments user type in for login.
//  let registerInfo={email:{},verificationCode:{}};//arguments for checking email.
//  let forgetPassInfo={email:{},verificationCode:{}};//arguments using when forget password.
//
//  /*---------------------------------FORM START----------------------------------*/
//  function showRegisterForm(){
//      $('.loginBox').fadeOut('fast',function(){
//          $('.registerBox').fadeIn('fast');
//          $('.login-footer').fadeOut('fast',function(){
//              $('.register-footer').fadeIn('fast');
//          });
//          $('.modal-title').html('Register with');
//      });
//      $('.error').removeClass('alert alert-danger').html('');
//
//  }
//  function showLoginForm(){
//      $('#loginModal .registerBox').fadeOut('fast',function(){
//          $('.loginBox').fadeIn('fast');
//          $('.register-footer').fadeOut('fast',function(){
//              $('.login-footer').fadeIn('fast');
//          });
//
//          $('.modal-title').html('Login with');
//      });
//      $('.error').removeClass('alert alert-danger').html('');
//  }
//
//  function openLoginModal(){
//      showLoginForm();
//      setTimeout(function(){
//          $('#loginModal').modal('show');
//      }, 230);
//
//  }
//  function openRegisterModal(){
//      showRegisterForm();
//      setTimeout(function(){
//          $('#loginModal').modal('show');
//      }, 230);
//
//  }
// /*---------------------------------FORM END----------------------------*/
//
//  function getRandomCode() {
//       let result="";
//       for(let i=0;i<6;i++) {
//           result+= Math.floor(Math.random() * 10).toString();
//       }
//       return result;
//   }//Get a random String for checking mailbox.
//
//   function get(registerInfo) {
//       $.get('/sendMailForRegister', registerInfo, function (ans) {
//          console.log(ans);
//          // alert(ans);
//       });
//   }
//   $(document).ready(function () {
//      $("#getCode").click(function () {
//          let mailBox = $('#register-email').val();
//          registerInfo.email = mailBox;
//          let verificationCode = getRandomCode();
//          registerInfo.verificationCode = verificationCode;
//          info.verificationCode = verificationCode;
//          get(registerInfo);
//      });
//   });
//  /*------------------Register Start-----------------*/
//  $(document).ready(function () {
//       $('#btn-register').click(function (e) {
//           // alert(1);
//           e.preventDefault();
//           let mailBox=$('#register-email').val();
//           let password=$('#register-password').val();
//
//           info.password=password;
//           info.email=mailBox;
//           console.log(info);
//
//           let confirmPass=$('#password_confirmation').val();
//           let userInputVerificationCode=$('#verification_code').val();
//           console.log("register!");
//           if(confirmPass!==info.password){
//               shakeModal("Two times input passwords inconsistent!");
//           }
//           else if(userInputVerificationCode!==info.verificationCode){
//                   shakeModal("Verification code error！");
//           }
//           else{
//               $.post('/newuser',info,function (ans) {
//                   console.log(ans);
//                   if(ans!=="success"){
//                       shakeModal(ans);
//                   }
//               });
//           }
//       });
//   });
//   /*--------------------Login-----------------------*/
//  $(document).ready(function () {
//      $('#btn-login').click(function () {
//          let mailBox=$('#login-email').val();
//          let password=$('#login-password').val();
//
//          loginfo.password=password;
//          loginfo.email=mailBox;
//          // console.log(loginfo);
//          $.get('/user/login',loginfo,function (ans) {
//              console.log(ans);
//              if(ans === "success"){
//                  let log = {email:loginfo.email};
//                  sessionStorage.setItem('user',JSON.stringify(log));
//              }
//              else {
//                  shakeModal(ans);
//              }
//
//          });
//      });
//  });
// /*--------------------Forget Password-------------------*/
//
//
// /*----------------------------problems----------------------------*/
// $(document).ready(function () {
//     $('#btn-forgetPass').click(function () {
//         let mailBox = $('#forget-email').val();
//         forgetPassInfo.email = mailBox;
//         forgetPassInfo.verificationCode = getRandomCode();
//         $('#btn-send').click(function () {
//             if (forgetPassInfo.email.length === 0) {
//                 alert("Please input your mailbox");
//             }
//             else {
//                 $.post('/sendMailForForgetPass', forgetPassInfo, function (ans) {
//                     console.log(ans);
//                 });
//             }
//
//         });
//         let userInputVerificationCode = $('#verification_code').val();
//         console.log("register!");
//         if (confirmPass !== info.password) {
//             alert("Two times input passwords inconsistent!");
//         }
//         else if (userInputVerificationCode !== info.verificationCode) {
//             alert("Verification code error！");
//         }
//         else {
//             $.post('/newuser', info, function (ans) {
//                 console.log(ans);
//
//             });
//         }
//     });
// });
//
//  function shakeModal(message){
//      $('#loginModal .modal-dialog').addClass('shake');
//      $('.error').addClass('alert alert-danger').html(message);
//      $('input[type="password"]').val('');
//      setTimeout( function(){
//          $('#loginModal .modal-dialog').removeClass('shake');
//      }, 1000 );
//  }
//
// // $('#btn-login').click(function () {
// //     console.log($('#login-email').val());
// // });
// //  moudle.exports=shakeModal;
//
//
//
// // // 690862036@qq.com
// // // 1144180748@qq.com
