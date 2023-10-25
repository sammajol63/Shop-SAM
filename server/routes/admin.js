const express = require("express");
const router = express.Router();
const Controller = require("../Controller/index");
const { authentication, authorization } = require("../middleware/author");
const Multer = require("multer");
const upload = Multer({
  storage: Multer.diskStorage({}),
});

router.get("/coba", Controller.coba);
router.get("/detailProduct/:id", authentication, Controller.productDetail);
router.get(
  "/detailUser/:id",
  authentication,
  authorization,
  Controller.detailUser
);
router.get("/readCategory", authentication, Controller.readCategory);
router.post("/transaction", authentication, Controller.transaction);
router.post("/uploadImage", upload.single("file"), Controller.upload);
router.post("/login", Controller.login);
router.post("/registerUser", Controller.register);
router.put("/forgotPassword", Controller.forgotPassword);
router.put("/resetPassword", Controller.resetPassword);
router.get("/readProduct", authentication, Controller.allProduct);
router.post(
  "/createProduct",
  authentication,
  authorization,
  upload.single("file"),
  Controller.createProduct
);
router.get("/readUser", authentication, authorization, Controller.user);
router.put(
  "/updateUser/:id",
  authentication,
  authorization,
  Controller.updateUser
);
router.put(
  "/updateProduct/:id",
  authentication,
  authorization,
  Controller.updateProduct
);
router.delete(
  "/deleteUser/:id",
  authentication,
  authorization,
  Controller.destroyUser
);

router.delete(
  "/deleteProduct/:id",
  authentication,
  authorization,
  Controller.destroyProduct
);

module.exports = router;
