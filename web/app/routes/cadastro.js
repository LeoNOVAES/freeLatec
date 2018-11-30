module.exports = (app)=>{
    app.get('/cadastro',(req,res)=>{
        app.app.controllers.cadastroConntroller.cadastro(app,req,res);
    });

    app.post('/cadastrar',(req,res)=>{
        app.app.controllers.cadastroConntroller.cadastrar(app,req,res);
    });
}