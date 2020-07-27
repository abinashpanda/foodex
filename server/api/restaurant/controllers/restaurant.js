const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.restaurant.search(ctx.query);
    } else {
      entities = await strapi.services.restaurant.find(ctx.query);
    }

    if (ctx.state.user) {
      const blockedRestaurants = await strapi.services['blocked-user'].find({
        user: { _id: ctx.state.user._id },
      });
      if (blockedRestaurants.length > 0) {
        const blockedRestaurantIds = blockedRestaurants.map((restaurant) =>
          restaurant.restaurant._id.toString(),
        );
        entities = entities.filter(
          (restaurant) =>
            // filter all the restaurants that are present in the blocked
            // restaurants lists
            !blockedRestaurantIds.includes(restaurant._id.toString()),
        );
      }
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.restaurant }),
    );
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;

    if (ctx.state.user) {
      const blockedRestaurants = await strapi.services['blocked-user'].find({
        user: { _id: ctx.state.user._id },
      });
      if (blockedRestaurants.length > 0) {
        const blockedRestaurantIds = blockedRestaurants.map((restaurant) =>
          restaurant.restaurant._id.toString(),
        );
        if (blockedRestaurantIds.includes(id)) {
          return ctx.unauthorized('You have been blocked by this restaurant');
        }
      }
    }

    const entity = await strapi.services.restaurant.findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },
};
