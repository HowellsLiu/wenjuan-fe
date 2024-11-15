module.exports = {
    // common js
    devServer:{
        proxy:{
            '/api':'http://localhost:3001'
        }
    }
}