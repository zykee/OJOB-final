// $(".form_datetime").datetimepicker({
//     minView: "month", //选择日期后，不会再跳转去选择时分秒
//     format: "yyyy-mm-dd", //选择日期后，文本框显示的日期格式
//     language: 'zh-CN', //汉化
//     autoclose:true //选择日期后自动关闭
// });

/*------富文本编辑器--------*/
// layui.use('layedit', function(){
//     var layedit = layui.layedit
//         ,$ = layui.jquery;
//
//     //构建一个默认的编辑器
//     var index = layedit.build('LAY_demo1');
//
//     //编辑器外部操作
//     var active = {
//         content: function(){
//             alert(layedit.getContent(index)); //获取编辑器内容
//         }
//         ,text: function(){
//             alert(layedit.getText(index)); //获取编辑器纯文本内容
//         }
//         ,selection: function(){
//             alert(layedit.getSelection(index));
//         }
//     };
//
//     $('.site-demo-layedit').on('click', function(){
//         var type = $(this).data('type');
//         active[type] ? active[type].call(this) : '';
//     });
//
//     //自定义工具栏
//     layedit.build('LAY_demo2', {
//         tool: ['face', 'link', 'unlink', '|', 'left', 'center', 'right']
//         ,height: 100
//     })
// });
/*-----------时间-----------------*/
layui.use('laydate', function(){
    var laydate = layui.laydate;

    var start = {
        min: laydate.now()
        ,max: '2099-06-16 23:59:59'
        ,istoday: false
        ,choose: function(datas){
            // end.min = datas; //开始日选好后，重置结束日的最小日期
            // end.start = datas //将结束日的初始值设定为开始日
        }
    };

    // var end = {
    //     min: laydate.now()
    //     ,max: '2099-06-16 23:59:59'
    //     ,istoday: false
    //     ,choose: function(datas){
    //         start.max = datas; //结束日选好后，重置开始日的最大日期
    //     }
    // };

    document.getElementById('LAY_demorange_s').onclick = function(){
        start.elem = this;
        laydate(start);
    }
    // document.getElementById('LAY_demorange_e').onclick = function(){
    //     end.elem = this
    //     laydate(end);
    // }

});

layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form()
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    // form.verify({
    //     title: function(value){
    //         if(value.length < 5){
    //             return '标题至少得5个字符啊';
    //         }
    //     }
    //     ,pass: [/(.+){6,12}$/, '密码必须6到12位']
    //     ,content: function(value){
    //         layedit.sync(editIndex);
    //     }
    // });

    //监听指定开关
    form.on('switch(switchTest)', function(data){
        layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });

    //监听提交
    form.on('submit(demo1)', function(data){
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        return false;
    });
});
/*测试用的*/
// $('#apply-confirm').click(function () {
//     alert($('#country option:selected') .val());//选中的值
// });
// 获取下拉框国家的值
// $('#country option:selected') .val();
// //获取下拉框城市的值
// $('#city option:selected') .val();
// layui.use('layedit',function () {
//     var layedit = layui.layedit;
//     layedit.build()
// })
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