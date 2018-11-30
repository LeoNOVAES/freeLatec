const fetch = require('node-fetch');

module.exports.buscar = function(app,req,res){
    res.render('buscar');
}

module.exports.search = (app,req,res)=>{
    
    const email = req.body;
    const post = 'http://localhost:7000/api/buscar';
    fetch(post,{
        method:'POST',
        body:JSON.stringify(email),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json(res))
    .then((json)=>{
        res.render('curriculo',{'data':json});
    })
    .catch((err)=>{
        console.log(err)
    });


}