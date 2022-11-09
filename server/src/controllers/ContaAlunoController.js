const { findOne, findByPk } = require('../models/Aluno');
const Aluno = require('../models/Aluno');
const Conta = require('../models/Conta')


module.exports = {
    async index(req, res) {
        const contas = await Conta.findAll();
        return res.json(contas);
    },

    async store(req, res) {
        const { id_aluno } = req.params;

        //Recebendo os valores do frontend pelo corpo da requisição
        const {
            email,
            senha,
        } = req.body;

        //Verifica se existe este usuario no banco de dados
        const aluno = await Aluno.findByPk(id_aluno);

        if (!aluno) {
            return res.status(404).json()
        };

        //Procura se o usuario ja possui uma conta
        const conta_aluno = await Conta.findOne({
            where: { id_aluno }
        })

        //Se o usuario não possuir conta, ira ser criada
        if (conta_aluno === null) {

            //Procura se ja existe um email igual
            const [conta, created] = await Conta.findOrCreate({
                where: {
                    email,
                },
                defaults: {
                    email,
                    senha,
                    id_aluno
                }
            });

            //Se existir um email citado no banco de dados sera notificado
            if (!created) {
                return res.status(303).json("existing email")
            } else {
                return res.status(200).json()
            }

            //Se não existir um email se

            //Se o usuario ja possui uma conta, ira ser notificado
        } else {
            return res.status(303).json("user already has an account")
        }
    }
}
