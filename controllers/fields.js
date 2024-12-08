const chapter = require("../models/chapter")

async function handleNewFieldCreation(req,res){
    try {
        const { chapterId } = req.params; 
        const { fieldName } = req.body; 
        const foundChapter = await chapter.findById(chapterId);
        if (!foundChapter) {
          return res.status(404).json({ message: 'Chapter not found' });
        }
        if (foundChapter.fields.has(fieldName)) {
          return res.status(400).json({ message: 'Field already exists' });
        }
        foundChapter.fields.set(fieldName, []); 
        await foundChapter.save();
        if (process.env.NODE_ENV === 'development') {
          console.log(foundChapter.fields);  // Only log in development mode
      }      
        return res.redirect(`/book/chapter/${chapterId}`)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
      }
}

async function handleOneFieldDisplay(req,res){
    try {
      const chapterId = req.params.chapterId
      const fieldName = req.params.fieldName

      console.log(fieldName)

      const foundChapter = await chapter.findById(chapterId)
      if(!foundChapter){
        return res.status(400).send("something went wrong")
      }
      const arrayOfFieldItems = foundChapter.fields.get(fieldName);
      return res.render('field',{
        fieldName: fieldName,
        fieldItems : arrayOfFieldItems,
        chapter : foundChapter
      })

      // res.status(200).send("success")
       
    } catch (error) {
      res.status(500).send("internal server error")      
    }
}


async function handleAddingValueToField(req,res){
      const { chapterId, fieldName } = req.params; 
      const { newItem } = req.body;
      if (!newItem || typeof newItem !== 'string' || newItem.trim() === '') {
        return res.status(400).json({ error: "Invalid field value" });
      }    
      try {
          const foundChapter = await chapter.findById(chapterId);
  
          if (!foundChapter) {
              return res.status(404).json({ error: 'Chapter not found' });
          }
          if (!foundChapter.fields.has(fieldName)) {
              return res.status(400).json({ error: `Field '${fieldName}' does not exist in the chapter.` });
          }
          const fieldArray = foundChapter.fields.get(fieldName);
          fieldArray.push(newItem);
          foundChapter.fields.set(fieldName, fieldArray);  
          await foundChapter.save()
          return res.redirect(`/chapter/${chapterId}/fields/${encodeURIComponent(fieldName)}`)

      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while updating the chapter.' });
      }
  }
  
  


module.exports = {handleNewFieldCreation , handleOneFieldDisplay , handleAddingValueToField}