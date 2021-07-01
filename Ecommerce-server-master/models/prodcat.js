const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const prodcatSchema = new mongoose.Schema(
  {
     prodcat: [{ type: ObjectId,
              ref: "Category"
            }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProdCat", prodcatSchema);
