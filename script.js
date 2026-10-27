let turma = [];

function salvar() {
  const nome = document.getElementById('nome').value.trim();
  const campos = ['n1', 'n2', 'n3'].map(id => document.getElementById(id));
  const mensagem = document.getElementById('mensagem');
  if (!nome || campos.some(campo => campo.value.trim() === '')) {
    mensagem.textContent = 'Preencha o nome e as três notas.';
    return;
  }
  const notas = campos.map(campo => Number(campo.value));
  if (notas.some(nota => !Number.isFinite(nota) || nota < 0 || nota > 10)) {
    mensagem.textContent = 'As notas devem estar entre 0 e 10.';
    return;
  }
  const aluno = new Aluno(nome, notas[0], notas[1], notas[2]);
  aluno.gerarMedia();
  aluno.gerarEstado();
  turma.push(aluno);
  mensagem.textContent = 'Aluno cadastrado com sucesso!';
  document.getElementById('form-aluno').reset();
}

function mudarAba(aba) {
  const cadastro = aba === 'cadastrar';
  document.getElementById('tab-cadastrar').hidden = !cadastro;
  document.getElementById('tab-listar').hidden = cadastro;
  document.getElementById('btn-cadastrar').classList.toggle('active', cadastro);
  document.getElementById('btn-listar').classList.toggle('active', !cadastro);
  document.getElementById('btn-cadastrar').setAttribute('aria-pressed', String(cadastro));
  document.getElementById('btn-listar').setAttribute('aria-pressed', String(!cadastro));
}

function cadastrar() { mudarAba('cadastrar'); }

function listar() {
  mudarAba('listar');
  const lista = document.getElementById('alunos');
  lista.replaceChildren();
  if (turma.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'Nenhum aluno cadastrado ainda.';
    lista.appendChild(item);
    return;
  }
  for (const aluno of turma) {
    const item = document.createElement('li');
    item.textContent = aluno.nome + ' - ' + aluno.media.toFixed(2) + ' - ' + aluno.estado;
    lista.appendChild(item);
  }
}

function aplicarTema(escuro) {
  document.body.classList.toggle('dark-mode', escuro);
  const botao = document.getElementById('btn-tema');
  botao.textContent = escuro ? '☀️ Modo claro' : '🌙 Modo escuro';
  botao.setAttribute('aria-label', escuro ? 'Ativar modo claro' : 'Ativar modo escuro');
  botao.setAttribute('aria-pressed', String(escuro));
}

const botaoTema = document.getElementById('btn-tema');
let temaSalvo = null;
try { temaSalvo = localStorage.getItem('tema-sistema-escolar'); } catch (erro) { /* Armazenamento indisponível. */ }
aplicarTema(temaSalvo === 'escuro');
botaoTema.addEventListener('click', function() {
  const escuro = !document.body.classList.contains('dark-mode');
  aplicarTema(escuro);
  try { localStorage.setItem('tema-sistema-escolar', escuro ? 'escuro' : 'claro'); } catch (erro) { /* Mantém a troca na sessão atual. */ }
});

document.getElementById('form-aluno').addEventListener('submit', function(evento) {
  evento.preventDefault();
  salvar();
});
