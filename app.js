/**
 * Created by zhm & hl on 17-8-8.
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let crypto=require("crypto");
let md5=require("md5");
app.use(express.static(__dirname+'/'));
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let orm = require('orm');

orm.connect('sqlite:jobs.db', function(err, db) {
    if (err) {
        return console.error('Connection error: ' + err);
    }
        else {
        console.log('success!');
    }
});

app.use(orm.express("sqlite:jobs.db", {
    define: function (db, models, next) {
        models.user = db.define("user",{
            id:Number,
            name:String,
            email:String,
            password:String,
            company:String,
            address:String,
            field:String
        });
        models.job = db.define("job", {
            id:Number,
            position:String,
            description:String,
            tags:String,
            apply:String,
            expiry_date:String,
            category:String,
            type:String,
            country:String,
            city:String,
            release_date:String,
            is_paid:Boolean,
            user_id:Number,
        });
        next();
    }
}));

//----加载页面----
app.get('/',function (req,res) {
    res.sendFile('index.html', {root: './'});
});

// -------1 显示所有职位--------
app.get('/alljobs',function (req,res) {
    let allJobs = [];
    req.models.job.find({} ,function (err,job){
        for(let i = 0;i<job.length;i++){
            let info = {
                id:0,
                category:"",
                expiry_date:"",
                release_date:"",
                position:"",
                company:"",
                country:"",
                city:"",
                user_name:"",
                apply:""
            };
            info.id = job[i].id;
            info.expiry_date = job[i].expiry_date;
            info.release_date = job[i].release_date;
            info.position = job[i].position;
            info.country = job[i].country;
            info.city = job[i].city;
            info.category = job[i].category;
            info.apply = job[i].apply;
            req.models.user.find({id:job[i].user_id},function (err,user) {
                info.user_name = user[0].name;
                info.company = user[0].company;
                allJobs.push(info);
                if(allJobs.length === job.length){
                    res.send(allJobs);
                }
            });
        }
    })
});
// -------1 显示所有职位--------res : [{str},{str}]

// -------1.1 所有工作职位--------
app.get('/alljobs/type',function (req,res) {
    req.models.job.find({},function (err,jobs) {
        let arr=[];
        for (let i=0;i<jobs.length;i++){
            arr.push(jobs[i].type);
        }
        res.send(quchong(arr));
    })
});
function quchong(arr) {
    let newArr = [];
    arr.forEach(function(key){
        if(newArr.indexOf(key)<0){
            newArr.push(key);
        }
    });
    return newArr;
}
// -------1.2 所有工作性质--------
app.get('/alljobs/category',function (req,res) {
    req.models.job.find({},function (err,jobs) {
        let arr=[];
        for (let i=0;i<jobs.length;i++){
            arr.push(jobs[i].category)
        }
        res.send(quchong(arr));
    })
});


// --------2 根据工作职位过滤职位-------
//-------3 根据工作性质过滤职位------
//-------------project 2 and 3---------------
app.get('/alljobs/:type/:category',function (req,res) {
    let allJobs = [];
    let type = req.params.type;
    let category = req.params.category;
    if(type === 'alltype'){
        if(category === 'allcategory'){
            req.models.job.find({},function (err,job) {
                for(let i = 0;i<job.length;i++){
                    let info = {
                        id:0,
                        category:"",
                        expiry_date:"",
                        release_date:"",
                        position:"",
                        company:"",
                        country:"",
                        city:"",
                        user_name:"",
                        apply:""
                    };
                    info.id = job[i].id;
                    info.expiry_date = job[i].expiry_date;
                    info.release_date = job[i].release_date;
                    info.position = job[i].position;
                    info.country = job[i].country;
                    info.city = job[i].city;
                    info.category = job[i].category;
                    info.apply = job[i].apply;
                    req.models.user.find({id:job[i].user_id},function (err,user) {
                        info.user_name = user[0].name;
                        info.company = user[0].company;
                        allJobs.push(info);
                        if(i === job.length-1){
                            res.send(allJobs);
                        }
                    });
                }
            });
        }
        else{
            req.models.job.find({category:category},function (err,job) {
                for(let i = 0;i<job.length;i++){
                    let info = {
                        id:0,
                        category:"",
                        expiry_date:"",
                        release_date:"",
                        position:"",
                        company:"",
                        country:"",
                        city:"",
                        user_name:"",
                        apply:""
                    };
                    info.id = job[i].id;
                    info.expiry_date = job[i].expiry_date;
                    info.release_date = job[i].release_date;
                    info.position = job[i].position;
                    info.country = job[i].country;
                    info.city = job[i].city;
                    info.category = job[i].category;
                    info.apply = job[i].apply;
                    req.models.user.find({id:job[i].user_id},function (err,user) {
                        info.user_name = user[0].name;
                        info.company = user[0].company;
                        allJobs.push(info);
                        if(i === job.length-1){
                            res.send(allJobs);
                        }
                    });
                }
            });
        }
    }
    else{
        if(category === 'allcategory'){
            req.models.job.find({type:type},function (err,job) {
                for(let i = 0;i<job.length;i++){
                    let info = {
                        id:0,
                        category:"",
                        expiry_date:"",
                        release_date:"",
                        position:"",
                        company:"",
                        country:"",
                        city:"",
                        user_name:"",
                        apply:""
                    };
                    info.id = job[i].id;
                    info.expiry_date = job[i].expiry_date;
                    info.release_date = job[i].release_date;
                    info.position = job[i].position;
                    info.country = job[i].country;
                    info.city = job[i].city;
                    info.category = job[i].category;
                    info.apply = job[i].apply;
                    req.models.user.find({id:job[i].user_id},function (err,user) {
                        info.user_name = user[0].name;
                        info.company = user[0].company;
                        allJobs.push(info);
                        if(i === job.length-1){
                            res.send(allJobs);
                        }
                    });
                }
            });
        }
        else{
            req.models.job.find({type:type,category:category},function (err,job){
                for(let i = 0;i<job.length;i++){
                    let info = {
                        id:0,
                        category:"",
                        expiry_date:"",
                        release_date:"",
                        position:"",
                        company:"",
                        country:"",
                        city:"",
                        user_name:"",
                        apply:""
                    };
                    info.id = job[i].id;
                    info.expiry_date = job[i].expiry_date;
                    info.release_date = job[i].release_date;
                    info.position = job[i].position;
                    info.country = job[i].country;
                    info.city = job[i].city;
                    info.category = job[i].category;
                    info.apply = job[i].apply;
                    req.models.user.find({id:job[i].user_id},function (err,user) {
                        info.user_name = user[0].name;
                        info.company = user[0].company;
                        allJobs.push(info);
                        if(i === job.length-1){
                            res.send(allJobs);
                        }
                    });
                }
            });
        }
    }
});
//------根据工作的标题(position)、公司名字(company)和职位描述(description)进行模糊搜索------

function xunhuan(resultarr,findarr) {
    let id = [];
    resultarr.forEach(function (key) {
        id.push(key.id);
    });
    for (let i=0;i<findarr.length;i++){
        if (id.indexOf(findarr[i].id)<0){
            resultarr.push(findarr[i]);
        }
    }
}

app.get('/search/:search',function (req,res) {
    let search=req.params.search;
    let resultarr=[];
    let allJobs = [];
    req.models.job.find({position:orm.like(`%${search}%`)},function (err,nearposition) {
        xunhuan(resultarr,nearposition);
        req.models.job.find({description:orm.like(`%${search}%`)},function (err,neardescription) {
            xunhuan(resultarr,neardescription);
            req.models.job.find({category:orm.like(`%${search}%`)},function (err,nearcategory) {
                xunhuan(resultarr,nearcategory);
                req.models.job.find({type:orm.like(`%${search}%`)},function (err,neartype) {
                    xunhuan(resultarr,neartype);
                    req.models.job.find({country:orm.like(`%${search}%`)},function (err,nearcountry) {
                        xunhuan(resultarr,nearcountry);
                        req.models.job.find({city:orm.like(`%${search}%`)},function (err,nearcity) {
                            xunhuan(resultarr,nearcity);
                            req.models.job.find({company:orm.like(`%${search}%`)},function (err,nearcomp) {
                                xunhuan(resultarr,nearcomp);
                                let job = resultarr;
                                for(let i = 0;i<job.length;i++) {
                                    let info = {
                                        id: 0,
                                        category: "",
                                        expiry_date: "",
                                        release_date: "",
                                        position: "",
                                        company: "",
                                        country: "",
                                        city: "",
                                        user_name: "",
                                        apply: ""
                                    };
                                    info.id = job[i].id;
                                    info.expiry_date = job[i].expiry_date;
                                    info.release_date = job[i].release_date;
                                    info.position = job[i].position;
                                    info.country = job[i].country;
                                    info.city = job[i].city;
                                    info.category = job[i].category;
                                    info.apply = job[i].apply;
                                    req.models.user.find({id: job[i].user_id}, function (err, user) {
                                        info.user_name = user[0].name;
                                        info.company = user[0].company;
                                        allJobs.push(info);
                                        if (i === job.length - 1) {
                                            res.send(allJobs);
                                        }
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });

    });
});
//------根据工作的标题、公司名字和职位描述进行模糊搜索------

//------5 查看职位详情-----
app.get('/alljobs/:id',function (req,res) {
    let id=req.params.id;
    let info = {
        id:0,
        expiry_date:"",
        release_date:"",
        position:"",
        company:"",
        country:"",
        city:"",
        apply:0,
        email:"",
        description:"",
        tags:""
    };
    req.models.job.find({id:id} ,function (err,job) {
        info.id = job[0].id;
        info.expiry_date = job[0].expiry_date;
        info.release_date = job[0].release_date;
        info.position = job[0].position;
        info.country = job[0].country;
        info.city = job[0].city;
        info.description = job[0].description;
        info.apply = job[0].apply;
        info.tags = job[0].tags;
        req.models.user.find({id:job[0].user_id},function (err,user) {
            info.company = user[0].company;
            info.email = user[0].email;
            res.send(info);
        });
    });
});
//------5 查看职位详情-----



//功能6：发布一个职位
app.post('/user/newJob',function (req,res) {
    let newJob = req.body;
    req.models.user.find({email:req.query.email},function (err,data) {
        // console.log(data);
        newJob.user_id = data[0].id;
        req.models.job.create(newJob, function (err,result) {
            if(err){
                console.log(err);
            }
            else{
                // console.log(result);
                res.send(result);
            }
        });
    });
});
//功能6：发布一个职位

//功能7：用户查看自己创建的职位Post列表
app.get('/user/alljobs',function (req,res) {
    req.models.user.find({email:req.query.email},function (err,user) {
        let job = [];
        req.models.job.find({user_id:user[0].id},function (err,jobInfo) {
            if (err){
                console.log(err);
            }
            else{
                for(let i = 0;i<jobInfo.length;i++){
                    let info = {
                        id:0,
                        expiry_date:"",
                        release_date:"",
                        position:"",
                        company:"",
                        address:"",
                        description:""
                    };
                    info.id = jobInfo[i].id;
                    info.expiry_date = jobInfo[i].expiry_date;
                    info.release_date = jobInfo[i].release_date;
                    info.position = jobInfo[i].position;
                    info.company = user[0].company;
                    info.address = user[0].address;
                    info.description = jobInfo[i].description;
                    job.push(info);
                }
                res.send(job);
            }
        });
    });
});
//功能7：用户查看自己创建的职位Post列表

//功能8：用户查看自己创建的职位Post详情
// app.get('/user/oneJob',function (req,res) {
//     req.models.job.find({id:req.body.id},function (err,jobInfo) {
//         if (err){
//             console.log(err);
//         }
//         else {
//             res.send(jobInfo);
//         }
//     });
// });
//功能8：用户查看自己创建的职位Post详情

//功能9：修改账户信息

//显示用户信息
//接受新信息，修改数据库
app.get('/user',function (req,res) {
    req.models.user.find({email:req.query.email},function (err,user) {
        if(err){
            res.status(300);
        }
        else {
            res.send(user);
        }
    })
});
app.put('/user/newInfo',function (req,res) {
    req.models.user.find({email:req.body.email},function (err,user) {
        if(err){
            res.status(300);
        }
        else {
            // console.log(user);
            user[0].name = req.body.name;
            user[0].address = req.body.address;
            user[0].company = req.body.company;
            user[0].field = req.body.field;
            user[0].save();
            res.send(user);
        }
    })
});
//功能10：删除已发布职位
app.delete('/user/jobs/:id',function (req,res) {
    let jobid = req.params.id;
    req.models.job.find({id:jobid}).remove(function (err) {
        if (err){
            res.send('err')
        }else {
            res.send('deleted')
        }
    })
});
//------------相关推荐--------------
app.get('/relation/:id',function (req,res) {
    let resultarr = [];
    let relative = [];
    req.models.job.find({id:req.params.id},function (err,job) {
        resultarr.push(job[0]);
        req.models.job.find({type:job[0].type},function (err,nearType) {
            xunhuan(resultarr,nearType);
            for(let i = 1;i<resultarr.length;i++){
                let job = {
                    id:resultarr[i].id,
                    position:resultarr[i].position,
                    type:resultarr[i].type,
                    company:resultarr[i].company,
                    country:resultarr[i].country,
                    city:resultarr[i].city
                };
                relative.push(job);
            }
            // console.log(relative);
            res.send(relative);
        });
    });
    // res.send('dslkfnw');
});
//------------

app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: '2017983051@qq.com',
        pass: 'etcozdixiiqrejaf'
    }
});
// setup email data with unicode symbols

/*----------------Register Start---------------*/
app.post(`/user`,function (req,res) {
    let data = req.body;
    let newRecord={
        email:data.email,
        password:data.password,//md5.update(`${data.password}`).digest('hex'),
        company:'',
        address:'',
        field:'',
    };
    req.models.user.exists({email:data.email},function (err,reply) {
        if(reply===true){
            res.send("This account has been registered!");
            // console.log("This account has been registered!");
        }
        else{
            newRecord.password=crypto.createHash('md5').update(newRecord.password).digest('hex');
            req.models.user.create(newRecord,function (err,rep) {
                if (err){
                    console.log(err);
                    res.send("sign up failed!");
                }else {
                    res.send("success");
                }
            });
        }
    });
});
/*-----------------Send email Start-----------------*/
app.get(`/sendMailForRegister`,function (req,res) {
    // console.log("send mail");
    let info=req.query;
    let mailOptions = {
        from: '"Coding Girls Club"<2017983051@qq.com>', // sender address
        to: `${info.email}`, // list of receivers 1844678323@qq.com
        subject: 'Welcome to Coding Girls Club(CGC)', // Subject line
        text: `     Thank you for paying attention to CGC's jobs part. You can be a job seeker or you can be a recruiter. We provide a convenient and quick way to apply. For signing up, please attach the verification code to check your identification.
        
       Verification code:${info.verificationCode}.
        
       Any question, please contact with us.`, // plain text body
    };
    // console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else{
            // console.log("send email success!");
            res.send("success");
        }
    });
});
/*-------------Send email End-----------*/

/*-------------Register End-------------*/


/*-------------Login Start--------------*/
app.get(`/user/login`,function (req,res) {
    let info=req.query;
    req.models.user.find({email:info.email},function (err,result) {
        if(result.length===0){
            res.send("No such account!");
        }
        else {
            // console.log(info.password);
            if (crypto.createHash('md5').update(info.password).digest('hex')=== result[0].password) {
                // console.log("Login success");
                res.send("success");
            }
            else {
                // console.log("error");
                res.send("password error!");
            }
        }
    });
});
/*--------------Login End---------------*/

/*--------------Forget Password Start--------------*/
app.put(`/user/forget`,function (req,res) {
    let data=req.body;
    // console.log(data);
    req.models.user.find({email:data.email},function (err,result) {
        if(result.length===0){
            res.send("No such account!");
        }
        else {
            result[0].password =crypto.createHash('md5').update(data.password).digest('hex');
            result[0].save();
            // console.log("alter success!");
            res.status(200).send("success");
            // res.send(result);
        }
    });
});
/*---------------Forget Password End---------------*/


let server = app.listen(8081,function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("访问地址为 http://%s:%s", host, port);
});