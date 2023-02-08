import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import JWT from 'jsonwebtoken';

import { Response } from 'superagent';
import User from '../database/models/User';
import app from '../app';

import { createMock } from './mocks/user.mock';
import tokenMock from './mocks/token.mock';
import { emailAlreadyRegistered } from './mocks/responses.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /register', () => {
  describe('It is possible to register successfully with the correct data', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(createMock as User);
      sinon.stub(JWT, 'sign').resolves(tokenMock);
    });
    afterEach(() => {
      (User.create as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
      (JWT.sign as sinon.SinonStub).restore();
    });
    it('Should return a 201 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .post('/register')
        .send({
          username: 'joaozinho',
          email: 'joaozinho@gmail.com',
          password: 'joao123',
        });
      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal({ token: tokenMock });
    });
  });

  describe('Unable to successfully register with an existing email address', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(createMock as User);
    });
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it('Should return a 409 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .post('/register')
        .send({
          username: 'joaozinho',
          email: 'joaozinho@gmail.com',
          password: 'joao123',
        });
      expect(httpResponse.status).to.equal(409);
      expect(httpResponse.body).to.deep.equal(emailAlreadyRegistered);
    });
  });
});
