module.exports = {
    // common js
    devServer:{
        port:8000, //B端
        proxy:{
            '/api':'http://localhost:3001'
        }
    }
}