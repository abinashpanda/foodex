'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async customCreate(ctx) {
    const { meals, ...orderData } = ctx.request.body;

    let orderItems;
    if (meals && meals.length > 0) {
      const orderItemsCreated = await Promise.all(
        meals.map((mealOrderData) =>
          strapi.services['order-item'].create(mealOrderData),
        ),
      );
      orderItems = orderItemsCreated.map((orderItem) => orderItem._id);
    }

    const entity = await strapi.services.order.create({
      ...orderData,
      orderItems,
    });
    await strapi.services['order-status'].create({
      status: 'PLACED',
      order: entity._id,
    });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
