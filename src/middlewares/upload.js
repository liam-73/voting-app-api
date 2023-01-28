const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'ap-southeast-1',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  const validMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/svg+xml',
  ];

  if (!validMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'));
  }

  return cb(null, true);
};

module.exports = ({ isEMR }) => {
  const bucket = isEMR ? process.env.EMR_BUCKET : process.env.BUCKET;

  return multer({
    fileFilter,
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket,
      key: (req, file, cb) => {
        const { originalname, fieldname } = file;

        const imageUrl = `https://${bucket}.s3-ap-southeast-1.amazonaws.com/${filename}`;

        req.body.avatar_url = imageUrl;

        return cb(null, filename);
      },
    }),
  });
};
