describe("Home Page Check", () => {
  it("App successfully loads", () => {
    cy.visit("http://localhost:3000");
  });
  it("Categories header exists", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-test="cypress-header"]')
      .should("exist")
      .contains("Categories");
  });

  it("Categories are rendered", () => {
    cy.visit("http://localhost:3000");

    cy.intercept("/api/categories").as("getCategories");
    cy.wait("@getCategories");

    cy.get('[data-test="categories-list"]').should("exist");

    cy.get('[data-test="categories-list"]')
      .find('[data-test^="category-"]')
      .each(($category) => {
        cy.wrap($category).should("exist");
      });
  });

  it("Renders categories from mock API", () => {
    const mockCategories = ["electronics", "jewelery", "books", "toys"];

    cy.intercept("GET", "/api/categories", {
      statusCode: 200,
      body: mockCategories,
    }).as("getCategories");

    cy.visit("http://localhost:3000");
    cy.wait("@getCategories");

    cy.get('[data-test="categories-list"]')
      .find('[data-test^="category-"]')
      .should("have.length", mockCategories.length)
      .each((category, index) => {
        cy.wrap(category).should(
          "contain.text",
          mockCategories.toReversed()[index].toUpperCase()
        );
      });
  });

  it("Renders categories from live API", () => {
    cy.visit("http://localhost:3000");

    cy.intercept("GET", "/api/categories").as("getCategories");
    cy.wait("@getCategories");

    cy.get('[data-test="categories-list"]')
      .find('[data-test^="category-"]')
      .its("length")
      .should("be.gte", 1);

    cy.get('[data-test="categories-list"]')
      .find('[data-test^="category-"]')
      .first()
      .should("contain.text", "WOMEN'S CLOTHING");
  });

  it("Category button routes to category page", () => {
    const mockCategories = [
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ];

    cy.intercept("GET", "/api/categories", {
      statusCode: 200,
      body: mockCategories,
    }).as("getCategories");

    cy.visit("http://localhost:3000");
    cy.wait("@getCategories");

    cy.get('[data-test="category-electronics"]').click();

    cy.url().should("include", "/category/electronics");

    cy.get('[data-test="category-name"]').should(
      "contain.text",
      "electronics".toUpperCase()
    );
  });

  it("Cart button routes to cart page", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-test="cart-button"]').click();

    cy.url().should("include", "/cart");
  });
});
