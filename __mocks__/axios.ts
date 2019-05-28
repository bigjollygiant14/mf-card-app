const mockCardRecs = require('../public/CreditCardRecommendations');

export default {
  get: () => Promise.resolve({ data: mockCardRecs, status: 200 })
};
