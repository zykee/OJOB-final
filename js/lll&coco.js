let job_type = 'alltype';
let job_category = 'allcategory';
$(document).ready(function () {
    $('#type').on('click','.btn',function () {
        job_type = $(this).attr('id');
        $('.alreadyType').html(job_type);
        flagOfType.forEach(function (key) {
            if(key.id === job_type)
            {
                changesingle(key);
                changeothers(key,flagOfType);
                if(key.flag === false){
                    job_type = 'alltype';
                }
            }
        });
        getJobFromChose(job_type,job_category);
    });
    $('#category').on('click','.btn',function () {
        job_category = $(this).attr('id');
        $('.alreadyCategory').html(job_category);
        flagOfCategory.forEach(function (key) {
            if(key.id === job_category)
            {
                changesingle(key);
                changeothers(key,flagOfCategory);
                if(key.flag === false){
                    job_category = 'allcategory';
                }
            }
        });
        getJobFromChose(job_type,job_category);
    });
});
function changesingle(key) {
    if(key.flag===false){
        key.flag = true;
    }
    else {
        key.flag = false;
    }
}
function changeothers(key,arr) {
    arr.forEach(function (targ) {
        if(targ.id !== key.id){
            targ.flag = false;
        }
    });
}
function getJobFromChose(type,category) {
    $.get(`/alljobs/${type}/${category}`,function (job) {
        $('.jobs-box').html('');
        addJob(job);
    });
}
//----------搜索----------
$(document).ready(function () {
    $('#search_btn').click(function(e){
        e.preventDefault();
        let search_val = $('#search_input').val();
        $.get(`/search/${search_val}`,function (job) {
            $('.jobs-box').html('');
            addJob(job);
        });
        $('html,body').animate({scrollTop: '680px'},200);
    });
});

//----up to top----
$(window).scroll(function(){  //只要窗口滚动,就触发下面代码
    let scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动后的高度
    if( scrollt >200 ){  //判断滚动后高度超过200px,就显示
        $("#toTop").fadeIn(400); //淡出
    }else{
        $("#toTop").stop().fadeOut(400); //如果返回或者没有超过,就淡入.必须加上stop()停止之前动画,否则会出现闪动
    }
});
$("#toTop").click(function(){ //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
    $("html,body").animate({scrollTop:"0px"},400);
});

//------------显示详情------------
$(document).on('click','.btn',function () {
    // let
});

$('#about').click(function () {

});


/*------------------------------------------------------------------------*/
/*------------------------------动态生成的职位信息点击事件---------------------------------------*/
// $(document).on('click','.btn-link',function () {
//     let jobId = $(this).attr('id');
//     // console.log(jobId);
//     jobsClick(jobId);
// });
// function jobsClick(aim) {
//     $.get(`alljobs/${aim}`,function (data) {
//         console.log(111111111111111);
//         console.log(data);
//         // let str = '';
//         for(let item of data){
//             console.log(item);
//         }
//     });
// }
/*----------------退出登录------------------*/
function exit() {
    sessionStorage.removeItem('user');
    // console.log(111);
}
$(document).on('click','#dropdown-exit',function () {
    exit();
    hideHeader();
});
// //----up to top----
// $(window).scroll(function(){  //只要窗口滚动,就触发下面代码
//     let scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动后的高度
//     if( scrollt >200 ){  //判断滚动后高度超过200px,就显示
//         $("#toTop").fadeIn(400); //淡出
//     }else{
//         $("#toTop").stop().fadeOut(400); //如果返回或者没有超过,就淡入.必须加上stop()停止之前动画,否则会出现闪动
//     }
// });
// $("#toTop").click(function(){ //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
//     $("html,body").animate({scrollTop:"0px"},400);
// });