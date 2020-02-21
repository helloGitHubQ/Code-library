package com.example.springboot02.dao;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Connection;

/**
 * 测试MybatisAPI
 */
@SpringBootTest
public class MyBatisAPITests {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Test
    public void testSqlSessionFactory(){
        System.out.println(sqlSessionFactory.getClass().getName());
    }

    @Test
    public void testSqlSession(){
        SqlSession session = sqlSessionFactory.openSession();
        System.out.println(session.getClass());
        Connection conn = session.getConnection();
        System.out.println(conn.getClass());
    }
}
