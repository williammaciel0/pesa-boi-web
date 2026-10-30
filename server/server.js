const express = require('express');
const cors = require('cors');
const pool = require("./db");

// const { Pool } = require('pg');
require('dotenv').config()
const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://pesa-boi-web.vercel.app",
        process.env.FRONTEND_URL
    ].filter(Boolean)
}));
app.use(express.json());


// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });

app.get("/",(req, res)=>{
    res.send("Servidor funcionando!")
})

app.post("/cad-produtor", async(req, res)=>{
    try{     
        const { nome, senha, email } = req.body ?? {};

        if (!nome || !senha) {
            return res.status(400).json({ erro: 'Nome e senha são obrigatórios' });
        }

        const resultado = await pool.query(`
            insert into produtor(name_user, senha, email)
            values ($1, $2, $3) 
            returning *    
        `,
        [String(nome).trim(), String(senha).trim(), String(email).trim()]
        );
        return res.status(201).json(resultado.rows[0]);

    } catch(erro){
        console.error(erro);

        return res.status(500).json({
            erro: "Erro ao cadastrar produtor"
        });
    }
});

app.post('/up-perfilprodutor', async(req, res)=>{
    try {
        const {id, nome, email, senha} = req.body
        const up = await pool.query(`
           update produtor 
           set 
           name_user = $1, senha = $2, email = $3
           where id = $4
           returning *
        `,[nome, senha, email, id]);
        return res.status(201).json(up.rows[0])
    } catch (error) {
        console.log(error)
    }
});

app.post('/up-animal', async(req, res)=>{
    try {
        const {perimetro, peso, id} = req.body
        const resultado = await pool.query(`
            insert into historico (torax_history, peso_history, data_history, animal_id)
            values ($1, $2, CURRENT_DATE, $3)
            returning *
        `,[perimetro, peso, id]
        );

        const up = await pool.query(`
                update animal 
                set 
                    torax = $1, 
                    peso = $2, 
                    data_pesagem = CURRENT_DATE 
                where id = $3
                returning *
        `,[perimetro, peso, id]);

        return res.status(201).json({
            historico: resultado.rows[0],
            animal: up.rows[0]
        });

    } catch (error) {
        console.log(error)
    }
})

app.post('/cad-animal', async (req, res) => {
    try {
        const { nome, peso, perimetro, genero, produtor_id } = req.body ?? {};
        const pesoNumero = Number(peso);
        const perimetroNumero = Number(perimetro);

        if (!nome || !produtor_id || Number.isNaN(perimetroNumero) || perimetroNumero <= 0 || Number.isNaN(pesoNumero) || pesoNumero <= 0) {
            return res.status(400).json({ erro: 'Dados obrigatórios ausentes ou inválidos' });
        }

        const definir_genero = genero === 'macho' ? true : genero === 'femea' ? false : null;
        const resultado = await pool.query(`
            insert into animal (nome, peso, torax, data_pesagem, genero, produtor_id)
            values ($1, $2, $3, CURRENT_DATE, $4, $5)
            returning *
        `,
        [String(nome).trim(), pesoNumero, perimetroNumero, definir_genero, Number(produtor_id)]
        );
        const novoAnimal = resultado.rows[0]
        const novoId = novoAnimal.id
        const historico = await pool.query(`
            insert into historico (torax_history, peso_history, data_history, animal_id)
            values ($1, $2, CURRENT_DATE, $3)
            returning *  
        `,
        [perimetroNumero, pesoNumero, novoId]);

        return res.status(201).json({
            resultado: resultado.rows[0],
            historico: historico.rows[0]
        });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro ao cadastrar animal' });
    }
})
app.get('/animais', async(req, res)=>{
    try {
        const { produtor_id } = req.query;
        const resultado = await pool.query(
            `select distinct on (nome) * 
             from animal 
             where produtor_id = $1
             order by nome, id desc`, [produtor_id]
        );
        res.json(resultado.rows)

    } catch (error) {
        console.log('Erro ao buscar animais desse produtor!',error)
    }
});
app.get('/deletar-animal', async(req, res)=>{
    try {
        const { id } = req.query;
        const result = await pool.query(
            `delete from animal where id = $1`, [id]
        );
        res.json(result.rows)
    } catch (error) {
        console.error(error)
    }
});

app.get('/listar-animal', async(req, res)=>{
    try {
        const { animal_id } = req.query;
        const resultado = await pool.query(
            `select * from historico where animal_id = $1`, [animal_id]
        );
        res.json(resultado.rows)
    } catch (error) {
        console.log("Erro ao buscar histórico", error)
    }
});

app.get('/produtor', async (req, res)=>{
    try{
        const { nome, senha } = req.query;
        const result = await pool.query(
            `select * from produtor where name_user = $1 and senha = $2`,
            [nome, senha]
        );
        res.json(result.rows);
    } catch(erro){
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao buscar produtor"
        });
    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando ${PORT}!`);
});