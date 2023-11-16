const cors = require('cors');
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://127.0.0.1:5173,http://localhost:5173")
    .split(',')
    .map(origin => origin.trim())
module.exports = cors({
    origin: function (origin, next) {
        console.debug(`Origin: ${origin} Allowed origins: ${allowedOrigins}`)
        if (allowedOrigins.includes(origin) || origin === undefined) {
            next(null, true)
        } else {
            next(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
})