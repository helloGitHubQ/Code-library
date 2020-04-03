# :recycle:Code-library
代码库，收录历史代码和能够用的到的代码。重用

## :heart:基础

- 字符串拼接

- 递归求总目录大小

- 常见的字符编码表

- **如果要判断大小写，可以全部转大写或全部转小写，再去判断**

- 属性赋值之连续赋值操作

  ```java
  ItemDesc itemDesc=new ItemDesc();
  itemDesc.setItemId(101L).setItemDesc("属性测试").setCreated(new Date()).setUpdated(itemDesc.getCreated());
  
  ```

- [以空间换时间法](https://github.com/helloGitHubQ/CodeLibrary/tree/master/base/timeSpace.md)

- HttpClient

  - HttpClientClose
  - HttpClientConfig
  
- **equalsIgnoreCase()**  判断忽略大小写去判断两个字符串是否相等  `String.java`

  - 用法：String类型字符串.equalsIgnoreCase("String类型字符串") 

- **判断数组是否为空**

  - **array != null && array.length>0**

- 判断字符串是否为空 **StringUtils.isEmpty**(String类型字符串)

- 利用 `set` 去除重复数据

- 位移运算比算数运算速度快

```java
    /**
     * ArrayList扩容的核心方法。
     */
    private void grow(int minCapacity) {
        // oldCapacity为旧容量，newCapacity为新容量
        int oldCapacity = elementData.length;
        //将oldCapacity 右移一位，其效果相当于oldCapacity /2，
        //我们知道位运算的速度远远快于整除运算，整句运算式的结果就是将新容量更新为旧容量的1.5倍，
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        //然后检查新容量是否大于最小需要容量，若还是小于最小需要容量，那么就把最小需要容量当作数组的新容量，
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
       // 如果新容量大于 MAX_ARRAY_SIZE,进入(执行) `hugeCapacity()` 方法来比较 minCapacity 和 MAX_ARRAY_SIZE，
       //如果minCapacity大于最大容量，则新容量则为`Integer.MAX_VALUE`，否则，新容量大小则为 MAX_ARRAY_SIZE 即为 `Integer.MAX_VALUE - 8`。
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
```

- 二进制位操作 & 相对于 % 能够提高运算效率

## :triangular_flag_on_post:项目经历

- Maven 项目配置参数后启动

- java 项目用Tomcat启动

## :smile:java经典导出POI 



## :boxing_glove:正则

- 如果判断字符串是否使用满足某种要求，则正则是首选。

  ![](./image/upload.png)

- [身份证的正则]()

## :sparkles:线程

- 聊天室

- Callable

## :red_circle:框架

- springboot 启动类 / 测试类

- mybatis API 测试类