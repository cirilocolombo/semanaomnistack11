const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ong', async () => {
    const response = await request(app)
      .post('/ongs')
      //.set('authorization', 'valordois') //usar esta linha quando precisar enviar o authorization nas consultas
      .send({
        name: "Nova Ong para testes",
        email: "nova@ongparatestes.com.br",
        whatsapp: "48999995555",
        city: "Içara",
        uf: "SC"
      });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});