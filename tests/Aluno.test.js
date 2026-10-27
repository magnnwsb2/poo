const test = require('node:test');
const assert = require('node:assert/strict');
const Aluno = require('../Aluno.js');

test('calcula a média das três notas', () => {
  const aluno = new Aluno('Ana', 6, 7, 8);
  assert.equal(aluno.gerarMedia(), 7);
  assert.equal(aluno.media, 7);
});

test('aprova com média igual a 6', () => {
  const aluno = new Aluno('Ana', 6, 6, 6);
  assert.equal(aluno.gerarEstado(), 'Aprovado');
});

test('coloca em recuperação com média igual a 3', () => {
  const aluno = new Aluno('Bia', 3, 3, 3);
  assert.equal(aluno.gerarEstado(), 'Recuperação');
});

test('reprova abaixo de 3', () => {
  const aluno = new Aluno('Caio', 2, 2, 2);
  assert.equal(aluno.gerarEstado(), 'Reprovado');
});

test('mantém dados do aluno', () => {
  const aluno = new Aluno('Davi', 5, 6, 7);
  assert.equal(aluno.nome, 'Davi');
  assert.deepEqual([aluno.nota1, aluno.nota2, aluno.nota3], [5, 6, 7]);
});
