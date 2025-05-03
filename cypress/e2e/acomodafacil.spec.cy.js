// Teste automatizado básico para funcionalidades principais do Acomodafacil

describe('Checklist Funcionalidades Básicas', () => {
  it('Home carrega sem erros', () => {
    cy.visit('/');
    cy.contains('Bem-vindo'); // Ajuste para algum texto da sua home
  });

  it('Pesquisa de acomodações funciona', () => {
    cy.visit('/');
    cy.get('[data-cy=destino]').type('São Paulo');
    cy.get('[data-cy=tipo]').select('Apartamento');
    cy.get('[data-cy=semanas]').type('2');
    cy.get('[data-cy=data]').type('2024-07-01');
    cy.get('[data-cy=pessoas]').type('3');
    cy.get('[data-cy=pesquisar]').click();
    cy.contains('Resultados'); // Ajuste conforme seu resultado
  });

  it('Página de detalhes mostra informações e imagens', () => {
    cy.get('[data-cy=detalhes-acomodacao]').first().click();
    cy.contains('Descrição');
    cy.get('img').should('be.visible');
  });

  it('Área de login do cliente funciona', () => {
    cy.visit('/login');
    cy.get('[data-cy=email]').type('usuario@teste.com');
    cy.get('[data-cy=senha]').type('senha123');
    cy.get('[data-cy=entrar]').click();
    cy.contains('Bem-vindo'); // Ajuste conforme sua área logada
  });

  it('Cadastro de cliente novo salva no Supabase', () => {
    cy.visit('/cadastro');
    cy.get('[data-cy=nome]').type('Novo Usuário');
    cy.get('[data-cy=email]').type('novo@teste.com');
    cy.get('[data-cy=senha]').type('senha123');
    cy.get('[data-cy=cadastrar]').click();
    cy.contains('Cadastro realizado'); // Ajuste conforme sua mensagem
  });

  it('Formulário de solicitação de reserva funciona', () => {
    cy.visit('/acomodacao/1'); // Ajuste para um ID válido
    cy.get('[data-cy=nome]').type('Cliente Teste');
    cy.get('[data-cy=email]').type('cliente@teste.com');
    cy.get('[data-cy=solicitar-reserva]').click();
    cy.contains('Solicitação enviada'); // Ajuste conforme sua mensagem
  });

  it('Botões e navegação fluem sem travamentos', () => {
    cy.get('[data-cy=menu-home]').click();
    cy.url().should('include', '/');
    cy.get('[data-cy=menu-login]').click();
    cy.url().should('include', '/login');
  });
});

describe('Hello', () => {
  it('should work', () => {
    expect(true).to.equal(true);
  });
}); 