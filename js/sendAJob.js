/*---------展示个人发布的所有职位----------*/
function showSelfJobs() {
    $.get(`/user/alljobs?email=${JSON.parse(sessionStorage.getItem('user')).email}`,function (data) {
        let str = '';
        for(let i = data.length-1;i >= 0;i--){
            str += `<div class="my-apply-jobs" id="box${data[i].id}">
                                <p>
                                    <span class="apply-start-date">发布时间: <span>${data[i].release_date}</span></span>
                                    <span class="apply-end-date">~ &nbsp;&nbsp;截止时间: <span>${data[i].expiry_date}</span></span>
                                </p>
                                <p>
                                    <span class="apply-job-name">职位名称: <span>${data[i].position}</span></span>
                                    <span class="apply-job-company">公司: <span>${data[i].company}</span></span>
                                    <span class="apply-job-address">地址: <span>${data[i].address}</span></span>
                                </p>
                                <p class="apply-job-order">${data[i].description}</p>
                                <p class="apply-job-delete" ><a href="javascript:void(0);" class="selfdelete" id=${data[i].id}>删除</a></p>
                                <p></p>
                            </div>`
        }
        showAmount(data.length);
        $('#myselfJob').html('');
        $('#myselfJob').append(str);
    })
}
/*-----------显示个数---------------*/
function showAmount(amount) {
    $('#amountOfSelf').html(amount);
}
/*-----------添加职位---------------*/
layui.use('layedit', function getFu(){
    var layedit = layui.layedit
        ,$ = layui.jquery;

    //构建一个默认的编辑器
    var index = layedit.build('LAY_demo1');
    // let descriptionFromRichwords =
    // console.log(layedit.getContent(index));
    //编辑器外部操作
    let editor = {
        getHtmlStr: function(){
            console.log(layedit.getContent(index));
            return layedit.getContent(index); //获取编辑器内容
        },
    };
    //自定义工具栏
    layedit.build('LAY_demo2', {
        tool: ['face', 'link', 'unlink', '|', 'left', 'center', 'right']
        ,height: 100
    });
    /*--------------send a job---------------*/
    $(".apply-yes").click(function () {
        let newJob = {
            position:"",
            description:"",
            tags:"",
            apply:"",
            expiry_date:"",
            category:"",
            type:"",
            country:"",
            city:"",
            release_date:"",
            is_paid:true,
            user_id:""
        };
        newJob.position = $('#position').val();
        newJob.description = editor.getHtmlStr();
        console.log(newJob.description);
        newJob.tags = $('#tags').val();
        newJob.apply = $('#apply').val();
        newJob.release_date = $('#release_date').val();
        newJob.expiry_date = $('#LAY_demorange_s').val();
        newJob.category = $('#newcategory option:selected').val();
        newJob.type = $('#newtype option:selected').val();
        newJob.country = $('#country option:selected') .val();
        newJob.city = $('#city option:selected').val();
        $.ajax({
            type:'POST',
            url:`/user/newJob?email=${JSON.parse(sessionStorage.getItem('user')).email}`,
            data:newJob,
            success:function (data) {
                console.log(data);
                showSelfJobs();
            },
            // success:showIfo(),
            error:function () {
                layer.alert("信息插入错误！");
            }
        });
    });
});





$(document).ready(function () {
    /*------------delete a job-----------*/
    $(document).on('click','.selfdelete',function () {
        let listId = $(this).attr('id');
        deleteReleasedJobs(listId);
    });
    function deleteReleasedJobs(jobid) {//what to del : job id 1
        // $(`#box${jobid}`).empty('');
        $('div').remove(`#box${jobid} div`);
        $.ajax({
            url: `/user/jobs/${jobid}`,
            type: 'DELETE',
            success: function(result) {
                console.log(result);
                showSelfJobs();
            }
        });
    }
    showSelfJobs();

    //----------exit------------
    function exit() {
        sessionStorage.removeItem('user');
        // console.log(111);
    }
    $(".exit").click(function () {
        exit();
        hideHeader();
    });

});


