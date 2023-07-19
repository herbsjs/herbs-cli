const cors = require('cors')
const helmet = require('helmet')
const { json } = require('body-parser')

async function sec(app, config) {
    // Request security
    app.use(json({ limit: '50mb' }))
    app.use(cors())
    app.use(helmet({
        contentSecurityPolicy: {
            directives: { 
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "cdnjs.cloudflare.com", "unpkg.com", "cdn.jsdelivr.net", "apollo-server-landing-page.cdn.apollographql.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
                fontSrc: ["'self'", "data:", "fonts.googleapis.com", "fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "herbsjs.org", "apollo-server-landing-page.cdn.apollographql.com"],
                manifestSrc: ["'self'", "apollo-server-landing-page.cdn.apollographql.com"]
            }
        }
    }))

}

module.exports = { sec }