const News = require("../models/news")

exports.saveAndUpdateNews=async (req,res)=>{

    const newsData=req.body.newsData

    for (const newsItem of newsData) {

        try {
      const existingNews = await News.findOne({ url: newsItem.url });

      if (existingNews) {
        // Update existing news item
        await News.updateOne({ url: newsItem.url }, newsItem);
      } else {
        // Insert new news item
        await News.create(newsItem);
      }
    } catch (error) {
      console.error('Error saving or updating news:', error);
    }


    }


    return res.status(200).json({message:"Done update"})
    

}

exports.getData=(req,res)=>{

    const excludedIds=req.body.exid;
    console.log(excludedIds)

    if (!Array.isArray(excludedIds)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array of news IDs to exclude.' });
      }
    
      News.find({ _id: { $nin: excludedIds } }).then(data=>{
        return res.status(200).json({"data":data})
      }).catch(err=>{
        return res.status(400).json({"error":err})

      })

}