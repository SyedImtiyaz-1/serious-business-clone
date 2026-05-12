const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dws6jfg3y',
  api_key: '234583419264838',
  api_secret: '1mS2_NdS9X6y2SGEJnEspPxyC-I',
});

cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 
  { folder: 'test' }, 
  (error, result) => {
    if (error) console.error("ERROR:", error);
    else console.log("SUCCESS:", result.secure_url);
  }
);
