# Sistema Escolar — POO

Projeto didático da disciplina **Programação Orientada a Objetos (ECT2540, 2026)**, baseado nas notas da aula de 20/10/2026.

## Funcionalidades

- Cadastro de alunos com nome e três notas de 0 a 10.
- Cálculo da média aritmética por meio da classe `Aluno`.
- Classificação: **Aprovado** (média >= 6), **Recuperação** (3 <= média < 6), **Reprovado** (média < 3).
- Listagem dos alunos cadastrados e suas médias com duas casas decimais.
- Interface com abas para cadastro e listagem.

## Executar

Abra o arquivo `index.html` em um navegador moderno. Não é necessário instalar dependências nem iniciar servidor.

## Testes

Com Node.js instalado, execute:

```bash
node --test tests/Aluno.test.js
```

## Estrutura

- `index.html`: interface.
- `styles.css`: apresentação.
- `Aluno.js`: classe e regras de média e situação.
- `script.js`: eventos, validação e listagem.
- `tests/Aluno.test.js`: testes automatizados da classe.

Os dados são mantidos **somente em memória** enquanto a página permanece aberta. Recarregar a página apaga os cadastros. O projeto não utiliza banco de dados.
