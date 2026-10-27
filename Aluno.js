class Aluno {
  constructor(nome, nota1, nota2, nota3) {
    this.nome = nome;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.media = null;
    this.estado = '';
  }

  gerarMedia() {
    this.media = (this.nota1 + this.nota2 + this.nota3) / 3;
    return this.media;
  }

  gerarEstado() {
    if (this.media === null) this.gerarMedia();
    if (this.media >= 6) {
      this.estado = 'Aprovado';
    } else if (this.media >= 3) {
      this.estado = 'Recuperação';
    } else {
      this.estado = 'Reprovado';
    }
    return this.estado;
  }
}

if (typeof module !== 'undefined' && module.exports) module.exports = Aluno;
