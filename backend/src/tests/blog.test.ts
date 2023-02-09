import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import JWT from 'jsonwebtoken';

import { Response } from 'superagent';
import DevGoBlogScraping from '../scraping/DevGoBlogScraping';
import app from '../app';
import { devgoMock } from './mocks/blog.mock';
import tokenMock from './mocks/token.mock';
import Link from '../database/models/Link';
import {
  internalServerError,
  tokenInvalid,
  tokenNotFound,
} from './mocks/responses.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /blog/devgo', () => {
  describe('It is possible to successfully get all links using a valid token', () => {
    beforeEach(async () => {
      sinon.stub(DevGoBlogScraping, 'get').resolves(devgoMock as Link[]);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (DevGoBlogScraping.get as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 200 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/blog/devgo')
        .set('Authorization', `Bearer ${tokenMock}`);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(devgoMock);
    });
  });

  describe('Unable to get all links successfully using an invalid token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/blog/devgo')
        .set('Authorization', 'teste');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenInvalid);
    });
  });

  describe('Unable to get all links with missing token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai.request(app).get('/blog/devgo');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenNotFound);
    });
  });

  describe('If the blog is offline', () => {
    beforeEach(async () => {
      sinon.stub(DevGoBlogScraping, 'get').rejects('teste');
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (DevGoBlogScraping.get as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 500 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/blog/devgo')
        .set('Authorization', tokenMock);
      expect(httpResponse.status).to.equal(500);
      expect(httpResponse.body).to.deep.equal(internalServerError);
    });
  });
});
