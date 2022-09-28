'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Aluno extends Model {
        static associate(models) {
            this.hasMany(models.Turma,{foreignKey: "aluno_id"});
            this.hasOne(models.AlunoNota,{foreignKey: "aluno_id"});
        }
    }
            Aluno.init({
                nome: DataTypes.STRING,
                sobrenome: DataTypes.STRING,
                data_nasc: DataTypes.STRING,
                genero: DataTypes.STRING,
                rg: DataTypes.STRING,
                cpf: DataTypes.STRING,
                cep: DataTypes.STRING,
                cidade: DataTypes.STRING,
                bairro: DataTypes.STRING,
                rua: DataTypes.STRING,
                complemento: DataTypes.STRING,
                tel: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING,
            }, {
                sequelize,
                modelName: 'Aluno',
            });
            return Aluno;
        };
        
    
