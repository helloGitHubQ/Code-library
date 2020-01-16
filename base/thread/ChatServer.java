package javase.day17;

import java.io.*;
import java.net.*;
import java.util.ArrayList;

/**
 * 聊天室服务器
 * 有两个线程：一个叫服务线程，另一个叫通信线程。
 * 客户端发一个请求，服务端的服务线程接收请求；之后分配通信线程进行通信。
 * 很像我们平时去拨打移动客服的样子。
 *
 * @author Q
 */
public class ChatServer {
    //用来收集通信线程对象
    static ArrayList<ComThread> arrayList=new ArrayList<>();

    //服务线程
    static class ServerThread extends Thread{
        @Override
        public void run() {
            try {
                System.out.println("正在启动服务...");
                ServerSocket ss=new ServerSocket(8000);
                System.out.println("服务已经在端口8000上启动");
                while(true){
                    Socket s = ss.accept();
                    ComThread c = new ComThread(s);
                    c.start();
                }
            } catch (IOException e) {
                System.out.println("端口被占用或服务异常停止");
                e.printStackTrace();
            }
        }
    }

    //通信线程
    static class ComThread extends Thread{
        private Socket s;
        BufferedReader in;
        PrintWriter out;
        private String name;
        private String ip;

        public ComThread(Socket s) {
            this.s=s;
        }

        public void send(String msg){
            out.println(msg);
            out.flush();
        }

        public void sendAll(String msg){
            //为什么要对arrayList加锁？因为都是访问同一个集合
            synchronized(arrayList){
                for (ComThread c :
                        arrayList) {
                    c.send(msg);
                }
            }
        }

        /**
         * 1.UTF-8
         * 2.换行
         */
        @Override
        public void run() {
            try {
                //获取客户端的ip地址; InetSocketAddress是SocketAddress(抽象类)的子类
                this.ip=((InetSocketAddress)s.getRemoteSocketAddress()).getHostString();

                //IO经典组合
                this.in=new BufferedReader(new InputStreamReader(s.getInputStream(),"UTF-8"));
                this.out=new PrintWriter(new OutputStreamWriter(s.getOutputStream(),"UTF-8"));

                //1.接收昵称
                this.name=in.readLine();
                //2.发送欢迎消息
                send(name+",欢迎你进入Q的聊天室");

                //设置超时时间
                s.setSoTimeout(5000);

                //3.当前通信线程对象，加入list
                synchronized(arrayList){
                    arrayList.add(this);
                    //4.群发上线消息
                    sendAll(name+",进入了聊天室,在线："+arrayList.size());
                }

                //开始聊天
                String line;

                //超时的计数变量
                int count=0;
                while(true){
                    try{
                        line=in.readLine();

                        //如果规定时间内说话了就把计数的变量归零
                        count=0;
                    }catch(SocketTimeoutException e){
                        count++;

                        if(count==4){
                            send("*** 您已被踢出聊天室 ***");
                            //断开连接
                            s.close();
                            break;
                        }

                        send("*** 请积极参与聊天("+count+"/3) ***");
                        continue;
                    }

                    if (line==null){
                        break;
                    }

                    sendAll(name+"说:"+line);
                    System.out.println(ip+"-"+name+"说:"+line);
                }

                //null
            } catch (IOException e) {
                //异常
                e.printStackTrace();
            }

            //移除当前线程通信对象
            synchronized(arrayList){
                arrayList.remove(this);
                //群发离线消息
                // 对size也进行加锁。想要精确的人数。但是一般用户都不会纠结这点的
                sendAll(name+"离开了聊天室，在线："+arrayList.size());
            }

        }
    }

    public static void main(String[] args) {
        ServerThread s=new ServerThread();
        s.start();
    }
}
