import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    age: {
        type: Number
    }
})

const userModal = mongoose.model("User", UserSchema);
export default userModal;