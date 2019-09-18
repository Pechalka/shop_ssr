const routes = require('next-routes')
                                          
module.exports = routes()
.add('vacancy')
.add('order')
.add('contacts')
.add('home', '/:category', 'index')
