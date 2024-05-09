const axios = require('axios');
const expect = require('chai').expect;

describe('User Unit Test', function() {
    const url = "http://localhost:3000/api/users";

    describe('POST User', () => {
        it('should create a new user', (done) => {
          const postData = {
            username: 'Payal',
            email: 'Pyal@example.com',
            password: 'pyal123'
          };
      
          axios.post(url, postData)
            .then(response => {
              expect(response.status).to.equal(201);
              expect(response.data.message).to.equal("User created successfully");
              done();
            })
            .catch(error => {
              done(error);
            });
        });
      });
  
    describe('GET Users', () => {
        it('should return users', (done) => {
          axios.get(url)
            .then(response => {
              expect(response.status).to.equal(200);
              expect(response.data.message).to.equal("Users retrieved successfully");
              // Uncomment below lines if you want to check specific user data
              // expect(response.data.data[0]["id"]).to.equal("1");
              // expect(response.data.data[0]["name"]).to.equal("John Doe");
              // expect(response.data.data[0]["email"]).to.equal("john@example.com");
              done();
            })
            .catch(error => {
              done(error);
            });
        });
      });

      describe('Delete User', () => {
        it('should delete a user', (done) => {
          axios.get(url)
            .then(response => {
              const userId = response.data.data[0]._id;
              axios.delete(`${url}/${userId}`)
                .then(deleteResponse => {
                  expect(deleteResponse.status).to.equal(200);
                  expect(deleteResponse.data.message).to.equal("User deleted successfully");
                  done();
                })
                .catch(error => {
                  done(error);
                });
            })
            .catch(error => {
              done(error);
            });
        });
      });
});
