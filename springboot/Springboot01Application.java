package com.example.springboot01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 使用框架的时候最重要的是遵守规则，遵守规范。
 * 项目启动时默认创建项目启动类（对于SpringBoot创建的项目，启动类只有一个），此类会使用
 * @SpringBootApplication 注解进行描述（这个注解告诉底层这个类是启动类）
 * @author SpringBoot
 */
@SpringBootApplication
public class Springboot01Application {

    public static void main(String[] args) {
        //读取Springboot01Application类上的标识（例如注解），基于标识的描述，初始化spring boot系统资源
        //1）对系统进行默认配置(由spring boot的自动配置机制设计和实现)
        //2）扫描启动类所在的包以及子包中的类，然后进行加载，配置，初始化
        SpringApplication.run(Springboot01Application.class, args);
    }

}
