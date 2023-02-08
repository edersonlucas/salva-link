import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import JWT from 'jsonwebtoken';

import { Response } from 'superagent';
import User from '../database/models/User';
import app from '../app';

import { findOneMock } from './mocks/user.mock';
import tokenMock from './mocks/token.mock';
import { incorrectEmailOrPassword } from './mocks/responses.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('It is possible to login successfully with the correct data', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(findOneMock as User);
      sinon.stub(JWT, 'sign').resolves(tokenMock);
    });
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
      (JWT.sign as sinon.SinonStub).restore();
    });
    it('Should return a 200 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'edersonlucas@outlook.com',
          password: '123456',
        });
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ token: tokenMock });
    });
  });

  describe('Unable to login successfully with incorrect data', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(findOneMock as User);
    });
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'edersonlucas@outlook.com',
          password: 'ronaldo',
        });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(incorrectEmailOrPassword);
    });
  });
});
