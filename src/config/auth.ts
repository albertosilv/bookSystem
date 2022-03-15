const authConfig = Object.freeze({
  secret_token: process.env.SECRET_TOKEN || '',
  expires_in_token: process.env.EXPIRES_IN_TOKEN || '15m'
})

export { authConfig }
