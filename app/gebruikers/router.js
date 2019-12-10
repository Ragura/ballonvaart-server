const router = require("express").Router();
const controller = require("./controller");
const autoriseren = require("../../middleware/autoriseren");

router.get("/", autoriseren(["admin"]), controller.list);
router.post("/", autoriseren(["admin"]), controller.create);
router.put("/:id", autoriseren(["admin"]), controller.update);
router.delete("/:id", autoriseren(["admin"]), controller.delete);

module.exports = router;