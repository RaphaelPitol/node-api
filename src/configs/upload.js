const patch = require("path");
const multer = require("multer");
const crypto = require("crypto");
const AppError = require("../utils/AppError");

const TMP_FOLDER = patch.resolve(__dirname, "..", "..", "tmp");

const UPLOADS_FOLDER = patch.resolve(TMP_FOLDER, "uploads");

const multerOptions = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, calback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return calback(null, fileName);
    }
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(
        new AppError("Somente arquivos de imagem podem ser carregados.", 400),
        false
      );
    }
  }

};

const MULTER = multer(multerOptions);

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
