let turma = [];
let indiceEmEdicao = null;

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
  if (indiceEmEdicao === null) {
    const aluno = new Aluno(nome, notas[0], notas[1], notas[2]);
    aluno.gerarMedia();
    aluno.gerarEstado();
    turma.push(aluno);
    mensagem.textContent = 'Aluno cadastrado com sucesso!';
  } else {
    const aluno = turma[indiceEmEdicao];
    aluno.nome = nome;
    aluno.nota1 = notas[0];
    aluno.nota2 = notas[1];
    aluno.nota3 = notas[2];
    aluno.gerarMedia();
    aluno.gerarEstado();
    mensagem.textContent = 'Dados do aluno atualizados com sucesso!';
  }
  indiceEmEdicao = null;
  atualizarModoFormulario();
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

function atualizarModoFormulario() {
  const editando = indiceEmEdicao !== null;
  document.getElementById('titulo-form').textContent = editando ? 'Editar aluno' : 'Cadastrar aluno';
  document.getElementById('btn-salvar').textContent = editando ? 'Salvar alterações' : 'Salvar Aluno';
  document.getElementById('btn-cancelar').hidden = !editando;
}

function cancelarEdicao() {
  indiceEmEdicao = null;
  document.getElementById('form-aluno').reset();
  document.getElementById('mensagem').textContent = '';
  atualizarModoFormulario();
}

function cadastrar() {
  if (indiceEmEdicao !== null) cancelarEdicao();
  mudarAba('cadastrar');
}

function editarAluno(indice) {
  const aluno = turma[indice];
  if (!aluno) return;
  indiceEmEdicao = indice;
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('n1').value = aluno.nota1;
  document.getElementById('n2').value = aluno.nota2;
  document.getElementById('n3').value = aluno.nota3;
  document.getElementById('mensagem').textContent = '';
  atualizarModoFormulario();
  mudarAba('cadastrar');
  document.getElementById('nome').focus();
}

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
  turma.forEach(function(aluno, indice) {
    const item = document.createElement('li');
    const detalhes = document.createElement('div');
    detalhes.textContent = aluno.nome + ' - Notas: ' +
      [aluno.nota1, aluno.nota2, aluno.nota3].join(', ') +
      ' - Média: ' + aluno.media.toFixed(2) + ' - ' + aluno.estado;
    const acoes = document.createElement('div');
    acoes.className = 'acoes-aluno';
    const botaoEditar = document.createElement('button');
    botaoEditar.type = 'button';
    botaoEditar.className = 'btn-editar';
    botaoEditar.textContent = 'Editar';
    botaoEditar.setAttribute('aria-label', 'Editar aluno ' + aluno.nome);
    botaoEditar.addEventListener('click', function() { editarAluno(indice); });
    acoes.appendChild(botaoEditar);
    item.appendChild(detalhes);
    item.appendChild(acoes);
    lista.appendChild(item);
  });
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

document.getElementById('btn-cancelar').addEventListener('click', cancelarEdicao);
