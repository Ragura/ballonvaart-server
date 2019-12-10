const router = require("express").Router();
const controller = require("./controller");
const autoriseren = require("../../middleware/autoriseren");

router.get("/", autoriseren(["admin"]), controller.list);
router.get("/geboektedata", autoriseren(), controller.geboekteData);
router.post("/", autoriseren(["admin"]), controller.create);
router.post("/boeken", autoriseren(), controller.boeken);
router.put("/:id", autoriseren(["admin"]), controller.update);
router.delete("/:id", autoriseren(["admin"]), controller.delete);

module.exports = router;