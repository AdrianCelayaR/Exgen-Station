const multer = require("multer");

exports.upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now());
        },
    }),
});
