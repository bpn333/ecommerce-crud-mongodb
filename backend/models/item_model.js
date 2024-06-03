import mongoose from "mongoose";

const item_schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        sold: {
            type: Boolean,
            default: false,
            required: false
        },
        date_of_sold: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true
    }
)
export const Item = mongoose.model('Item',item_schema);