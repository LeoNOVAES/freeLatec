module.exports = (app)=>{
    app.get('/buscar',(req,res)=>{
        app.app.controllers.buscarControllers.buscar(app,req,res);
    });

    app.post('/search',(req,res)=>{
        app.app.controllers.buscarControllers.search(app,req,res);
    });
}