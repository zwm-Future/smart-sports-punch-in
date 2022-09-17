#   																						智慧体育打卡⏱

# 一、项目介绍

****

- **用于加强学生运动管理，通过学生运动打卡情况，结合学生自身提供运动方案，提高学生身体素质与运动兴趣.**

# 二、项目模块

### 	模块分类：✅ -——> 正在运行            ⭕ -——> 未开发

- **学生端✅ **
- **教师端✅**
- **后台管理⭕ **

# 三、模块功能

**✔  ——> 已开发                    ⭕ ——> 待开发**

###  👧 🧒 学生端：

- ***课程相关***
  - **已绑定的课程 ✔**
  - **查询教师  ✔**
  - **绑定教师的课程 ✔**
- ***运动相关***
  - ***打卡***
    - **选择区域进行运动打卡✔**
  - ***运动记录***
    - **今天已运动的记录✔**
    - **所有运动项目最近一次的运动时间✔**
    - **查看所有运动记录✔**
    - **查看每个项目运动中每项记录✔**
    - **查看全部运动每项运动记录✔**
- ***消息相关***
  - ***分类***
    - **我的教师发布的消息通知✔**
    - **我的教师发布的任务通知⭕**
    - **运动数据（周报）⭕**

### 👩‍✈️ 👨‍✈️教师端：

- ***课程相关***
  - **查看已增设的课程✔**
  - **查看我已有课程该学期绑定的学生✔**
  - **新增课程✔**
  - **删除看错✔*
  - **.....**
- ***消息相关***
  - **发消息给我的课程的学生（已课程为单位）✔**
  - **......⭕**
- ***学生考勤相关***
  - **发布考勤打卡签到⭕**

### 👩‍💻👨‍💻管理端：⭕

[^**说明!!!!!!!!!!!!!!!!!!**]: **后面带有⭕的功能可看自己想法或者需求来做，如果完成了可以改改上面的说明😃**

# 四、项目结构

### **项目结构概况:**

- ***api ——> 接口文件***
- ***components ——> 通用自定义组件***
- ***custom ——> tarbar组件***
- ***img ——> 本地图片资源***
- ***miniprogram_nom ——> 组件等外库***
- ***package_teacher ——> 教师端分包***
- ***package_student ——> 学生端分包***
- ***pages ——> 主包页面***
- ***public ——> 公共资源（音频、reset.css等）***
- ***utils ——> 工具等***
- ***app.js ——> 小程序入口文件（放置共享变量）***

### 项目文件结构说明

```
SmartPunch
├─ api 🟢 ——  接口文件
│  ├─ login.js 🔵 —— 登录相关
│  ├─ notice.js 🔵 —— 通知相关
│  ├─ request.js 🔵 —— 请求接口封装
│  ├─ semester.js 🔵 —— 学期相关
│  ├─ sports.js 🔵 —— 运动相关
│  └─ user.js  🔵 —— 用户相关
├─ app.js
├─ app.json
├─ app.wxss
├─ components   🟢 ——  自定义组件
│  ├─ auth-dialog 🔵 —— 授权窗口组件
│  │  ├─ auth-dialog.js 
│  │  ├─ auth-dialog.json
│  │  ├─ auth-dialog.wxml
│  │  └─ auth-dialog.wxss
│  ├─ back-ro-top 🔵 —— 返回顶部组件
│  │  ├─ back-ro-top.js
│  │  ├─ back-ro-top.json
│  │  ├─ back-ro-top.wxml
│  │  └─ back-ro-top.wxss
│  ├─ bottom-selector 🔵 —— 底部弹出选择器组件
│  │  ├─ bottom-selector.js
│  │  ├─ bottom-selector.json
│  │  ├─ bottom-selector.wxml
│  │  └─ bottom-selector.wxss
│  ├─ continue-btn 🔵 —— 继续按钮组件
│  │  ├─ continue-btn.js
│  │  ├─ continue-btn.json
│  │  ├─ continue-btn.wxml
│  │  └─ continue-btn.wxss
│  ├─ count-circle 🔵 —— 计时圆圈组件
│  │  ├─ count-circle.js
│  │  ├─ count-circle.json
│  │  ├─ count-circle.wxml
│  │  └─ count-circle.wxss
│  ├─ end-btn 🔵 —— 结束按钮组件
│  │  ├─ end-btn.js
│  │  ├─ end-btn.json
│  │  ├─ end-btn.wxml
│  │  └─ end-btn.wxss
│  ├─ function-list 🔵 —— 主页功能栏封装组件
│  │  ├─ function-list.js
│  │  ├─ function-list.json
│  │  ├─ function-list.wxml
│  │  └─ function-list.wxss
│  ├─ gps-strength 🔵 —— GPS信号显示组件
│  │  ├─ gps-strength.js
│  │  ├─ gps-strength.json
│  │  ├─ gps-strength.wxml
│  │  └─ gps-strength.wxss
│  ├─ logout-mask 🔵 —— 退出阴影弹窗组件
│  │  ├─ logout-mask.js
│  │  ├─ logout-mask.json
│  │  ├─ logout-mask.wxml
│  │  └─ logout-mask.wxss
│  ├─ no-data 🔵 —— "空空如也"组件
│  │  ├─ no-data.js
│  │  ├─ no-data.json
│  │  ├─ no-data.wxml
│  │  └─ no-data.wxss
│  ├─ notice-img-rotation 🔵 —— 主页图片轮播组件
│  │  ├─ notice-img-rotation.js
│  │  ├─ notice-img-rotation.json
│  │  ├─ notice-img-rotation.wxml
│  │  └─ notice-img-rotation.wxss
│  ├─ notice-text-rotation  🔵 —— 主页顶部文字轮播组件
│  │  ├─ notice-text-rotation.js
│  │  ├─ notice-text-rotation.json
│  │  ├─ notice-text-rotation.wxml
│  │  └─ notice-text-rotation.wxss
│  ├─ package_student_components 🔵 —— 学生端位于主包的各个组件
│  │  ├─ accumulate-card 🟣 —— 学生端已打卡记录卡片组件 
│  │  │  ├─ accumulate-card.js
│  │  │  ├─ accumulate-card.json
│  │  │  ├─ accumulate-card.wxml
│  │  │  └─ accumulate-card.wxss
│  │  ├─ student-function-list  🟣 —— 学生端主页功能栏 
│  │  │  ├─ student-function-list.js
│  │  │  ├─ student-function-list.json
│  │  │  ├─ student-function-list.wxml
│  │  │  └─ student-function-list.wxss
│  │  ├─ student-index 🟣 —— 学生主页组件（整个页面都是一个自定义组件） 
│  │  │  ├─ student-index.js
│  │  │  ├─ student-index.json
│  │  │  ├─ student-index.wxml
│  │  │  └─ student-index.wxss
│  │  └─ today-done-card 🟣 —— 今日已打卡记录卡片组件 
│  │     ├─ today-done-card.js
│  │     ├─ today-done-card.json
│  │     ├─ today-done-card.wxml
│  │     └─ today-done-card.wxss
│  ├─ package_teacher_components 🔵 —— 教师端位于主包的各个组件
│  │  ├─ teacher-function-list 🟣 —— 教师端主页功能栏 
│  │  │  ├─ teacher-function-list.js
│  │  │  ├─ teacher-function-list.json
│  │  │  ├─ teacher-function-list.wxml
│  │  │  └─ teacher-function-list.wxss
│  │  └─ teaher-index 🟣 —— 老师主页组件（整个页面都是一个自定义组件） 
│  │     ├─ teaher-index.js
│  │     ├─ teaher-index.json
│  │     ├─ teaher-index.wxml
│  │     └─ teaher-index.wxss
│  ├─ pause-btn  🔵 —— 停止按钮组件
│  │  ├─ pause-btn.js
│  │  ├─ pause-btn.json
│  │  ├─ pause-btn.wxml
│  │  └─ pause-btn.wxss
│  ├─ puzzle-verify 🔵 —— 滑块验证码组件
│  │  ├─ capsule 🟣 —— 胶囊滑块组件 
│  │  │  ├─ capsule.js
│  │  │  ├─ capsule.json
│  │  │  ├─ capsule.wxml
│  │  │  └─ capsule.wxss
│  │  ├─ puzzle-verify.js 🟣 —— 验证码组件 
│  │  ├─ puzzle-verify.json
│  │  ├─ puzzle-verify.wxml
│  │  └─ puzzle-verify.wxss
│  ├─ record-card 🔵 —— 运动记录卡片组件
│  │  ├─ record-card.js
│  │  ├─ record-card.json
│  │  ├─ record-card.wxml
│  │  └─ record-card.wxss
│  ├─ semester-picker 🔵 —— 学期选择组件
│  │  ├─ semester-picker.js
│  │  ├─ semester-picker.json
│  │  ├─ semester-picker.wxml
│  │  └─ semester-picker.wxss
│  ├─ show-modal 🔵 —— 阴影弹窗组件
│  │  ├─ show-modal.js
│  │  ├─ show-modal.json
│  │  ├─ show-modal.wxml
│  │  └─ show-modal.wxss
│  ├─ sport-accmulate-card 🔵 —— 运动积累卡片组件
│  │  ├─ sport-accmulate-card.js
│  │  ├─ sport-accmulate-card.json
│  │  ├─ sport-accmulate-card.wxml
│  │  └─ sport-accmulate-card.wxss
│  ├─ sport-item-card 🔵 —— 运动项卡片组件
│  │  ├─ sport-item-card.js
│  │  ├─ sport-item-card.json
│  │  ├─ sport-item-card.wxml
│  │  └─ sport-item-card.wxss
│  ├─ tag-select 🔵 —— 标签选择器组件
│  │  ├─ tag-select.js
│  │  ├─ tag-select.json
│  │  ├─ tag-select.wxml
│  │  └─ tag-select.wxss
│  └─ wave_bg 🔵 —— 倒计时开始组件
│     ├─ wave_bg.js
│     ├─ wave_bg.json
│     ├─ wave_bg.wxml
│     └─ wave_bg.wxss
├─ custom-tab-bar 🟢 —— 自定义tarbar
│  ├─ index.js
│  ├─ index.json
│  ├─ index.wxml
│  └─ index.wxss 
├─ img  🟢 —— 图片资源
│  ├─ index
│  │  ├─ bindingteacher@3x.png
│  │  ├─ clocktask@3x.png
│  │  ├─ essagecenter@3x.png
│  │  ├─ logout.png
│  │  ├─ mark.png
│  │  ├─ motionrecording@3x.png
│  │  ├─ notice@3x.png
│  │  └─ welcom.png
│  ├─ map
│  │  ├─ Indicator@3x.png
│  │  ├─ location.png
│  │  └─ Marker@3x.png
│  ├─ my
│  │  └─ personalbackground@3x.png
│  ├─ record
│  │  ├─ badminton@3x.png
│  │  ├─ baseketball@3x.png
│  │  ├─ Bodybuilding@3x.png
│  │  ├─ football@3x.png
│  │  ├─ pingpong@3x.png
│  │  ├─ swimming@3x.png
│  │  ├─ tennis@3x.png
│  │  └─ volleyball@3x.png
│  └─ tarbar
│     ├─ clock@3x.png
│     ├─ home-selected@3x.png
│     ├─ home@3x.png
│     ├─ my-selected@3x.png
│     ├─ my@3x.png
│     └─ publish@3x.png
├─ package.json 🟢 —— 项目配置
├─ package_student 👦 —— 学生端分包
│  ├─ api 🟢 —— 学生端接口
│  │  ├─ map.js
│  │  ├─ message.js
│  │  └─ my-teacher.js
│  ├─ components 🟢 —— 学生端自定义组件
│  │  ├─ punch 🔵 —— 打卡组件
│  │  │  ├─ punch-map   🟣 —— 打卡主要逻辑处理组件
│  │  │  │  ├─ operation-tab 🟤 —— 运动控制组件（暂停继续） 
│  │  │  │  │  ├─ operation-tab.js
│  │  │  │  │  ├─ operation-tab.json
│  │  │  │  │  ├─ operation-tab.wxml
│  │  │  │  │  └─ operation-tab.wxss
│  │  │  │  ├─ punch-card 🟤 —— 选择区域卡片组件 
│  │  │  │  │  ├─ punch-card.js
│  │  │  │  │  ├─ punch-card.json
│  │  │  │  │  ├─ punch-card.wxml
│  │  │  │  │  └─ punch-card.wxss
│  │  │  │  ├─ punch-map.js 
│  │  │  │  ├─ punch-map.json
│  │  │  │  ├─ punch-map.wxml
│  │  │  │  ├─ punch-map.wxss
│  │  │  │  └─ top-bar 🟤 —— 打卡顶部栏组件
│  │  │  │     ├─ top-bar.js
│  │  │  │     ├─ top-bar.json
│  │  │  │     ├─ top-bar.wxml
│  │  │  │     └─ top-bar.wxss
│  │  │  ├─ punch.js
│  │  │  ├─ punch.json
│  │  │  ├─ punch.wxml
│  │  │  └─ punch.wxss
│  │  ├─ student-my 🔵 —— 学生端"我的"组件（占一整个页面）
│  │  │  ├─ student-my.js
│  │  │  ├─ student-my.json
│  │  │  ├─ student-my.wxml
│  │  │  └─ student-my.wxss
│  │  └─ teacher-item 🔵 —— 老师项组件
│  │     ├─ teacher-item.js
│  │     ├─ teacher-item.json
│  │     ├─ teacher-item.wxml
│  │     └─ teacher-item.wxss
│  ├─ message 🟢 —— 学生端消息页面
│  │  ├─ message.js
│  │  ├─ message.json
│  │  ├─ message.wxml
│  │  └─ message.wxss
│  ├─ message-list 🟢 —— 学生端消息列表页面
│  │  ├─ message-list.js
│  │  ├─ message-list.json
│  │  ├─ message-list.wxml
│  │  └─ message-list.wxss
│  ├─ message-view 🟢 —— 学生端消息详情页面
│  │  ├─ message-view.js
│  │  ├─ message-view.json
│  │  ├─ message-view.wxml
│  │  └─ message-view.wxss
│  ├─ my-teacher 🟢 —— 学生端我的教师页面
│  │  ├─ my-teacher.js
│  │  ├─ my-teacher.json
│  │  ├─ my-teacher.wxml
│  │  ├─ my-teacher.wxss
│  │  ├─ select-course 🔵 —— 选择课程页面
│  │  │  ├─ select-course.js
│  │  │  ├─ select-course.json
│  │  │  ├─ select-course.wxml
│  │  │  └─ select-course.wxss
│  │  └─ select-teacher 🔵 —— 选择老师页面
│  │     ├─ select-teacher.js
│  │     ├─ select-teacher.json
│  │     ├─ select-teacher.wxml
│  │     └─ select-teacher.wxss
│  └─ utils 🟢 —— 学生端工具类
│     ├─ pnp.js 🔵 —— 某点是否在多边形内算法
│     └─ stop.js 🔴 —— 运动时长加密算法
├─ package_teacher 👩‍✈️ —— 教师端分包
│  ├─ api 🟢 —— 教师端接口
│  │  ├─ course.js
│  │  ├─ message.js
│  │  └─ student.js
│  ├─ components 🟢 —— 教师端自定义组件
│  │  ├─ my-editor 🔵 —— 编辑组件
│  │  │  ├─ assets
│  │  │  │  ├─ iconfont.wxss
│  │  │  │  └─ print.png
│  │  │  ├─ my-editor.js
│  │  │  ├─ my-editor.json
│  │  │  ├─ my-editor.wxml
│  │  │  └─ my-editor.wxss
│  │  ├─ publish 🔵 —— 发布消息组件
│  │  │  ├─ publish.js
│  │  │  ├─ publish.json
│  │  │  ├─ publish.wxml
│  │  │  └─ publish.wxss
│  │  ├─ student-item 🔵 —— 学生项组件
│  │  │  ├─ student-item.js
│  │  │  ├─ student-item.json
│  │  │  ├─ student-item.wxml
│  │  │  └─ student-item.wxss
│  │  └─ teacher-my 🔵 —— 教师端"我的"组件（占整个页面）
│  │     ├─ teacher-my.js
│  │     ├─ teacher-my.json
│  │     ├─ teacher-my.wxml
│  │     └─ teacher-my.wxss
│  ├─ my-course 🟢 —— 教师端我的课程页面
│  │  ├─ my-course.js
│  │  ├─ my-course.json
│  │  ├─ my-course.wxml
│  │  └─ my-course.wxss
│  └─ my-student 🟢 —— 教师端我的学生页面
│     ├─ my-student.js
│     ├─ my-student.json
│     ├─ my-student.wxml
│     └─ my-student.wxss
├─ pages 🟢 —— 主包页面
│  ├─ agreement 🟢 —— 服务条款页面
│  │  ├─ agreement.js
│  │  ├─ agreement.json
│  │  ├─ agreement.wxml
│  │  └─ agreement.wxss
│  ├─ all-sport-detail 🟢 —— 所有运动详情
│  │  ├─ all-accumualte-card 🔵 —— 运动记录项卡片
│  │  │  ├─ all-accumualte-card.js
│  │  │  ├─ all-accumualte-card.json
│  │  │  ├─ all-accumualte-card.wxml
│  │  │  └─ all-accumualte-card.wxss
│  │  ├─ all-sport-detail-list 🔵 —— 运动记录项列表
│  │  │  ├─ all-sport-detail-list.js
│  │  │  ├─ all-sport-detail-list.json
│  │  │  ├─ all-sport-detail-list.wxml
│  │  │  └─ all-sport-detail-list.wxss
│  │  ├─ all-sport-detail.js
│  │  ├─ all-sport-detail.json
│  │  ├─ all-sport-detail.wxml
│  │  └─ all-sport-detail.wxss
│  ├─ contact-us 🟢 —— 加入我们页面
│  │  ├─ contact-us.js
│  │  ├─ contact-us.json
│  │  ├─ contact-us.wxml
│  │  └─ contact-us.wxss
│  ├─ help-center 🟢 —— 帮助中心页面
│  │  ├─ help-center.js
│  │  ├─ help-center.json
│  │  ├─ help-center.wxml
│  │  └─ help-center.wxss
│  ├─ index 🟢 —— 首页
│  │  ├─ index.js
│  │  ├─ index.json
│  │  ├─ index.wxml
│  │  └─ index.wxss
│  ├─ login 🟢 —— 登录页
│  │  ├─ login.js
│  │  ├─ login.json
│  │  ├─ login.wxml
│  │  └─ login.wxss
│  ├─ logs
│  │  ├─ logs.js 
│  │  ├─ logs.json
│  │  ├─ logs.wxml
│  │  └─ logs.wxss
│  ├─ main-func 🟢 —— 主要功能(打卡/发布) 页面
│  │  ├─ main-func.js
│  │  ├─ main-func.json
│  │  ├─ main-func.wxml
│  │  └─ main-func.wxss
│  ├─ my 🟢 —— "我的"页面
│  │  ├─ my.js
│  │  ├─ my.json
│  │  ├─ my.wxml
│  │  └─ my.wxss
│  ├─ notice 🟢 —— 通知页面
│  │  ├─ notice.js
│  │  ├─ notice.json
│  │  ├─ notice.wxml
│  │  └─ notice.wxss
│  ├─ notice-text-view 🟢 —— 通知详情页面
│  │  ├─ notice-text-view.js
│  │  ├─ notice-text-view.json
│  │  ├─ notice-text-view.wxml
│  │  └─ notice-text-view.wxss
│  ├─ password-modify 🟢 —— 修改密码页面
│  │  ├─ password-modify.js
│  │  ├─ password-modify.json
│  │  ├─ password-modify.wxml
│  │  └─ password-modify.wxss
│  ├─ record  🟢 —— 运动记录页面
│  │  ├─ record.js
│  │  ├─ record.json
│  │  ├─ record.wxml
│  │  └─ record.wxss
│  ├─ task
│  │  ├─ task.js
│  │  ├─ task.json
│  │  ├─ task.wxml
│  │  └─ task.wxss
│  ├─ web-view 🟢 —— 外部web页面(问卷调查)
│  │  ├─ web-view.js
│  │  ├─ web-view.json
│  │  ├─ web-view.wxml
│  │  └─ web-view.wxss
│  └─ welcome 🟢 —— 欢迎页面
│     ├─ welcome.js
│     ├─ welcome.json
│     ├─ welcome.wxml
│     └─ welcome.wxss
├─ project.config.json
├─ project.private.config.json
├─ public 🟢 —— 静态资源
│  ├─ resource
│  │  └─ style.wxss 
│  ├─ showTip.js 🔵 —— 轻提示封装
│  └─ voice 🔵 —— 音频
│     └─ count_down_zh_CN.mp3 🟣 —— 倒计时音频
├─ README.md
├─ sitemap.json
└─ utils 🟢 —— 工具
   ├─ corn.js 🔵 —— 核心
   ├─ filter.js 🔵 —— 过滤数据
   ├─ mappingData.js 🔵 —— 数据映射map结构
   ├─ notice.js 
   ├─ timeFilterData.js
   └─ util.js

```

# 五、项目启动说明

#### ***1.前提*🐖:**

- #### **由于智慧打卡小程序整合了学生端与教师端，两端均在同一小程序上运动，登录时需根据身法跳转到对应的模块，因此有个问题，如何在不下载其他分包的情况下，只下载对应身份的分包，从而提高下载速度，挺高性能❓**

#### **2.*说明📚:*** 

- #### **微信小程序的条件渲染（wx:if）有个特性------wx:if是惰性的，如果在初始渲染条件为 false 时，框架什么也不做，在条件第一次变成真的时候才开始局部渲染. **

[微信条件渲染]: https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html

#### 3.***使用🎁🎁:*** 

- #### **利用上面的特性，可以把学生端和教师端大部分不相似的功能进行分包**

- #### **在全局中声明一个变量 identityId，初始值为 0️⃣，在tabbar中放入老师端和学生端的组件，并用wx:if进行判断（这里identityId  = 1️⃣为学生，identityId = 2️⃣为教师）**

  - #### **app.js：![image-20220917222913993](C:\Users\86134\AppData\Roaming\Typora\typora-user-images\image-20220917222913993.png)**

  - #### **index页：![image-20220917222744935](C:\Users\86134\AppData\Roaming\Typora\typora-user-images\image-20220917222744935.png![image-20220917222836223](C:\Users\86134\AppData\Roaming\Typora\typora-user-images\image-20220917222836223.png)**

    #### **![image-20220917222114594](C:\Users\86134\AppData\Roaming\Typora\typora-user-images\image-20220917222114594.png)**

- #### **用户登录之后**✅**，根据接口返回的身份（存于全局和本地缓存），进入tarbar页后根据身份改变identityId的值，进行渲染，这里封装成一方法**（utils   > corn.js）

  ![image-20220917223419024](C:\Users\86134\AppData\Roaming\Typora\typora-user-images\image-20220917223419024.png)

  

  ![image-20220917223502083](C:\Users\86134\AppData\Roaming\Typora\typora-user-images\image-20220917223502083.png)

  #### 

#### 4.***优化🚀🚀🚀：***

- #### **为了提高首页加载速度🛴💨，这里把教师端和学生端的主页直接放在了主包里，虽然增加首次代码包下载量（一点点而已，问题不大），但是主页首次加载速度却提升了不少，用户体验UpUpUp🌈**

# 六、其他一些注意事项

- #### **打印信息可以统一一下，方便查看，比如在auth-dialog组件中（只是说一下🤡🤡🤡🤡）**

  ```js
  console.log(error,'auth-dialog:Component');
  ```

- #### **代码中有许多地方可以优化、提取🤡，接手的🙇‍♀️\🙇‍♂️加油🧡🧡🧡**

- #### **加油，好生仔.💗🧡💛💚💙💜🤎**