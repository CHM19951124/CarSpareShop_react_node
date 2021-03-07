// const mongoose = require("mongoose");
//
// const categorySchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             trim: true,
//             required: true,
//             maxlength: 32,
//             unique: true
//         }
//     },
//     { timestamps: true }
// );
//
// module.exports = mongoose.model("Category", categorySchema);
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        pid: { type: Number, required: true },
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Category", categorySchema);
