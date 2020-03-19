package com.jt.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * JSON和对象之间互转的工具类
 * @author Q
 */
public class ObjectMapperUtil {

    public static final ObjectMapper MAPPER=new ObjectMapper();

    /**
     * Java对象转JSON
     * @return json串(String类型的)
     */
    public static String toJSON(Object object){
        try {
            String json = MAPPER.writeValueAsString(object);
            return json;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    /**
     * JSON转Java对象
     * 用户传递什么样的类型，返回什么样的对象
     * @param json json串
     * @param targetClass  需要转成什么样的对象
     * @return Java对象
     */
    public static <T> T toObject(String json, Class<T> targetClass){
        try {
            return MAPPER.readValue(json,targetClass);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
