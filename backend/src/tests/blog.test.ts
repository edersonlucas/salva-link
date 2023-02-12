import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import JWT from 'jsonwebtoken';

import { Response } from 'superagent';
import DevGoBlogScraping from '../scraping/DevGoBlogScraping';
import app from '../app';
import { blogsMock, devgoMock } from './mocks/blog.mock';
import tokenMock from './mocks/token.mock';
import Link from '../database/models/Link';
import {
  blogNotFound,
  internalServerError,
  tokenInvalid,
  tokenNotFound,
} from './mocks/responses.mock';
import Blog from '../database/models/Blog';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /blog', () => {
  describe('It is possible to successfully get all blogs using a valid token', () => {
    beforeEach(async () => {
      sinon.stub(Blog, 'findAll').resolves(blogsMock as Blog[]);
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (Blog.findAll as sinon.SinonStub).restore();
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 200 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/blog')
        .set('Authorization', `Bearer ${tokenMock}`);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(blogsMock);
    });
  });

  describe('Unable to get all blogs successfully using an invalid token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/blog/')
        .set('Authorization', 'teste');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenInvalid);
    });
  });

  describe('Unable to get all blogs with missing token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').throws(new Error('Invalid token!'));
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 401 status code', async () => {
      const httpResponse: Response = await chai.request(app).get('/blog');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal(tokenNotFound);
    });
  });
});

describe('GET /blog/:name', () => {
  describe('It is possible to successfully get all links by passing an existing blog as a parameter using a valid token', () => {
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

  describe('It is not possible to get all the links successfully, passing a non-existent blog as a parameter using a valid token', () => {
    beforeEach(async () => {
      sinon.stub(JWT, 'verify').resolves(tokenMock);
    });
    afterEach(() => {
      (JWT.verify as sinon.SinonStub).restore();
    });
    it('Should return a 404 status code', async () => {
      const httpResponse: Response = await chai
        .request(app)
        .get('/blog/teste')
        .set('Authorization', `Bearer ${tokenMock}`);
      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal(blogNotFound);
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
