package javase.day09;

/**
 * 测试字符串拼接的效率
 * 主要为了说明通过+去拼接效率低下，要去使用工具类中的append()
 * StringBuffer>StringBuilder>String
 * StringBuffer/StringBuilder
 * 1.封装了char[]数组
 * 2.是可变的字符序列
 * 3.常用 append() 来代替字符串做字符串拼接
 * 4.super(str.length() + 16); 内置数组初始容量为16
 * 5.如果大于16的会尝试将新数组扩容为原来的2倍+2的容量.
 * @author Q
 */
public class StringAppendTest {
    public static void main(String[] args) {
        //方式1：+
        appendString1();

        //方式2：工具类中的append()
        appendString2();
    }

    private static void appendString2() {
        StringBuffer str=new StringBuffer("qazwsxedcrfvtgbyhnujmiklop");
        StringBuffer append1=new StringBuffer();
        long start=System.currentTimeMillis();
        for (int i=0;i<10000;i++){
            append1.append(str);
        }
        long end=System.currentTimeMillis();
        System.out.println(end-start+"ms");
    }

    private static void appendString1() {
        String str="qazwsxedcrfvtgbyhnujmiklop";
        String append="";
        //拼接字符串一万次
        long start=System.currentTimeMillis();
        for(int i=0;i<10000;i++){
            append=append+str;
        }
        long end=System.currentTimeMillis();
        System.out.println(end-start+"ms");
    }
}
