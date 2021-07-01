const Activity = require("../models/activity");


//CREATE ACTIVITY
exports.createActivity = (req, res) => {
  const { user, message } = req.body
  const newActivity = new Activity({ user, message})

   newActivity.save((err,result) => {
     if(err){
       res.status(400).json({
         error: err
       })
     }
     res.status(200).json({
       result
     })
   })

};


//GET ALL ACTIVITIES
exports.getAllActivities = (req, res) => {
  Activity.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select('message createdAt')
    .exec((err, activity) => {
      if (err) {
        return res.status(400).json({
          error: "No activity found"
        });
      }
      res.json(activity);
    });
};
