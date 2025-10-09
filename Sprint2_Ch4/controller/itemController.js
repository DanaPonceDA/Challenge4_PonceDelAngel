/**
 * ============================================================
 * Dana Elizabeth Ponce Del Angel
 * File: controller/itemController.js
 * Version: 1.3.2
 * ------------------------------------------------------------
 * Versioning Guidelines:
 *  - Major (1): Implemented core CRUD controller functions.
 *  - Minor (3): Added validation, unique ID handling, and improved responses.
 *  - Revision (2): Fixed validation and CastError handling bugs.
 * ------------------------------------------------------------
 * Description:
 * Contains controller functions for managing Item data.
 * ============================================================
 */

import Item from '../model/Item.js';

/**
 * @desc Get all items
 * @route GET /api/items
 */
export const getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find({});
        res.status(200).json({
            count: items.length,
            data: items
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc Create a new item
 * @route POST /api/items
 */
export const createItem = async (req, res, next) => {
    try {
        // Filter out empty or undefined fields
        const data = {};
        for (const key in req.body) {
            if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== "") {
                data[key] = req.body[key];
            }
        }

        const newItem = await Item.create(data);
        res.status(201).json({
            message: 'Item created successfully',
            data: newItem
        });
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
        if (err.code === 11000) return res.status(409).json({ message: 'Item ID already exists.' });
        next(err);
    }
};

/**
 * @desc Get item by ID
 * @route GET /api/items/:id
 */
export const getItemById = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ data: item });
    } catch (err) {
        if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid Item ID format' });
        next(err);
    }
};

/**
 * @desc Update item by ID
 * @route PUT /api/items/:id
 */
export const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item updated successfully', data: item });
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
        if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid Item ID format' });
        next(err);
    }
};

/**
 * @desc Delete item by ID
 * @route DELETE /api/items/:id
 */
export const deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(204).json({ message: 'Item deleted successfully', data: null });
    } catch (err) {
        if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid Item ID format' });
        next(err);
    }
};
