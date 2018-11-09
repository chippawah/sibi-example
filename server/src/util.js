import jwt from 'jsonwebtoken';
const JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || '5up3rS3cret'

export function sign_token(user_id) {
  return jwt.sign({ user_id }, JWT_SESSION_SECRET);
}

export function get_authed_user(context) {
  // Grab the Authorization header
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    // Grab the token off the header
    const token = Authorization.replace('Bearer ', '');
    // Verify the token and return the user's id
    const { user_id } = jwt.verify(token, JWT_SESSION_SECRET);
    return user_id;
  }
  // Throw an error if the user is not authorized
  throw new Error('Not Authorized.');
}
