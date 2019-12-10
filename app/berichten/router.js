const router = require("express").Router();
const controller = require("./controller");
const autoriseren = require("../../middleware/autoriseren");

router.get("/", autoriseren(["admin"]), controller.list);
router.post("/", controller.create);
router.delete("/:id", autoriseren(["admin"]), controller.delete);

module.exports = router;