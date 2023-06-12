const jwt = require('jsonwebtoken');

function myMiddleware(req, res, next) {

  // Get the token from the request headers, query parameters, or cookies
  var token = req.headers.authorization;
  check_token = token.split(' ')[1];

  // Check if token exists
  if (check_token == 'null') {

    return res.status(401).json({
      message: 'No token provided'
    });
  }
  try {
    // Verify and decode the token
    const decoded = jwt.verify(check_token, 'your_secret_key');

    // Attach the decoded token to the request object for further use
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.log(error)
    // Handle invalid tokens or other errors
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
}
module.exports = myMiddleware;