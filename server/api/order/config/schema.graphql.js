module.exports = {
  definition: `
    input OrderMealInput {
      meal: ID!
      quantity: Float!
    }

    input MealOrderInput {
      customer: ID!
      restaurant: ID!
      orderedAt: DateTime!
      price: Float!
      state: ENUM_ORDER_STATUS
      meals: [OrderMealInput!]!
    }

    input placeOrderInput {
      data: MealOrderInput
    }
  `,
  mutation: `
    placeOrder(input: placeOrderInput): Order!
  `,
  resolver: {
    Mutation: {
      placeOrder: {
        description: 'Place order at the restaurant',
        policies: ['plugins::users-permissions.isAuthenticated'],
        resolver: 'application::order.order.customCreate',
      },
    },
  },
};
