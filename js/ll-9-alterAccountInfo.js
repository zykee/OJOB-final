$(document).ready(function () {
    getUserInfo();
});

function getUserInfo() {
    // let user1={email:'1844678323@qq.com',pwd:'root'};
    // sessionStorage.setItem('user',JSON.stringify(user1));
    let userobj=JSON.parse(sessionStorage.getItem('user'));
    let stremail=`<span>${userobj.email}</span>`;

    $.get(`/user?email=${userobj.email}`,function (ansarr) {
        // let strname=`<span>${ansarr[0].name}</span>`;
        // let strcom=`<span>${ansarr[0].company}</span>`;
        // let straddress=`<span>${ansarr[0].address}</span>`;
        // let strfield=`<span>${ansarr[0].field}</span>`;
        //------------展示个人信息-------------
        let strname=`<span id="strname">${ansarr[0].name}</span>`;
        let strcom=`<span id="strcom">${ansarr[0].company}</span>`;
        let straddress=`<span id="straddress">${ansarr[0].address}</span>`;
        let strfield=`<span id="strfield">${ansarr[0].field}</span>`;
        //-----------------修改信息---------------------
        let inputname=`<input style="padding: 17px;" type="text" value="${ansarr[0].name}" id="input-change-name">`;
        let inputfield=`<input style="padding: 17px;" type="text" value="${ansarr[0].field}" id="input-change-field">`;
        let inputaddress=`<input style="padding: 17px;" type="text" value="${ansarr[0].address}" id="input-change-address"/>`;
        let inputcom=`<input style="padding: 17px;" type="text" value="${ansarr[0].company}" id="input-change-company">`;

        $(".user-name").append(strname);
        $(".user-field").append(strfield);
        $(".user-address").append(straddress);
        $(".user-company").append(strcom);

        $(".change-user-name").append(inputname);
        $(".change-user-email").append(stremail);
        $(".change-user-field").append(inputfield);
        $(".change-user-address").append(inputaddress);
        $(".change-user-company").append(inputcom);

        $("#p-username").empty();
        $("#p-username").append(ansarr[0].name);

    });
    $(".user-email").append(stremail);
}

$("#update-submit").click(function () {
    let obj={};
    obj.name=$("#input-change-name").val();
    obj.field=$("#input-change-field").val();
    obj.address=$("#input-change-address").val();
    obj.company=$("#input-change-company").val();
    obj.email = JSON.parse(sessionStorage.getItem('user')).email;
    console.log(obj);
    $.ajax({
        type:'put',
        url:`/user/newInfo`,
        data:obj,
        cache:false,
        dataType:'json',
        success:function () {
            window.location.reload();
        }
    });

});