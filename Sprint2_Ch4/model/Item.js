/**
 * ============================================================
 *  * Dana Elizabeth Ponce Del Angel

 * File: model/Item.js
 * Version: 1.2.0
 * ------------------------------------------------------------
 * Versioning Guidelines:
 *  - Major (1): Created Item schema and subdocuments.
 *  - Minor (2): Added timestamps and refined validation rules.
 *  - Revision (0): No bug fixes yet.
 * ------------------------------------------------------------
 * Description:
 * Defines the MongoDB schema for "Item" (restaurants collection)
 * using Mongoose, including embedded subdocuments for grades,
 * comments, and address.
 * ============================================================
 */

import mongoose from "mongoose";

// Subdocument for restaurant grades
const GradeSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    score: { type: Number, required: true }
}, { _id: false });

// Subdocument for user comments
const CommentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    comment: { type: String, required: true }
}, { _id: true });

// Subdocument for address information
const AddressSchema = new mongoose.Schema({
    building: String,
    coord: { type: [Number], default: [0, 0] }, // [longitude, latitude]
    street: String,
    zipcode: String
}, { _id: false });

// Main schema for items (restaurants)
const ItemSchema = new mongoose.Schema({
    restaurant_id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    borough: String,
    cuisine: String,
    address: AddressSchema,
    grades: [GradeSchema],
    comments: [CommentSchema]
}, {
    collection: 'Restaurantes',
    timestamps: true // Adds createdAt and updatedAt
});

export default mongoose.model('Item', ItemSchema);
