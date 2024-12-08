const { Router } = require("express") 

const router = Router()

const { handleNewFieldCreation, handleOneFieldDisplay, handleAddingValueToField } = require("../controllers/fields")

router.post("/:chapterId/add-field",handleNewFieldCreation)
router.post("/:chapterId/field/:fieldName/add",handleAddingValueToField)
router.get("/:chapterId/fields/:fieldName",handleOneFieldDisplay)
router.post("/:chapterId/field/:fieldName/add-value",handleAddingValueToField)

module.exports = router