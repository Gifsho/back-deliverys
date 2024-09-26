const LocationService = require('../services/LocationService');


class LocationController {
  static async updateLocation(req, res) {
    try {
      const { userId, latitude, longitude } = req.body;
      const updatedLocation = await LocationService.updateLocation(userId, latitude, longitude);
      res.json(updatedLocation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRiderLocation(req, res) {
    try {
        console.log("Received request for rider ID:", req.params.riderId);
        const { riderId } = req.params;
        const location = await LocationService.getRiderLocation(riderId);
        console.log("Rider location:", location);
        res.json(location);
    } catch (error) {
        console.error("Error fetching rider location:", error);
        res.status(500).json({ error: error.message });
    }
}


  static async getOrderLocation(req, res) {
    try {
      const { orderId } = req.params;
      const location = await LocationService.getOrderLocation(orderId);
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = LocationController;