import chai, { should, use } from "chai";
import chaiHttp from 'chai-http';

/**Base URL */
const baseURL = 'http://localhost:3000/api/users';

/** Configure Chai */
use(chaiHttp);
should();

/** Container for Authentication API Requests*/
describe('Authentication Tests - Register, Sign-in', () => {
    /**Register User Tests*/
    describe('Register User', () => {
        /** User Registered Successfully Case */
        it('User Registered Successfully', (done) => {

        })
    })
})
