/**
 * ============================================================
 *  * Dana Elizabeth Ponce Del Angel

 * File: routes/itemRoutes.js
 * Version: 1.0.1
 * ------------------------------------------------------------
 * Versioning Guidelines:
 *  - Major (1): Base CRUD routes for Items implemented.
 *  - Minor (0): No new features yet.
 *  - Revision (1): Improved route documentation.
 * ------------------------------------------------------------
 * Description:
 * Defines REST API routes for CRUD operations on Items.
 * ============================================================
 */

import express from 'express';
import {
    getAllItems,
    createItem,
    getItemById,
    updateItem,
    deleteItem
} from '../controller/itemController.js';

const router = express.Router();

/**
 * @route   GET /api/items
 * @desc    Fetch all items
 * @route   POST /api/items
 * @desc    Create a new item
 */
router.route('/')
    .get(getAllItems)
    .post(createItem);

/**
 * @route   GET /api/items/:id
 * @desc    Fetch an item by ID
 * @route   PUT /api/items/:id
 * @desc    Update an item by ID
 * @route   DELETE /api/items/:id
 * @desc    Delete an item by ID
 */
router.route('/:id')
    .get(getItemById)
    .put(updateItem)
    .delete(deleteItem);

export default router;
