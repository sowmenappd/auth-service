export function makeRejectedPromise(message: String, statusCode: Number) {
  return Promise.reject({
    message,
    statusCode,
  });
}
