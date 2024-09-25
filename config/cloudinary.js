const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drvneziac',
  api_key: '258331568541728',
  api_secret: 'DK_XBRg9JbbXX5i4nBOe-rzWi3E'
});

module.exports = cloudinary;