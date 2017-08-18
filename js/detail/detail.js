$(document).ready(function () {
    getDetails();
    getRelations();
});
function getDetails() {
    $.get(`alljobs/${window.location.href.split('?id=')[1]}`, function (data) {
        let result = data;
        let str = `<div class="job-brief-top">
                        <p class="detail-conpany"><span>${result.company}</span>招聘</p>
                        <p class="detail-jobs-description"><span class="detail-jobs-description-start">职位描述 : </span>${result.position}</p>

                        <!--发布时间-->
                        <div><span><i class="	glyphicon glyphicon-time"></i>  ${result.release_date}</span> 发布于 CODING GIRLS CLUB</div>
                        <!--招聘截止时间-->
                        <div class="deadline">截止时间: <span>${result.expiry_date}</span></div>
                    </div>
                    <div class="detail-jobs-order">${result.description}</div>
                    <div class="detail-jobs-apply"><span class="detail-jobs-tel">联系方式 : </span>${result.apply}</div>`;
        $('#detail-job-box').empty();
        $('#detail-job-box').append(str);
    });
}
function getRelations() {
    $.get(`/relation/${window.location.href.split('?id=')[1]}`, function (job) {
        let str = '';
        for (let j = 0; j < 4; j++) {
            str += `<div class="detail-jobs-small-box">
                        <div>
                            <div class="detail-jobs-small-box-left"><img src="images/code.png" alt="" class="like-img"></div>
                            <div class="detail-jobs-small-box-right">
                                <ul>
                                    <li class="like-position">${job[j].position}</li>
                                    <li class="like-type">${job[j].type}</li>
                                    <li class="like-address">${job[j].country}${job[j].city}</li>
                                    <li class="like-more"><a href="../detail.html?id=${job[j].id}" class="btn btn-link" id=${job[j].id}><span class="glyphicon glyphicon-chevron-right"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
        }
        $('#like-jobs').empty();
        $('#like-jobs').append(str);
    });
}
$('#like-jobs').on('click','.btn',function () {
    let id = $(this).attr('id');
    getDetails();
    getRelations();
});