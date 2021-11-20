import { expect, use, request } from "chai";
import chaiHttp from 'chai-http';
import app from '../source/server';
import { connect } from 'mongoose';
import database from '../source/models/index';
import testingConfig from '../source/configuration/testing.config';

/**Testing Database URL */
const dbURL = testingConfig.database || '';

/** Configure Chai */
use(chaiHttp);
// should();

/** Container for Authentication API Requests*/
describe('Authentication Tests', () => {
    /**Connect to database */
    connect(dbURL, (err) => !err ? 
        console.log('Connected to the database!') : 
        console.log('Cannot Connect to the database')
    )

    /**Before the tests clear the database */
    before(done => {
        database.User.remove({}, (err) => {
            done()
        })
    })

    /**Register User Tests*/
    describe('Register User', () => {
        /** User Registered Successfully Case */
        it('User Registered Successfully', (done) => {
            /**Test register data */
            const body = { username: 'sabelo@xero.com', password: 'sabeloxxs' };

            /**Test a post request */
            request(app)
            .post('/api/users/register')
            .send(body)
            .then(res => {
                expect(res.status).to.equal(201);
                // expect(res.body).to.have.
                done()
            })
            .catch(err => {
                console.log(err)
                done();
            })
        })

        /**Duplicate Found */
        it('User already exists', (done) => {
            /**Test register data - already in use */
            const body = { username: 'sabelo@xero.com', password: 'sabeloxxs' };

            /**Test a post request */
            request(app)
            .post(`/api/users/register`)
            .send(body)
            .then(res => {
                expect(res.body.message).to.equal('User already exists!');
                expect(res.status).to.equal(403);
                done()
            })
            .catch(err => {
                console.log(err);
                done()
            })
        })

        /**Bad Format - Short Password */
        it('Short Password', (done) => {
            const body = { username: 'xero@sabelo.com', password: 'sabs' };

            /**Test a post request */
            request(app)
            .post(`/api/users/register`)
            .send(body)
            .then(res => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal('At least 6 username/password characters required!');
                done()
            })
            .catch(err => {
                console.log(err);
                done()
            })
        })

        /** Short Username - BAD FORMAT */
        it('Short Username', (done) => {
            const body = { username: 'xero', password: 'sabswwwww' };

            /**Test a post request */
            request(app)
            .post(`/api/users/register`)
            .send(body)
            .then(res => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal('At least 6 username/password characters required!');
                done()
            })
            .catch(err => {
                console.log(err);
                done()
            })
        })
    })
})
