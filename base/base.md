<!-- TOC -->

- [基础](#基础)
  - [把空白字符串替换](#把空白字符串替换)
  - [统计执行时间，计算效率](#统计执行时间，计算效率)
  - [释放资源写法](#释放资源写法)
  - [线程启动新方式](#线程启动新方式)

<!-- TOC -->

# 基础

#### 把空白字符串替换

```java
String line;
while((line=in.readLine())!=null){

    //把空白字符替换成""
    line=line.replaceAll("\\s+","");
    if(line.length()==0){
        continue;
    }
    list.add(line);
}
```

#### 统计执行时间，计算效率

```java
private static void f2(ExecutorService pool) throws Exception{
        long t=System.currentTimeMillis();

        //用来存放5个取餐条的数组
        Future<Integer>[] futures=new Future[5];

        //连续丢5个任务到线程池，并把5个取餐条放入数组
        for (int i=0;i<futures.length;i++){
            futures[i]=pool.submit(new Callable1(i*2000000,(i+1)*2000000));
        }

        //用5个取餐条取餐，结果累加到变量integer
        int integer=0;
        for(Future<Integer> future:futures){
            integer+=future.get();
        }

        //这钟计算效率的方法让人看起来更好写，再也不用声明两个变量去相减了
        t=System.currentTimeMillis()-t;
        System.out.println("耗时："+t+"毫秒");
        System.out.println("数量："+integer);
    }
```

#### 释放资源写法

```java
Connection connection=null;
Statement statement=null;
ResultSet resultSet=null; 

//6.释放资源
if(resultSet!=null){
    try {
        resultSet.close();
    } catch (SQLException e) {
        e.printStackTrace();
    }  finally {
        resultSet=null;
    }
}

if (statement!=null){
    try {
        statement.close();
    } catch (SQLException e) {
        e.printStackTrace();
    }  finally {
        statement=null;
    }
}

if (connection!=null){
    try {
        connection.close();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        connection=null;
    }
}
```

#### 线程启动新方式

```java
 Thread1 t1=new Thread1();
 Thread2 t2=new Thread2();

//为什么设置书签呢？我觉得这样的写法更好一点。一行直接搞定！
new Thread(t1,"T1").start();
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    e.printStackTrace();
}

new Thread(t2,"T2").start();
```

