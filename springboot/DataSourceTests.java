package com.example.springboot02.com.example.pj.datasource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * 基于DataSource获取连接的一个基本过程
 * @author Q
 */
@SpringBootTest
public class DataSourceTests {

    //has a
    @Autowired
    private DataSource dataSource;//DI-->HiKarDataSource

    @Test
    public void testConnection() throws SQLException {
        System.out.println(dataSource.getConnection());
    }
}
