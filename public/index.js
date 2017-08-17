$('#typeBtn').click(function () {

});
//the listenner of btn about type and category;
//if click that btn, the following var will change!
let type = 'alltype';
let category = 'allcategory';
function shaixuan(type,category) {
    $.get(`/alljobs/${type}/${category}`,function (result) {
        console.log(result);
    });
}