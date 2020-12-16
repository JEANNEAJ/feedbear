import multer from "multer";

const router = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_, file, next) => {
    const allowed = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const isAllowed = allowed.includes(file.mimetype);

    if (isAllowed) {
      return next(null, true);
    } else {
      next(null, false);
      return next(
        new Error("Only JPG, JPEG, PNG, and GIF images are permitted.")
      );
    }
  },
});

export default router;
