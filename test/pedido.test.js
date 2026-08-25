const {
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
} = require("../src/pedido");

describe("Pedido", () => {
  test("deve adicionar item e retornar a quantidade de itens", () => {
    // Arrange
    const pedido = new Pedido(1);

    // Act
    const quantidade = pedido.adicionarItem("Caneta", 5);

    // Assert
    expect(quantidade).toBe(1);
    expect(pedido.itens).toEqual([{ nome: "Caneta", preco: 5 }]);
  });

  test("deve calcular o total somando os precos", () => {
    // Arrange
    const pedido = new Pedido(1);
    pedido.adicionarItem("Caneta", 5);
    pedido.adicionarItem("Caderno", 20);

    // Act
    const total = pedido.calcularTotal();

    // Assert
    expect(total).toBe(25);
  });

  test("deve calcular total zero quando nao ha itens", () => {
    // Arrange
    const pedido = new Pedido(1);

    // Act
    const total = pedido.calcularTotal();

    // Assert
    expect(total).toBe(0);
  });

  test("deve confirmar o pedido alterando o status", () => {
    // Arrange
    const pedido = new Pedido(1);

    // Act
    const status = pedido.confirmar();

    // Assert
    expect(status).toBe("confirmado");
    expect(pedido.status).toBe("confirmado");
  });
});

describe("ItemPedido", () => {
  test("deve calcular o subtotal multiplicando preco por quantidade", () => {
    // Arrange
    const item = new ItemPedido("Caneta", 2.5, 4);

    // Act
    const subtotal = item.calcularSubtotal();

    // Assert
    expect(subtotal).toBe(10);
  });

  test("deve alterar a quantidade do item", () => {
    // Arrange
    const item = new ItemPedido("Caneta", 2.5, 4);

    // Act
    const quantidade = item.alterarQuantidade(7);

    // Assert
    expect(quantidade).toBe(7);
    expect(item.calcularSubtotal()).toBe(17.5);
  });
});

describe("Cliente", () => {
  test("deve obter o primeiro nome", () => {
    // Arrange
    const cliente = new Cliente("Maria Silva Souza", "maria@email.com");

    // Act
    const primeiroNome = cliente.obterPrimeiroNome();

    // Assert
    expect(primeiroNome).toBe("Maria");
  });

  test("deve reconhecer email valido", () => {
    // Arrange
    const cliente = new Cliente("Maria", "maria@email.com");

    // Act
    const valido = cliente.emailValido();

    // Assert
    expect(valido).toBe(true);
  });

  test("deve reconhecer email invalido", () => {
    // Arrange
    const cliente = new Cliente("Maria", "maria.email.com");

    // Act
    const valido = cliente.emailValido();

    // Assert
    expect(valido).toBe(false);
  });
});

describe("Endereco", () => {
  test("deve formatar o endereco completo", () => {
    // Arrange
    const endereco = new Endereco("Rua A", 100, "Sao Paulo");

    // Act
    const formatado = endereco.formatar();

    // Assert
    expect(formatado).toBe("Rua A, 100 - Sao Paulo");
  });

  test("deve indicar quando a cidade e a mesma", () => {
    // Arrange
    const endereco = new Endereco("Rua A", 100, "Sao Paulo");

    // Act
    const mesma = endereco.mesmaCidade("Sao Paulo");

    // Assert
    expect(mesma).toBe(true);
  });

  test("deve indicar quando a cidade e diferente", () => {
    // Arrange
    const endereco = new Endereco("Rua A", 100, "Sao Paulo");

    // Act
    const mesma = endereco.mesmaCidade("Curitiba");

    // Assert
    expect(mesma).toBe(false);
  });
});

describe("Produto", () => {
  test("deve aumentar o preco do produto", () => {
    // Arrange
    const produto = new Produto("Caneta", 10);

    // Act
    const preco = produto.aumentarPreco(5);

    // Assert
    expect(preco).toBe(15);
    expect(produto.preco).toBe(15);
  });

  test("deve indicar que o produto e caro acima de 100", () => {
    // Arrange
    const produto = new Produto("Notebook", 150);

    // Act
    const caro = produto.ehCaro();

    // Assert
    expect(caro).toBe(true);
  });

  test("deve indicar que o produto nao e caro no limite de 100", () => {
    // Arrange
    const produto = new Produto("Fone", 100);

    // Act
    const caro = produto.ehCaro();

    // Assert
    expect(caro).toBe(false);
  });
});

describe("Carrinho", () => {
  test("deve adicionar produto e retornar a quantidade", () => {
    // Arrange
    const carrinho = new Carrinho();

    // Act
    const total = carrinho.adicionar(new Produto("Caneta", 10));

    // Assert
    expect(total).toBe(1);
  });

  test("deve contar os produtos do carrinho", () => {
    // Arrange
    const carrinho = new Carrinho();
    carrinho.adicionar(new Produto("Caneta", 10));
    carrinho.adicionar(new Produto("Caderno", 20));

    // Act
    const quantidade = carrinho.contar();

    // Assert
    expect(quantidade).toBe(2);
  });

  test("deve esvaziar o carrinho", () => {
    // Arrange
    const carrinho = new Carrinho();
    carrinho.adicionar(new Produto("Caneta", 10));

    // Act
    const produtos = carrinho.esvaziar();

    // Assert
    expect(produtos).toEqual([]);
    expect(carrinho.contar()).toBe(0);
  });
});

describe("Estoque", () => {
  test("deve repor a quantidade", () => {
    // Arrange
    const estoque = new Estoque(10);

    // Act
    const quantidade = estoque.repor(5);

    // Assert
    expect(quantidade).toBe(15);
  });

  test("deve retirar quando ha quantidade suficiente", () => {
    // Arrange
    const estoque = new Estoque(10);

    // Act
    const retirou = estoque.retirar(4);

    // Assert
    expect(retirou).toBe(true);
    expect(estoque.quantidade).toBe(6);
  });

  test("nao deve retirar quantidade maior que o estoque", () => {
    // Arrange
    const estoque = new Estoque(3);

    // Act
    const retirou = estoque.retirar(10);

    // Assert
    expect(retirou).toBe(false);
    expect(estoque.quantidade).toBe(3);
  });

  test("deve indicar estoque vazio", () => {
    // Arrange
    const estoque = new Estoque(0);

    // Act
    const vazio = estoque.estaVazio();

    // Assert
    expect(vazio).toBe(true);
  });
});

describe("Cupom", () => {
  test("deve calcular o valor do desconto", () => {
    // Arrange
    const cupom = new Cupom("PROMO10", 10);

    // Act
    const desconto = cupom.calcularDesconto(200);

    // Assert
    expect(desconto).toBe(20);
  });

  test("deve aplicar o desconto sobre o total", () => {
    // Arrange
    const cupom = new Cupom("PROMO10", 10);

    // Act
    const total = cupom.aplicar(200);

    // Assert
    expect(total).toBe(180);
  });
});

describe("Frete", () => {
  test("deve calcular o frete pelo peso", () => {
    // Arrange
    const frete = new Frete(5);

    // Act
    const valor = frete.calcular(3);

    // Assert
    expect(valor).toBe(15);
  });

  test("deve ter frete gratis a partir de 200", () => {
    // Arrange
    const frete = new Frete(5);

    // Act
    const gratis = frete.ehGratis(200);

    // Assert
    expect(gratis).toBe(true);
  });

  test("nao deve ter frete gratis abaixo de 200", () => {
    // Arrange
    const frete = new Frete(5);

    // Act
    const gratis = frete.ehGratis(199);

    // Assert
    expect(gratis).toBe(false);
  });
});

describe("Pagamento", () => {
  test("deve marcar o pagamento como pago", () => {
    // Arrange
    const pagamento = new Pagamento(100);

    // Act
    const pago = pagamento.pagar();

    // Assert
    expect(pago).toBe(true);
    expect(pagamento.foiPago()).toBe(true);
  });

  test("deve estornar o pagamento", () => {
    // Arrange
    const pagamento = new Pagamento(100);
    pagamento.pagar();

    // Act
    const pago = pagamento.estornar();

    // Assert
    expect(pago).toBe(false);
    expect(pagamento.foiPago()).toBe(false);
  });

  test("deve iniciar como nao pago", () => {
    // Arrange
    const pagamento = new Pagamento(100);

    // Act
    const pago = pagamento.foiPago();

    // Assert
    expect(pago).toBe(false);
  });
});

describe("NotaFiscal", () => {
  test("deve calcular o imposto de 18%", () => {
    // Arrange
    const nota = new NotaFiscal(1, 100);

    // Act
    const imposto = nota.calcularImposto();

    // Assert
    expect(imposto).toBe(18);
  });

  test("deve calcular o total com imposto", () => {
    // Arrange
    const nota = new NotaFiscal(1, 100);

    // Act
    const total = nota.calcularTotal();

    // Assert
    expect(total).toBe(118);
  });
});

describe("Entrega", () => {
  test("deve marcar a entrega como entregue", () => {
    // Arrange
    const entrega = new Entrega(5);

    // Act
    const entregue = entrega.entregar();

    // Assert
    expect(entregue).toBe(true);
  });

  test("deve indicar atraso quando passa do prazo", () => {
    // Arrange
    const entrega = new Entrega(5);

    // Act
    const atrasada = entrega.estaAtrasada(6);

    // Assert
    expect(atrasada).toBe(true);
  });

  test("nao deve indicar atraso dentro do prazo", () => {
    // Arrange
    const entrega = new Entrega(5);

    // Act
    const atrasada = entrega.estaAtrasada(5);

    // Assert
    expect(atrasada).toBe(false);
  });
});

describe("Avaliacao", () => {
  test("deve validar nota dentro do intervalo de 1 a 5", () => {
    // Arrange
    const avaliacao = new Avaliacao(3);

    // Act
    const valida = avaliacao.ehValida();

    // Assert
    expect(valida).toBe(true);
  });

  test("deve invalidar nota fora do intervalo", () => {
    // Arrange
    const avaliacao = new Avaliacao(6);

    // Act
    const valida = avaliacao.ehValida();

    // Assert
    expect(valida).toBe(false);
  });

  test("deve considerar positiva a nota 4 ou maior", () => {
    // Arrange
    const avaliacao = new Avaliacao(4);

    // Act
    const positiva = avaliacao.ehPositiva();

    // Assert
    expect(positiva).toBe(true);
  });

  test("nao deve considerar positiva a nota 3", () => {
    // Arrange
    const avaliacao = new Avaliacao(3);

    // Act
    const positiva = avaliacao.ehPositiva();

    // Assert
    expect(positiva).toBe(false);
  });
});

describe("Fila", () => {
  test("deve colocar item na fila", () => {
    // Arrange
    const fila = new Fila();

    // Act
    const tamanho = fila.entrar("pedido-1");

    // Assert
    expect(tamanho).toBe(1);
  });

  test("deve retirar o primeiro item da fila", () => {
    // Arrange
    const fila = new Fila();
    fila.entrar("pedido-1");
    fila.entrar("pedido-2");

    // Act
    const item = fila.sair();

    // Assert
    expect(item).toBe("pedido-1");
    expect(fila.tamanho()).toBe(1);
  });

  test("deve retornar undefined ao sair de fila vazia", () => {
    // Arrange
    const fila = new Fila();

    // Act
    const item = fila.sair();

    // Assert
    expect(item).toBeUndefined();
  });
});

describe("Relatorio", () => {
  test("deve registrar valores", () => {
    // Arrange
    const relatorio = new Relatorio();

    // Act
    const quantidade = relatorio.registrar(100);

    // Assert
    expect(quantidade).toBe(1);
  });

  test("deve somar os valores registrados", () => {
    // Arrange
    const relatorio = new Relatorio();
    relatorio.registrar(100);
    relatorio.registrar(50);

    // Act
    const soma = relatorio.somar();

    // Assert
    expect(soma).toBe(150);
  });

  test("deve calcular a media dos valores", () => {
    // Arrange
    const relatorio = new Relatorio();
    relatorio.registrar(100);
    relatorio.registrar(50);

    // Act
    const media = relatorio.media();

    // Assert
    expect(media).toBe(75);
  });

  test("deve retornar media zero sem valores", () => {
    // Arrange
    const relatorio = new Relatorio();

    // Act
    const media = relatorio.media();

    // Assert
    expect(media).toBe(0);
  });
});

describe("Fidelidade", () => {
  test("deve acumular pontos", () => {
    // Arrange
    const fidelidade = new Fidelidade();

    // Act
    const pontos = fidelidade.acumular(50);

    // Assert
    expect(pontos).toBe(50);
  });

  test("deve resgatar pontos disponiveis", () => {
    // Arrange
    const fidelidade = new Fidelidade();
    fidelidade.acumular(50);

    // Act
    const resgatou = fidelidade.resgatar(30);

    // Assert
    expect(resgatou).toBe(true);
    expect(fidelidade.pontos).toBe(20);
  });

  test("nao deve resgatar mais pontos do que possui", () => {
    // Arrange
    const fidelidade = new Fidelidade();
    fidelidade.acumular(10);

    // Act
    const resgatou = fidelidade.resgatar(30);

    // Assert
    expect(resgatou).toBe(false);
    expect(fidelidade.pontos).toBe(10);
  });

  test("deve retornar nivel ouro a partir de 100 pontos", () => {
    // Arrange
    const fidelidade = new Fidelidade();
    fidelidade.acumular(100);

    // Act
    const nivel = fidelidade.obterNivel();

    // Assert
    expect(nivel).toBe("ouro");
  });

  test("deve retornar nivel prata abaixo de 100 pontos", () => {
    // Arrange
    const fidelidade = new Fidelidade();
    fidelidade.acumular(99);

    // Act
    const nivel = fidelidade.obterNivel();

    // Assert
    expect(nivel).toBe("prata");
  });
});

describe("Devolucao", () => {
  test("deve aprovar a devolucao", () => {
    // Arrange
    const devolucao = new Devolucao(200);

    // Act
    const aprovada = devolucao.aprovar();

    // Assert
    expect(aprovada).toBe(true);
  });

  test("deve reembolsar o valor quando aprovada", () => {
    // Arrange
    const devolucao = new Devolucao(200);
    devolucao.aprovar();

    // Act
    const reembolso = devolucao.calcularReembolso();

    // Assert
    expect(reembolso).toBe(200);
  });

  test("nao deve reembolsar quando nao aprovada", () => {
    // Arrange
    const devolucao = new Devolucao(200);

    // Act
    const reembolso = devolucao.calcularReembolso();

    // Assert
    expect(reembolso).toBe(0);
  });
});

describe("Desconto", () => {
  test("deve validar percentual dentro do intervalo", () => {
    // Arrange
    const desconto = new Desconto(20);

    // Act
    const valido = desconto.ehValido();

    // Assert
    expect(valido).toBe(true);
  });

  test("deve aplicar o percentual sobre o valor", () => {
    // Arrange
    const desconto = new Desconto(20);

    // Act
    const valor = desconto.aplicar(100);

    // Assert
    expect(valor).toBe(80);
  });

  test("deve devolver o valor original quando o percentual e invalido", () => {
    // Arrange
    const desconto = new Desconto(150);

    // Act
    const valor = desconto.aplicar(100);

    // Assert
    expect(desconto.ehValido()).toBe(false);
    expect(valor).toBe(100);
  });
});

describe("Validador", () => {
  test("deve aceitar valor igual ao minimo", () => {
    // Arrange
    const validador = new Validador(50);

    // Act
    const valido = validador.validarValor(50);

    // Assert
    expect(valido).toBe(true);
  });

  test("deve recusar valor abaixo do minimo", () => {
    // Arrange
    const validador = new Validador(50);

    // Act
    const valido = validador.validarValor(49);

    // Assert
    expect(valido).toBe(false);
  });

  test("deve aceitar nome com 3 ou mais caracteres", () => {
    // Arrange
    const validador = new Validador(0);

    // Act
    const valido = validador.validarNome("Ana");

    // Assert
    expect(valido).toBe(true);
  });

  test("deve recusar nome vazio", () => {
    // Arrange
    const validador = new Validador(0);

    // Act
    const valido = validador.validarNome("");

    // Assert
    expect(valido).toBe(false);
  });
});

describe("Formatador", () => {
  test("deve formatar valor como moeda", () => {
    // Arrange
    const formatador = new Formatador();

    // Act
    const texto = formatador.formatarMoeda(12.5);

    // Assert
    expect(texto).toBe("R$ 12.50");
  });

  test("deve remover espacos e deixar o texto em maiusculo", () => {
    // Arrange
    const formatador = new Formatador();

    // Act
    const texto = formatador.formatarTexto("  pedido confirmado  ");

    // Assert
    expect(texto).toBe("PEDIDO CONFIRMADO");
  });
});
