package javase.day10;

import java.io.UnsupportedEncodingException;

/**
 * 常见的字符编码表
 * @author Q
 */
public class Code {
    public static void main(String[] args) {
        String str="你真帅！";
        try {
            System.out.println(str.getBytes("utf-8").length);//中文三字节
            System.out.println(str.getBytes("gbk").length);//中文双字节
            System.out.println(str.getBytes("unicode").length);//双字节+2
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
}
