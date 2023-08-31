const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // console.log('Auth middleware executed');
    // console.log('Received headers:', req.headers); 
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization || req.body.token;
    console.log('Received token:', token); 
    // ["Bearer", "<tokenvalue>"]
    // if (req.headers.authorization) {
    //   token = token.split(' ').pop().trim();
    // }

    if (!token) {
      return { ...req, user: null };
    }

    // verify token and get user data out of it
    try {
      // const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // req.user = data;
      const decodedToken = jwt.verify(token, secret);
      console.log('Decoded Token:', decodedToken);
      const user = decodedToken.data; 

      console.log('User data attached to request:', user);
      return { ...req, user }; 
    } catch (err){
      console.log('Invalid token', err);
      return { ...req, user: null };
    }

    // send to next endpoint
    // return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
