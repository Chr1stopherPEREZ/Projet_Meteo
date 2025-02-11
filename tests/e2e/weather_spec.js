describe("Test de l'affichage de la météo", () => {
  it("Vérifie que la météo est bien affichée", () => {
    cy.visit("http://localhost:3000");
    cy.contains("°C").should("be.visible");
  });

  it("Gère les erreurs API", () => {
    cy.intercept("GET", "**/weather*", { statusCode: 500 });
    cy.visit("http://localhost:3000");
    cy.contains("Impossible de récupérer les données météo").should(
      "be.visible"
    );
  });
});

/* Weather_spec.js */
