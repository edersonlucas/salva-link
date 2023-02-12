import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import JWT from 'jsonwebtoken';

import { Response } from 'superagent';
import User from '../database/models/User';
import app from '../app';

import { getUserMock } from './mocks/user.mock';
import tokenMock from './mocks/token.mock';
import { tokenInvalid } from './mocks/responses.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /user', () => {
  describe('It is possible to get the successful user data using a valid token', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(getUserMock as User);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 200 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/user')
        .set('Authorization', tokenMock);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(getUserMock);
    });
  });

  describe('Unable to successfully retrieve your user data using an invalid token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/user')
        .set('Authorization', 'invalid');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenInvalid);
    });
  });
});

