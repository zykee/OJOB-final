// //-----展示所有职位列表------
// function start() {
//     $.get('/alljobs',function (ans) {
//         let job = ans;
//         // console.log(job);
//        addJob(job);
//     });
// }
//
// //------向列表动态添加职位div--------
// function addJob(job) {
//     let str = '';
//     for(let j = 0; j<job.length;j++){
//         str += ` <div class="col-lg-4 col-sm-6 col-xs-12">
//                    <div class="post">
//                        <a href="post.html"></a>
//                        <h3>
//                            <a href="post.html" class="Post-title">${job[j].position}</a>
//                        </h3>
//                        <ul class="list-inline">
//                            <li>
//                                <a href="#" class="releaseUser"><i class="fa fa-user"></i> ${job[j].user_name}</a>
//                            </li>
//                            <li>
//                                <a href="#" class="tags"><i class="fa fa-tags"></i> ${job[j].category}</a>
//                            </li>
//                            <br>
//                            <li>
//                                <a href="#" class="date"><i class="	glyphicon glyphicon-time"></i> ${job[j].release_date}-${job[j].expiry_date}</a>
//                            </li>
//                        </ul>
//                        <p class="description">
//                            ${job[j].apply}
//                        </p>
//                        <p class="description">
//                            ${job[j].company}
//                        </p>
//                        <div class="text-left">
//                        <a href="../detail.html?id=${job[j].id}" class="location"><i class="glyphicon glyphicon-map-marker"></i> ${job[j].country}${job[j].city}</a >
//                    </div>
//                    <div class="text-right">
//                        <a href="../detail.html?id=${job[j].id}" class="btn btn-link" id=${job[j].id} >Continue...</a >
//                    </div>
//                    </div>
//                </div>`;
//     }
//     $('.jobs-box').append(str);
// }
//
// // $(start());
// $(document).ready(function () {
//     $('.jobs-box').empty();
//     start();
//     getTypeAndCategory();
// });
//
// //---------动态添加type and category-----------
// let flagOfType;
// let flagOfCategory;
//
// function getTypeAndCategory() {
//     // let categories = [];
//
//     $.get('/alljobs/type',function (ans) {
//         let str = ``;
//         flagOfType = [];
//         for(let i = 0;i<ans.length;i++){
//             str += `<button type="button" class="btn btn-default " id="${ans[i]}">${ans[i]}</button>`;
//             let flag =  {flag:false,id:`${ans[i]}`};
//             flagOfType.push(flag);
//         }
//         $('#type').append(str);
//     });
//     $.get('/alljobs/category',function (ans) {
//         let str = ``;
//         flagOfCategory = [];
//         for(let i = 0;i<ans.length;i++){
//             str += `<button type="button" class="btn btn-default " id="${ans[i]}">${ans[i]}</button>`;
//             let flag =  {flag:false,id:`${ans[i]}`};
//             flagOfCategory.push(flag);
//         }
//         $('#category').append(str);
//     });
//     // console.log(types);
//
//
// }
//
//
//
/*-----------------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('.jobs-box').empty();
    // start();
    getTypeAndCategory();
});

//---------动态添加type and category-----------

let flagOfType;
let flagOfCategory;
function getTypeAndCategory() {
    $.get('/alljobs/type',function (ans) {
        let str = ``;
        flagOfType = [];
        for(let i = 0;i<ans.length;i++){
            str += `<button type="button" class="btn btn-default click-color" id="${ans[i]}">${ans[i]}</button>`;
            let flag =  {flag:false,id:`${ans[i]}`};
            flagOfType.push(flag);
        }
        $('#type').append(str);
    });
    $.get('/alljobs/category',function (ans) {
        let str = ``;
        flagOfCategory = [];
        for(let i = 0;i<ans.length;i++){
            str += `<button type="button" class="btn btn-default click-color" id="${ans[i]}">${ans[i]}</button>`;
            let flag =  {flag:false,id:`${ans[i]}`};
            flagOfCategory.push(flag);
        }
        $('#category').append(str);
    });
    // console.log(types);

}

/*-----------------------分页加载数据-------------------------------*/
$(document).ready(function() {
    $.get('/alljobs',function (ans) {
        addJob(ans);
    });
});
$('#to-all-jobs').click(function () {
    $.get('/alljobs',function (ans) {
        addJob(ans);
    });
    $('.alreadyType').html('');
    $('.alreadyCategory').html('');
});

function addJob(job) {
    let mynum = job.length;
    if(mynum%9 === 0){
        mynum = parseInt(mynum/9);
    }else {
        mynum = parseInt(mynum/9)+1;
    }
    $.jqPaginator('#pagination2', {
        totalPages: mynum,
        visiblePages: 9,
        currentPage: 1,
        prev: '<li class="prev"><a href="javascript:;">Previous</a></li>',
        next: '<li class="next"><a href="javascript:;">Next</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            let str = '';
            let current = (num-1)*9;
            if(current+9 > job.length){
                for(let j = current;j<job.length;j++){
                    str += ` <div class="col-lg-4 col-sm-6 col-xs-12">
                   <div class="post">
                       <a href="post.html"></a>
                       <h3>
                           <a href="post.html" class="Post-title">${job[j].position}</a>
                       </h3>
                       <ul class="list-inline">
                           <li>
                               <a href="#" class="releaseUser"><i class="fa fa-user"></i> ${job[j].user_name}</a>
                           </li>
                           <li>
                               <a href="#" class="tags"><i class="fa fa-tags"></i> ${job[j].category}</a>
                           </li>
                           <br>
                           <li>
                               <a href="#" class="date"><i class="	glyphicon glyphicon-time"></i> ${job[j].release_date}-${job[j].expiry_date}</a>
                           </li>
                       </ul>
                       <p class="description">
                           ${job[j].apply}
                       </p>
                       <p class="description">
                           ${job[j].company}
                       </p>
                       <div class="text-left">
                       <a href="../detail.html?id=${job[j].id}" class="location"><i class="glyphicon glyphicon-map-marker"></i> ${job[j].country}${job[j].city}</a >
                   </div>
                   <div class="text-right">
                       <a href="../detail.html?id=${job[j].id}" class="btn btn-link" id=${job[j].id} >Continue...</a >
                   </div>
                   </div>
               </div>`;
                }
            }else {
                for(let j = current;j<current+9;j++){
                    str += ` <div class="col-lg-4 col-sm-6 col-xs-12">
                   <div class="post">
                       <a href="../detail.html?id=${job[j].id}"></a>
                       <h3>
                           <a href="../detail.html?id=${job[j].id}" class="Post-title">${job[j].position}</a>
                       </h3>
                       <ul class="list-inline">
                           <li>
                               <a href="../detail.html?id=${job[j].id}" class="releaseUser"><i class="fa fa-user"></i> ${job[j].user_name}</a>
                           </li>
                           <li>
                               <a href="../detail.html?id=${job[j].id}" class="tags"><i class="fa fa-tags"></i> ${job[j].category}</a>
                           </li>
                           <br>
                           <li>
                               <a href="../detail.html?id=${job[j].id}" class="date"><i class="	glyphicon glyphicon-time"></i> ${job[j].release_date}-${job[j].expiry_date}</a>
                           </li>
                       </ul>
                       <p class="description">
                           ${job[j].apply}
                       </p>
                       <p class="description">
                           ${job[j].company}
                       </p>
                       <div class="text-left">
                       <a href="../detail.html?id=${job[j].id}" class="location"><i class="glyphicon glyphicon-map-marker"></i> ${job[j].country}${job[j].city}</a >
                   </div>
                   <div class="text-right">
                       <a href="../detail.html?id=${job[j].id}" class="btn btn-link" id=${job[j].id} >Continue...</a >
                   </div>
                   </div>
               </div>`;
                }
            }

            $('.jobs-box').empty().append(str);
        }
    });
}

