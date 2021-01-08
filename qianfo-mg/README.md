# 模板使用说明

## 使用方式

```
git clone xxxxx.git

npm install

npm run dev
```



## 组件使用

#### uploadImg

上传图片

##### Attribute-属性

| 参数       | 说明                         | 类型    | 可选值 | 默认值 |
| ---------- | ---------------------------- | ------- | ------ | ------ |
| uploadShow | 必选参数，是否显示该组件     | Boolean | ——     | false  |
| maxLength  | 可选参数，上传图片的最大数量 | Number  | ——     | 1      |
|            |                              |         |        |        |

##### Events-事件

| 事件名称 | 说明                             | 回调参数                           |
| -------- | -------------------------------- | ---------------------------------- |
| close    | 点击组件右上角关闭图标触发的事件 | 无                                 |
| success  | 点击组件确定上传成功后触发的事件 | 上传的所有图片的地址，是一个数组。 |



## 模板文件目录

```
--dist    			//打包后的项目
--node_modules 		//依赖
--public 			//不会被webpack打包的文件
  --index.html 		//vue单页项目的唯一html文件
  --favicon.ico 	//网站的ico，浏览器上显示的图标
--src 				//项目的主要目录
  --api				//
  	--global_func.js//自定义全局函数
  --assets 		//静态资源
  --components    //项目页面目录
  	--common  		//全局通用组件
  	--page			//项目页面
  	--view			//项目页面通用组件
  --router  		//项目路由
  --App.vue 		//项目入口
  --main.js 		//
--.env				//全局变量配置文件
--.env.development  //开发环境下的变量配置文件
--.env.production	//生产环境下的变量配置文件
--.env.online 		//线上环境就是请求地址是线上地址


```



## 运行详情

`dev` 开发环境请求地址为线下地址

`dev-online` 开发环境请求地址为线上地址

`build` 打包默认为生产环境无代理地址。

### 地址配置

```java
.env.development文件 设置文件中的VUE_APP_URL为线下代理地址
    
.env.online文件 设置文件中的VUE_APP_URL为线上地址
```







**使用vue-manage-system后台管理系统** 



