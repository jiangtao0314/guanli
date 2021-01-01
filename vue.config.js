const path = require('path');
const { config } = require('process');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('assets', resolve('./src/assets'))
            .set('components', resolve('./src/components'))
            // .set('router', resolve('./src/router'))  this.$router可以直接拿到
            // .set('store', resolve('./src/store'))   this.$store可以直接拿到
            .set('views', resolve('./src/views'))
            .set('network', resolve('./src/network'))
    },
}