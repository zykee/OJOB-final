### JOBS规范文档：

一 、 导航栏信息

1. 首页 点击ALL JOBS显示所有的工作，其 id :  allJobs
2. 注册按钮id  = log-in
3. 登录按钮id  = register

逻辑：

1. 点击ALL JOBS 之后不跳转，只在此页面下滑展示所有工作；
2. 用户在注册或登录之后，首页导航栏的的 login 和sign up 消失，替换成用户名，点击和跳转到个人中心（ 新的HTML页面 ）
3. 游客和未注册、未登录用户进入首页时，首页导航栏展示login ，sign up 



二、Jobs展示

1. 职位展示块所包含的内容：

   职位名称 ： class =  Post-title；

   职位发布者 ：class  = releaseUser；

   职位标签 ：class = tags；

   发布时间和截止日期 ：class = date；

   职位的描述：class = description；

   职位地点 ：class = location；

   ​

   逻辑：首页加载或者点击ALL JOBS 或者点击属性和职位进行搜索时，在 class =  jobs-box 的div中插入一个职位的简略信息，插入格式如下：

   ```
   <div class="row jobs-box">
               <div class="col-lg-4 col-sm-6 col-xs-12">
                   <div class="post">
                       <a href="post.html"></a>
                       <h3>
                           <a href="post.html" class="Post-title">Post title</a>
                       </h3>
                       <ul class="list-inline">
                           <li>
                               <a href="#" class="releaseUser"><i class="fa fa-user"></i> Admin</a>
                           </li>
                           <li>
                               <a href="#" class="tags"><i class="fa fa-tags"></i> AngularJs</a>
                           </li>
                           <li>
                               <a href="#" class="date"><i class="	glyphicon glyphicon-time"></i> 2017.8.8-2017.9.8</a>
                           </li>
                       </ul>
                       <p class="description">
                           Vulputate sed risus dis feugiat vel gravida, class enim Mus aliquam ut donec sodales bibendum rutrum dis sit rutrum id eleifend. Dapibus potenti.
                       </p>
                       <div class="text-left">
                           <a href="post.html" class="location"><i class="glyphicon glyphicon-map-marker"></i> 湖北武汉</a>
                       </div>
                       <div class="text-right">
                           <a href="post.html" class="btn btn-link">Continue...</a>
                       </div>
                   </div>
               </div>
           </div>
   ```

   ​

   ​

   三 、用户注册登录

   1. 使用其他方式登录暂时放着不用管

   2. 注册需要填写三个内容：邮箱，密码，确认密码，他们的id分别为：

      ```
      id="register-email"
      id="register-password"
      id="password_confirmation"
      ```

      确定注册按钮：id = btn-register

   3. 登录需要填写两个内容：邮箱和密码 ，他们的id 分别为：

      ```
      id="login-email"
      id="login-password"
      ```

      确定登录按钮：id = btn-login

五、登录的用户点击首页显示的个人邮箱，跳转到个人中心页面，个人中心页面包含两部分内容：1.个人已发布的职位；2.使用富文本编辑器编辑职位并发布。

