# barrage-vue

## 项目页面截图
![image](https://github.com/wanyushu/barrage-vue/assets/55966772/41375028-644e-478c-8fe9-ec3e58cfa02e)

# 一. 项目部署
  ## 1.执行命令
   npm install
  ## 2.运行项目
   npm run dev
  ## 3.部署后端获取wss链接地址服务
   双击 src目录下的
   ![06224400e16bfac311930c83c9a28a8.png](https://cdn.nlark.com/yuque/0/2023/png/35385809/1699604342717-0a1f6012-2dc1-4cf7-9686-bac8c9fbda34.png#averageHue=%233d4249&clientId=u887a6370-dc9a-4&from=ui&id=u8208da98&originHeight=252&originWidth=523&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9042&status=done&style=none&taskId=u988e500b-3ba9-49c2-9c7e-bff9de4ae96&title=)

##   4.有端口特殊需求可以到config目录下面变更端口配置
![3307d5bdca3fcc6964c0f6d992f7810.png](https://cdn.nlark.com/yuque/0/2023/png/35385809/1699604579390-7f78c6d2-7c6c-4ecb-8b21-f14d439cfc22.png#averageHue=%2373845a&clientId=u887a6370-dc9a-4&from=ui&id=u9dd0da95&originHeight=308&originWidth=1044&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25962&status=done&style=none&taskId=u8cf8fb89-5a2f-44a5-8301-f96e04aec44&title=)

# 2. 项目说明

 本项目通过抖音平台的wss链接进行逆向而来！
协议解析思路如下：
### 1.通过web端进行逆向得到proto文件，文件大致内容如下
![779bd351f2b91c710f9129d85cc9fa8.png](https://cdn.nlark.com/yuque/0/2023/png/35385809/1699605155158-7d4ee589-b16a-4ed2-a7b8-402654d79323.png#averageHue=%232c2c2b&clientId=u887a6370-dc9a-4&from=ui&height=433&id=u0434d597&originHeight=695&originWidth=911&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77443&status=done&style=none&taskId=uc2d8ba62-bb5f-4b54-a545-f33f93e0379&title=&width=568)
### 2.根据需要的数据编写proto文件
### 3.通过protoc执行工具编译出js文件
### 4.解析protobuf数据并展示页面

# 3. 相关链接

## github项目开源链接: [https://github.com/wanyushu](https://github.com/wanyushu)
## gitee 项目开源地址链接：[https://gitee.com/wanyushu](https://github.com/wanyushu)

# 4. 关于我们
   1.了解更多相关应用，请移步: http://www.softworld.vip，关注我们，了解最新更新动态！
   扫码关注公众号 "代码江湖"

![qrcode_for_gh_15b6b711cbca_258.jpg](https://cdn.nlark.com/yuque/0/2023/jpeg/35385809/1699605638736-8e429634-4a2b-47c4-99ca-f19acc9382be.jpeg#averageHue=%23a1a1a1&clientId=u887a6370-dc9a-4&from=paste&height=149&id=u0c131012&originHeight=258&originWidth=258&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27449&status=done&style=shadow&taskId=u317baebc-cd55-4dc9-a3b4-c3300ec3d89&title=&width=149)

# 5.注意事项
#本项目仅用学习参考用，切勿商用！



