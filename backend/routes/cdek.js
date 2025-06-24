const express = require('express');
const router = express.Router();
const cdekService = require('../cdek');

// Get cities
router.get('/cities', async (req, res) => {
    try {
        const { query } = req.query;
        const cities = await cdekService.getCities(query);
        res.json(cities);
    } catch (error) {
        console.error('Error getting cities:', error);
        res.status(500).json({ error: 'Failed to get cities' });
    }
});

// Calculate delivery
router.post('/calculate', async (req, res) => {
    try {
        const { fromCityId, toCityId, weight } = req.body;
        const result = await cdekService.calculateDelivery(fromCityId, toCityId, weight);
        res.json(result);
    } catch (error) {
        console.error('Error calculating delivery:', error);
        res.status(500).json({ error: 'Failed to calculate delivery' });
    }
});

// Create order
router.post('/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const result = await cdekService.createOrder(orderData);
        res.json(result);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

module.exports = router; 