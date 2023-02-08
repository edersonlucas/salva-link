import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import JWT from 'jsonwebtoken';

import { Response } from 'superagent';
import Link from '../database/models/Link';
import app from '../app';

import { createMock, findAllMock } from './mocks/link.mock';
import tokenMock from './mocks/token.mock';
import {
  failedUpdateLink,
  linkAlreadyRegistered,
  tokenInvalid,
} from './mocks/responses.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /link', () => {
  describe('It is possible to fetch all your links successfully using a valid token', () => {
    beforeEach(async () => {
      sinon.stub(Link, 'findAll').resolves(findAllMock as Link[]);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (Link.findAll as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 200 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/link')
        .set('Authorization', tokenMock);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(findAllMock);
    });
  });

  describe('Unable to successfully get all your links using an invalid token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/link')
        .set('Authorization', 'invalid');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenInvalid);
    });
  });
});

describe('POST /link', () => {
  describe('It is possible register a new link successfully using a valid token', () => {
    beforeEach(async () => {
      sinon.stub(Link, 'findAll').resolves(null);
      sinon.stub(Link, 'create').resolves(createMock as Link);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (Link.findAll as sinon.SinonStub).restore();
      (Link.create as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 201 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .post('/link')
        .set('Authorization', tokenMock)
        .send({
          title: 'OITO TENDÊNCIAS DE TECNOLOGIA PARA 2023',
          link: 'https://ravel.com.br/blog/oito-tendencias-de-tecnologia-para-2023/',
        });
      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal({
        title: createMock.title,
        link: createMock.link,
      });
    });
  });

  describe('It is not possible to register a link already registered by the user', () => {
    beforeEach(async () => {
      sinon.stub(Link, 'findOne').resolves(createMock as Link);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (Link.findOne as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 409 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .post('/link')
        .set('Authorization', tokenMock)
        .send({
          title: 'OITO TENDÊNCIAS DE TECNOLOGIA PARA 2023',
          link: 'https://ravel.com.br/blog/oito-tendencias-de-tecnologia-para-2023/',
        });
      expect(httpResponse.status).to.equal(409);
      expect(httpResponse.body).to.deep.equal(linkAlreadyRegistered);
    });
  });

  describe('Unable to successfully register a new link using an invalid token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .post('/link')
        .set('Authorization', 'invalid');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenInvalid);
    });
  });
});

describe('PUT /link', () => {
  describe('Is it possible to update a link successfully using a valid token', () => {
    beforeEach(async () => {
      sinon.stub(Link, 'update').resolves([1]);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (Link.update as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 204 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .put('/link/1')
        .set('Authorization', tokenMock)
        .send({
          title: 'OITO TENDÊNCIAS DE TECNOLOGIA PARA 2023',
          link: 'https://ravel.com.br/blog/oito-tendencias-de-tecnologia-para-2023/',
        });
      expect(httpResponse.status).to.equal(204);
      expect(httpResponse.body).to.deep.equal({});
    });
  });

  describe('Unable to update a link without making any changes', () => {
    beforeEach(async () => {
      sinon.stub(Link, 'update').resolves([0]);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (Link.update as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 400 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .put('/link/1')
        .set('Authorization', tokenMock)
        .send({
          title: 'OITO TENDÊNCIAS DE TECNOLOGIA PARA 2023',
          link: 'https://ravel.com.br/blog/oito-tendencias-de-tecnologia-para-2023/',
        });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal(failedUpdateLink);
    });
  });

  describe('Unable to successfully update a link using an invalid token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .put('/link/1')
        .set('Authorization', tokenMock)
        .send({
          title: 'OITO TENDÊNCIAS DE TECNOLOGIA PARA 2023',
          link: 'https://ravel.com.br/blog/oito-tendencias-de-tecnologia-para-2023/',
        });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenInvalid);
    });
  });
});
