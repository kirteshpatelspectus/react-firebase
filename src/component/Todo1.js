import {useEffect, useState} from "react"
import { Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons'
import { Box } from "@mui/system";
import { storage } from "../firebase-config";
import {getDownloadURL, listAll, ref, uploadBytesResumable,  } from "firebase/storage";
import { v4 } from "uuid";

const Todo1 = () => {
    const [uploadFile, setUploadFile] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const imageListRef = ref(storage, "images/");
    const uploadImage = () => {
        const ImageRef = ref(storage, `images/${v4()}`);
        uploadBytesResumable(ImageRef, uploadFile)
    }
    useEffect(()=> {
listAll(imageListRef).then((response)=>response.items.forEach((item)=>{
    getDownloadURL(item).then((url)=> setImageUrl(url))
}))
    },[])
   return (
    <Box>
        <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        accept="*/image"
        listType="picture"
        maxCount={1}
        onChange={(e)=>setUploadFile(e.file.originFileObj)}
      >
        <Button icon={<UploadOutlined />} >Upload</Button>
        
      </Upload>
     <Button onClick={uploadImage}>UPLOAD</Button>
     <img src={imageUrl} />
      </Box>
    );
 
}

export default Todo1;
