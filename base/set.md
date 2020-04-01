### 利用set去除重复数据

set特性就不允许有重复值:smiley:

```java
//1.前提是集合类型
        List<Integer> list=new ArrayList<>();
        list.add(1);
        list.add(1);
        list.add(1);
        list.add(1);
        list.add(1);
        //遍历list集合
        Iterator<Integer> iterator1=list.iterator();
        while(iterator1.hasNext()){
            System.out.println(iterator1.next());
        }
        System.out.println("--------------------");
        Set<Integer> set=new HashSet<>();
        for (Integer i : list) {
            set.add(i);
        }
        //遍历set集合
        Iterator<Integer> iterator2=set.iterator();
        while(iterator2.hasNext()){
            System.out.println(iterator2.next());
        }
```

Yes,非常的完美！！！