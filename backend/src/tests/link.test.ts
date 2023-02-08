import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import JWT from 'jsonwebtoken';

import { Response } from 'superagent';
import Link from '../database/models/Link';
import app from '../app';

import { findAllMock } from './mocks/link.mock';
import tokenMock from './mocks/token.mock';
import { tokenInvalid } from './mocks/responses.mock';

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
