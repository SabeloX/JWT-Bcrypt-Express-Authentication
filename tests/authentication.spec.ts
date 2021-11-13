import { expect, use, request } from "chai";
import chaiHttp from 'chai-http';
import app from '../source/server';
import { connect } from 'mongoose';
import database from '../source/models/index';

/**Database URL */
const dbURL = 'mongodb://127.0.0.1:27017/secure_api_test'

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
    beforeEach(done => {
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
                expect(res.status).to.equal(201)
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
                expect(res.status).to.equal(403)
                done()
            })
            .catch(err => {
                console.log(err);
                done()
            })
        })
    })
})
