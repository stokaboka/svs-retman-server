/*
 * Copyright (c) 2019. Igor Khorev http://orangem.me igorhorev@gmail.com
 */

module.exports = {
    apps : [{
        name: "svstls",
        script: "./server.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}
