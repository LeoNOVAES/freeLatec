const app = require('./server/server');
const connect = require('./server/dbConnection')();

const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    res.setHeader("Access-Control-Allow-Credentials",true);
  
    next();
});





app.listen(7000,()=>{
    console.log("rodando na porta 7000")
});

app.post('/api/buscar',(req,res)=>{
    const email = req.body.email;

    connect.query(`SELECT id FROM frelancer WHERE email = '${email}'`,(err,result)=>{
        
        let id = result;
        connect.query(`SELECT * from frelancer,cerficacao,cursos,formacaoAcademica,endereco,experiencia WHERE frelancer.id = ${id[0].id} AND cerficacao.idFreelancer = ${id[0].id} AND cursos.idFreelancer = ${id[0].id} AND formacaoAcademica.idFreelancer = ${id[0].id} AND endereco.idFreelancer = ${id[0].id} AND experiencia.idFreelancer = ${id[0].id}`,(err,results)=>{
            if(err){
               res.json({'status':'erro'});
            }else{
               res.json(results);
            }
        });

    });
});

app.post('/api/cadastrar',(req,res)=>{
    let data = {'nomeFree':req.body.nome, 'sobrenome':req.body.sobrenome, 'dataN':req.body.dataN, 'idade':req.body.idade, 'email':req.body.email, 'telefone':req.body.telefone, 'objetivo':req.body.objetivo };
    console.log(req.body)
    connect.query('INSERT INTO frelancer SET ?',data,(err,results)=>{
        if(err){
            res.status(500).json({'erro':'erro ao adicionar dados'});
        }else{
            res.status(200).json({'status':'sucesso ao adicionar dados'});
            connect.query(`SELECT id FROM frelancer WHERE email = '${req.body.email}'`,(err,result)=>{
               let id = result;
               let dataEnd = {'idFreelancer':id[0].id, 'rua':req.body.rua, 'bairro':req.body.bairro, 'numero':req.body.numero, 'cidade':req.body.cidade, 'estado':req.body.estado, 'cep':req.body.cep }
               connect.query(`INSERT INTO endereco SET ?`,dataEnd,(err)=>{
                   
                });
                let dataCurso = {'idFreelancer':id[0].id, 'nomeCurso':req.body.cursoC, 'instituicao':req.body.instituicaoC, 'conclusaoCurso':req.body.conclusaoC, 'descricaoCur':req.body.descricaoC}
                connect.query(`INSERT INTO cursos SET ?`,dataCurso,(err)=>{
                    console.log(dataCurso)
                });
                let dataFormacao = {'idFreelancer':id[0].id, 'cursoA':req.body.formacao, 'instituicaoA':req.body.instituicaoA, 'terminoA':req.body.terminoA, 'habilidades':req.body.atividades}
                connect.query(`INSERT INTO formacaoAcademica SET ?`,dataFormacao,(err)=>{
                    console.log(dataFormacao)

                });
                let dataExperiencia = {'idFreelancer':id[0].id, 'instituicaoEx':req.body.instituicaoE, 'cargo':req.body.cargo,'inicio':req.body.inicio,'terminoEx':req.body.termino, 'atividades':req.body.descricaoE}
                connect.query(`INSERT INTO experiencia SET ?`,dataExperiencia,(err)=>{
                });
                let dataCertificacao = {'idFreelancer':id[0].id, 'nomeCert':req.body.certificacao, 'dataCert':req.body.dataCert, 'descricaoCert':req.body.descricaoCert}
                connect.query(`INSERT INTO cerficacao SET ?`,dataCertificacao,(err)=>{

                });
            });        
        }
    });
});


