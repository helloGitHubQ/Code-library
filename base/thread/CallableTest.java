package javase.day15;

import java.util.concurrent.*;

/**
 * Callable
 * 求 1000 万内质数(素数)的数量
 * 质数：只能被1和自身整除的数
 * 2，3，5，7....
 *
 * 思路：利用线程池创建5个线程。
 * 任务这边分5个任务，第一个任务是从1到200万，第二个任务是从200万+1到400万...
 * 然后利用线程池创建的线程进行执行。相对于一个线程去从头到尾执行快的多的多
 * @author Q
 */
public class CallableTest {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(5);
        //1.单线程执行任务
        f1(pool);

        //2.多线程执行任务
        f2(pool);

        pool.shutdown();
    }

    private static void f1(ExecutorService pool) {
        long t=System.currentTimeMillis();
        Callable1 c1=new Callable1(0,10000000);

        //把任务丢到线程池中
        Future<Integer> future = pool.submit(c1);
        Integer integer=0;
        try {
            //用取餐条取值，如果没有计算完，会暂停
            integer = future.get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

        t=System.currentTimeMillis()-t;
        System.out.println("耗时："+t+"毫秒");
        System.out.println("数量："+integer);
    }

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

    static class Callable1 implements Callable<Integer>{
        //计算范围
        int from;
        int to;

        public Callable1() {
        }

        public Callable1(int from, int to) {
            this.from = from;
            this.to = to;
        }

        @Override
        public Integer call() throws Exception {
            //计数变量
            int count=0;

            //2之前没有质数，2是一个已知的质数，不对2进行判断。所以就有了这种情况
            if (from<=2){
                from =3;
                count=1;
            }

            //[from,to)
            for (int i=from;i<to;i++){
                //抽取方法，判断是否是质数
                if (isPrime(i)){
                    count++;
                }
            }
            return count;
        }

        //数学：在2到i的开方值+1范围就能把i的整数找到
        private boolean isPrime(int i) {

            double m = Math.sqrt(i) + 1;

            //为什么小于m呢？之前还考虑四舍五入。直接小于m来的更实在
            for (int j=2;j<m;j++){
                //如果能找到被i整除的数，i就不是质数
                if(i%j==0){
                    return false;
                }
            }

            //如果判断还没有结束的话，就说明i是质数
            return true;
        }
    }
}
