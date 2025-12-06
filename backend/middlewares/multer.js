import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory as a buffer object

const upload = multer({ storage: storage });

export default upload;
