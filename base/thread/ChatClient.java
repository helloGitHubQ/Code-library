package javase.day17;

import java.io.*;
import java.net.Socket;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

/**
 * 聊天室客户端
 * 客户端有三个线程：接收线程，打印线程，输入线程
 *
 * 1.客户端启动时，需要输入昵称才能进行下一步。
 * 2.输入的内容在服务端能显示并且知道哪个人ip发的什么内容（利于内容检测）
 * 2.回车输入内容，再回车就发送内容。之前没有显示的内容都会显示
 * 3.超时时间
 * @author Q
 */
public class ChatClient {
    static BufferedReader in;
    static PrintWriter out;
    static String name;
    static Queue<String> queue=new LinkedList<>();
    //输入标志；信号灯
    static boolean inputFlag=false;

    public static void main(String[] args) throws IOException {
        Socket s=new Socket("127.0.0.1",8000);

        in = new BufferedReader(new InputStreamReader(s.getInputStream(),"UTF-8"));
        out = new PrintWriter(new OutputStreamWriter(s.getOutputStream(),"UTF-8"));

        System.out.println("请输入您的昵称：");
        name=new Scanner(System.in).next();
        out.println(name);
        out.flush();

        //开始聊天
        //接收线程;匿名内部类;生产者
        Thread t1=new Thread(){
            @Override
            public void run() {
                try {
                    receive();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        };
        t1.start();

        //打印线程；消费者  生产者-消费者模型  等待和通知
        Thread t3=new Thread(){
            @Override
            public void run() {
                print();
            }
        };
        t3.setDaemon(true);
        t3.start();

        //输入线程;匿名内部类
        Thread t2=new Thread(){

            @Override
            public void run() {
                input();
            }
        };
        t2.setDaemon(true);
        t2.start();
    }

    private static void print() {
        while(true){
            synchronized(queue){
                //队列为空的时候的等待或输入信号灯亮的时候等待
                while(queue.isEmpty() || inputFlag){
                    try {
                        queue.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                String msg=queue.poll();
                System.out.println(msg);
            }
        }
    }

    /**
     * 怎么自动生成匿名内部类中未知的方法
     * 为什么这么写？让其更有逻辑,美观
     */
    private static void input(){
        System.out.println("按回车输入聊天内容：");

        while(true){
            new Scanner(System.in).nextLine();
            //开始输入，打开信号灯
            inputFlag=true;

            System.out.println("请输入聊天内容:");
            String msg=new Scanner(System.in).nextLine();
            out.println(msg);
            out.flush();

            //输入完成，关闭信号灯
            inputFlag=false;
            //通知打印线程，已经输入完成可以打印
            synchronized(queue){
                queue.notifyAll();
            }
        }
    }

    private static void receive() throws IOException {
        try{
            String line;
            while((line=in.readLine())!=null){
//                System.out.println(line);

                //收到的数据，加入队列
                synchronized(queue){
                    queue.offer(line);
                    queue.notifyAll();
                }
            }
        }catch(Exception e){

        }

        System.out.println("已经与服务器断开连接");
    }
}


