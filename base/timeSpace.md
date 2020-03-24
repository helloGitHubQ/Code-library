# 以时间换空间法

## HashMap的巧用

- 情景：用户传递过来的参数中有 params 和 type 

| **请求方法** | **GET**                                                      |
| :----------- | ------------------------------------------------------------ |
| **URL**      | http://sso.jt.com/user/check/{param}/{type}                  |
| **参数**     | 格式如：chenchen/1   其中chenchen是校验的数据   Type为类型，可选参数1 username、2 phone、3 email |
| **示例**     | http://sso.jt.com/user/check/chenchen/1                      |
| **返回值**   | {   status:   200  //200 成功，201 没有查到   msg: “OK”  //返回信息消息   data:   false  //返回数据true用户已存在，false用户不存在，可以   } |

- 需求是：校验用户名是否存在？

后台实现：

```java
String column;
if(type==1){
	column="username";
}else if(type==2){
	column="phone";
}else{
	column="email";
}
```

当然这是可以实现我们的需求的。**如果类型增加到20个呢？**还用 if- else 吗？**如果类型增加到50个呢？**还用 if- else 吗？

 但是我会这样写，这样就好很多了。:smile:

```
Map<Integer,String> map =new HashMap<Integer,String>();
map.put(1,"username");
map.put(2,"phone");
map.put(3,"email");
```

也可以叫它**海量数据判断**