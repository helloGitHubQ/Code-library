package javase.day10;

import java.io.File;

/**
 * 递归求目录总大小
 * @author Q
 */
public class Test1 {
    public static void main(String[] args) {
        File files=new File("E:\\CGB1911");
        long count=method(files);
        System.out.println(count);
    }

    private static long method(File files) {
        //1.获取目录下的所有文件
        File[] listFiles = files.listFiles();
        long sum=0;
        for (File file:
             listFiles) {
            //2.判断，如果是文件的话计算大小
            if(file.isFile()){
                sum+=file.length();
            }else if(file.isDirectory()){//3.判断，如果是文件夹的话。获取文件夹下的所有目录..
                sum+=method(file);
            }
        }
        return sum;
    }
}
