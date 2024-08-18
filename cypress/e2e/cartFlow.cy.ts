describe("Cart Flow Check", () => {
  it("Cart successfully loads", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-test="cart-button"]').click();
  });

  it("Cart Total Price renders", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-test="cart-button"]').click();

    cy.get('[data-test="cart-totalprice"]').should("exist");
  });

  it("Adding product to cart => increase its quantity => decrease its quantity => remove it from cart", () => {
    const mockCategories = [
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ];

    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "/api/categories", {
      statusCode: 200,
      body: mockCategories,
    }).as("getCategories");

    cy.wait("@getCategories");
    cy.get('[data-test="category-electronics"]').click();

    cy.visit("http://localhost:3000/category/electronics");

    cy.get('[data-test="product-addtocart-0"]').click();

    cy.get('[data-test="cart-button"]').click();

    cy.get('[data-test="cartitem-title"]').should("exist");

    cy.get('[data-test="cartitem-increaseQty"]').should("exist").click();

    cy.get('[data-test="cartitem-qty"]').contains(2);

    cy.get('[data-test="cartitem-decreaseQty"]').should("exist").click();

    cy.get('[data-test="cartitem-qty"]').contains(1);

    cy.get('[data-test="cartitem-remove"]').should("exist").click();

    cy.get('[data-test="cartitem-title"]').should("not.exist");
  });
});
