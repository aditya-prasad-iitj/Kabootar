import mongoose, {Schema} from "mongoose";

const msgSchema = Schema({

    id:{
        type: Number,
        index: true,
        required: true,
        unique: true,
    },
    text:{
        type: String,
        required: true,
    },
    time:{
        type: Date,
        required: true,
        index: true,
    },
    from:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    to:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
    
}, { timestamps: true})

export const Msg = Schema.model("Msg", msgSchema);