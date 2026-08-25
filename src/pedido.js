// 1) Pedido
class Pedido {
  constructor(id) {
    this.id = id;
    this.itens = [];
    this.status = "aberto";
  }

  adicionarItem(nome, preco) {
    this.itens.push({ nome, preco });
    return this.itens.length;
  }

  calcularTotal() {
    return this.itens.reduce((total, item) => total + item.preco, 0);
  }

  confirmar() {
    this.status = "confirmado";
    return this.status;
  }
}

// 2) ItemPedido
class ItemPedido {
  constructor(nome, preco, quantidade) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }

  calcularSubtotal() {
    return this.preco * this.quantidade;
  }

  alterarQuantidade(quantidade) {
    this.quantidade = quantidade;
    return this.quantidade;
  }
}

// 3) Cliente
class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  obterPrimeiroNome() {
    return this.nome.split(" ")[0];
  }

  emailValido() {
    return this.email.includes("@");
  }
}

// 4) Endereco
class Endereco {
  constructor(rua, numero, cidade) {
    this.rua = rua;
    this.numero = numero;
    this.cidade = cidade;
  }

  formatar() {
    return `${this.rua}, ${this.numero} - ${this.cidade}`;
  }

  mesmaCidade(outra) {
    return this.cidade === outra;
  }
}

// 5) Produto
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  aumentarPreco(valor) {
    this.preco += valor;
    return this.preco;
  }

  ehCaro() {
    return this.preco > 100;
  }
}

// 6) Carrinho
class Carrinho {
  constructor() {
    this.produtos = [];
  }

  adicionar(produto) {
    this.produtos.push(produto);
    return this.produtos.length;
  }

  contar() {
    return this.produtos.length;
  }

  esvaziar() {
    this.produtos = [];
    return this.produtos;
  }
}

// 7) Estoque
class Estoque {
  constructor(quantidade) {
    this.quantidade = quantidade;
  }

  repor(valor) {
    this.quantidade += valor;
    return this.quantidade;
  }

  retirar(valor) {
    if (valor > this.quantidade) return false;

    this.quantidade -= valor;
    return true;
  }

  estaVazio() {
    return this.quantidade === 0;
  }
}

// 8) Cupom
class Cupom {
  constructor(codigo, percentual) {
    this.codigo = codigo;
    this.percentual = percentual;
  }

  calcularDesconto(total) {
    return (total * this.percentual) / 100;
  }

  aplicar(total) {
    return total - this.calcularDesconto(total);
  }
}

// 9) Frete
class Frete {
  constructor(precoPorKg) {
    this.precoPorKg = precoPorKg;
  }

  calcular(peso) {
    return peso * this.precoPorKg;
  }

  ehGratis(valorPedido) {
    return valorPedido >= 200;
  }
}

// 10) Pagamento
class Pagamento {
  constructor(valor) {
    this.valor = valor;
    this.pago = false;
  }

  pagar() {
    this.pago = true;
    return this.pago;
  }

  estornar() {
    this.pago = false;
    return this.pago;
  }

  foiPago() {
    return this.pago;
  }
}

// 11) NotaFiscal
class NotaFiscal {
  constructor(numero, valor) {
    this.numero = numero;
    this.valor = valor;
  }

  calcularImposto() {
    return this.valor * 0.18;
  }

  calcularTotal() {
    return this.valor + this.calcularImposto();
  }
}

// 12) Entrega
class Entrega {
  constructor(prazo) {
    this.prazo = prazo;
    this.entregue = false;
  }

  entregar() {
    this.entregue = true;
    return this.entregue;
  }

  estaAtrasada(dias) {
    return dias > this.prazo;
  }
}

// 13) Avaliacao
class Avaliacao {
  constructor(nota) {
    this.nota = nota;
  }

  ehValida() {
    return this.nota >= 1 && this.nota <= 5;
  }

  ehPositiva() {
    return this.nota >= 4;
  }
}

// 14) Fila
class Fila {
  constructor() {
    this.itens = [];
  }

  entrar(item) {
    this.itens.push(item);
    return this.itens.length;
  }

  sair() {
    return this.itens.shift();
  }

  tamanho() {
    return this.itens.length;
  }
}

// 15) Relatorio
class Relatorio {
  constructor() {
    this.valores = [];
  }

  registrar(valor) {
    this.valores.push(valor);
    return this.valores.length;
  }

  somar() {
    return this.valores.reduce((total, valor) => total + valor, 0);
  }

  media() {
    if (this.valores.length === 0) return 0;

    return this.somar() / this.valores.length;
  }
}

// 16) Fidelidade
class Fidelidade {
  constructor() {
    this.pontos = 0;
  }

  acumular(valor) {
    this.pontos += valor;
    return this.pontos;
  }

  resgatar(valor) {
    if (valor > this.pontos) return false;

    this.pontos -= valor;
    return true;
  }

  obterNivel() {
    return this.pontos >= 100 ? "ouro" : "prata";
  }
}

// 17) Devolucao
class Devolucao {
  constructor(valor) {
    this.valor = valor;
    this.aprovada = false;
  }

  aprovar() {
    this.aprovada = true;
    return this.aprovada;
  }

  calcularReembolso() {
    return this.aprovada ? this.valor : 0;
  }
}

// 18) Desconto
class Desconto {
  constructor(percentual) {
    this.percentual = percentual;
  }

  ehValido() {
    return this.percentual >= 0 && this.percentual <= 100;
  }

  aplicar(valor) {
    if (!this.ehValido()) return valor;

    return valor - (valor * this.percentual) / 100;
  }
}

// 19) Validador
class Validador {
  constructor(valorMinimo) {
    this.valorMinimo = valorMinimo;
  }

  validarValor(valor) {
    return valor >= this.valorMinimo;
  }

  validarNome(nome) {
    return Boolean(nome) && nome.length >= 3;
  }
}

// 20) Formatador
class Formatador {
  formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2)}`;
  }

  formatarTexto(texto) {
    return texto.trim().toUpperCase();
  }
}

module.exports = {
  Pedido,
  ItemPedido,
  Cliente,
  Endereco,
  Produto,
  Carrinho,
  Estoque,
  Cupom,
  Frete,
  Pagamento,
  NotaFiscal,
  Entrega,
  Avaliacao,
  Fila,
  Relatorio,
  Fidelidade,
  Devolucao,
  Desconto,
  Validador,
  Formatador,
};
