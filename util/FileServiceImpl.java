package com.jt.service;

import com.jt.vo.ImageVO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 *
 * @author Q
 */
@Service
@PropertySource("classpath:/properties/image.properties")
public class FileServiceImpl implements FileService{

    /**
     * 定义文件目录
     */
    @Value("${image.localDir}")
    private String localDir;

    @Value("${image.urlPath}")
    private String urlPath;
    @Override
    public ImageVO upload(MultipartFile uploadFile) {
        //1.获取图片名称
        String uploadFileName=uploadFile.getOriginalFilename();
        //2.将图片名称都转化为小写字母
        uploadFileName=uploadFileName.toLowerCase();
        //3.如果判断字符串是否满足某种要求，则正则是首选
        if(!uploadFileName.matches("^.+\\.(jpg|png|gif)$")){
            return ImageVO.fail();
        }

        //4.判断是否为恶意程序 通过高度和宽度进行判断
        try {
            BufferedImage bufferedImage=ImageIO.read(uploadFile.getInputStream());
            int width=bufferedImage.getWidth();
            int height=bufferedImage.getHeight();

            if(width==0||height==0){
                //说明上传的不是图片，为恶意程序
                return ImageVO.fail();
            }

            //E:\jt\image
            //5.按照时间将目录进行划分  yyyy/MM/dd
            String dateDir=new SimpleDateFormat("yyyy/MM/dd/").format(new Date());

            //6.准备文件目录
            String localFileDir=localDir+dateDir;
            File fileDir=new File(localFileDir);
            if(!fileDir.exists()){
                //创建多级目录
                fileDir.mkdirs();
            }

            //7.uuid 动态生成文件名称  uuid.jpg
            String uuid= UUID.randomUUID().toString().replace("-","");
            int index=uploadFileName.lastIndexOf(".");
            String fileType=uploadFileName.substring(index);
            String realFileName=uuid+fileType;

            //8.实现真实的文件上传  磁盘路径 + 文件名称
            String realFilePath=localFileDir+realFileName;
            File imageFile=new File(realFilePath);
            uploadFile.transferTo(imageFile);

            //url
            String url=urlPath+dateDir+realFileName;
            return ImageVO.success(url,width,height);
        } catch (IOException e) {
            e.printStackTrace();
            //图片上传失败
            return ImageVO.fail();
        }
    }
}
