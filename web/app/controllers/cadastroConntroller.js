const fetch = require('node-fetch');

module.exports.cadastro = function(app,req,res){
    res.render('cadastro');
}

module.exports.cadastrar = (app,req,res)=>{
    let data = req.body;
    const post = 'http://localhost:7000/api/cadastrar';
    fetch(post,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then((res)=>{
        res.json(res);
    })
    .then((json)=>{

    });
    res.redirect('/');
}