let turma = [];

function salvar() {
  let nome = document.getElementById('nome').value.trim();
  let campos = ['n1', 'n2', 'n3'].map(id => document.getElementById(id));
  if (!nome || campos.some(campo => campo.value.trim() === '')) {
    alert('Preencha o nome e as três notas.');
    return;
  }
  let notas = campos.map(campo => Number(campo.value));
  if (notas.some(nota => !Number.isFinite(nota) || nota < 0 || nota > 10)) {
    alert('Informe notas válidas entre 0 e 10.');
    return;
  }
  let a1 = new Aluno(nome, notas[0], notas[1], notas[2]);
  let m = a1.gerarMedia(a1.nota1, a1.nota2, a1.nota3);
  a1.gerarEstado(m);
  turma[turma.length] = a1;
  alert('Aluno cadastrado!');
}

function listar() {
  document.getElementById('btn-listar').classList.add('active');
  document.getElementById('btn-cadastrar').classList.remove('active');
  document.getElementById('tab-listar').classList.add('active');
  document.getElementById('tab-cadastrar').classList.remove('active');

  let lista = document.getElementById('alunos');
  lista.replaceChildren();
  if (turma.length === 0) {
    let item = document.createElement('li');
    item.textContent = 'Nenhum aluno cadastrado ainda.';
    lista.appendChild(item);
    return;
  }
  for (let i = 0; i < turma.length; i++) {
    let item = document.createElement('li');
    item.textContent = turma[i].nome + ' - ' + turma[i].media.toFixed(2) + ' - ' + turma[i].estado;
    lista.appendChild(item);
  }
}

function cadastrar() {
  document.getElementById('btn-listar').classList.remove('active');
  document.getElementById('btn-cadastrar').classList.add('active');
  document.getElementById('tab-listar').classList.remove('active');
  document.getElementById('tab-cadastrar').classList.add('active');
}
