module.exports = function(app){
    app.get('/',(req,res)=>{
        app.app.controllers.index.index(app,req,res);
    });



}