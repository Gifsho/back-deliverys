const LocationService = require('../services/LocationService');

class LocationController {
  static async updateLocation(req, res) {
    try {
      const { userId, latitude, longitude } = req.body;
      const updatedLocation = await LocationService.updateLocation(userId, latitude, longitude);
      res.json(updatedLocation);
    } catch (error) {
      console.error('Update location error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getRiderLocation(req, res) {
    try {
      const { riderId } = req.params;
      const location = await LocationService.getRiderLocation(riderId);
      if (!location) {
        return res.status(404).json({ error: 'Rider location not found' });
      }
      res.json(location);
    } catch (error) {
      console.error('Get rider location error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrderLocation(req, res) {
    try {
      const { orderId } = req.params;
      const location = await LocationService.getOrderLocation(orderId);
      if (!location) {
        return res.status(404).json({ error: 'Order location not found' });
      }
      res.json(location);
    } catch (error) {
      console.error('Get order location error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrderFullLocation(req, res) {
    try {
      const { orderId } = req.params;
      const locations = await LocationService.getOrderFullLocation(orderId);
      if (!locations) {
        return res.status(404).json({ error: 'Order locations not found' });
      }
      res.json(locations);
    } catch (error) {
      console.error('Get order full location error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrderLocations(req, res) {
    try {
      const { orderId } = req.params;
      const locations = await LocationService.getOrderLocations(orderId);
      
      if (!locations) {
        return res.status(404).json({ error: 'Order locations not found' });
      }
      
      res.json({
        pickupLocation: {
          latitude: locations.pickupLocation.latitude,
          longitude: locations.pickupLocation.longitude
        },
        deliveryLocation: {
          latitude: locations.deliveryLocation.latitude,
          longitude: locations.deliveryLocation.longitude
        }
      });
    } catch (error) {
      console.error('Get order locations error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = LocationController;