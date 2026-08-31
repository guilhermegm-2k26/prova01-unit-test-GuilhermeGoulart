const {
  Veiculo,
  Vaga,
  Setor,
  Patio,
  Ticket,
  Tarifa,
  Permanencia,
  Caixa,
  Pagamento,
  Recibo,
  Mensalista,
  Convenio,
  Cancela,
  Operador,
  Turno,
  Reserva,
  Multa,
  Relatorio,
  Validador,
  Formatador,
} = require("../src/estacionamento");

describe("Veiculo", () => {
  test("deve validar placa com 7 caracteres", () => {
    // Arrange
    const veiculo = new Veiculo("ABC1D23", "carro");

    // Act
    const valida = veiculo.placaValida();

    // Assert
    expect(valida).toBe(true);
  });

  test("deve invalidar placa com tamanho diferente de 7", () => {
    // Arrange
    const veiculo = new Veiculo("ABC12", "carro");

    // Act
    const valida = veiculo.placaValida();

    // Assert
    expect(valida).toBe(false);
  });

  test("deve identificar veiculo do tipo moto", () => {
    // Arrange
    const veiculo = new Veiculo("ABC1D23", "moto");

    // Act
    const moto = veiculo.ehMoto();

    // Assert
    expect(moto).toBe(true);
  });

  test("nao deve identificar carro como moto", () => {
    // Arrange
    const veiculo = new Veiculo("ABC1D23", "carro");

    // Act
    const moto = veiculo.ehMoto();

    // Assert
    expect(moto).toBe(false);
  });
});

describe("Vaga", () => {
  test("deve ocupar uma vaga livre", () => {
    // Arrange
    const vaga = new Vaga(1);

    // Act
    const ocupou = vaga.ocupar();

    // Assert
    expect(ocupou).toBe(true);
    expect(vaga.estaLivre()).toBe(false);
  });

  test("nao deve ocupar uma vaga ja ocupada", () => {
    // Arrange
    const vaga = new Vaga(1);
    vaga.ocupar();

    // Act
    const ocupou = vaga.ocupar();

    // Assert
    expect(ocupou).toBe(false);
  });

  test("deve liberar a vaga", () => {
    // Arrange
    const vaga = new Vaga(1);
    vaga.ocupar();

    // Act
    const ocupada = vaga.liberar();

    // Assert
    expect(ocupada).toBe(false);
    expect(vaga.estaLivre()).toBe(true);
  });
});

describe("Setor", () => {
  test("deve ocupar vaga e reduzir as disponiveis", () => {
    // Arrange
    const setor = new Setor("A", 3);

    // Act
    const ocupou = setor.ocuparVaga();

    // Assert
    expect(ocupou).toBe(true);
    expect(setor.vagasDisponiveis()).toBe(2);
  });

  test("nao deve ocupar vaga quando o setor esta lotado", () => {
    // Arrange
    const setor = new Setor("A", 1);
    setor.ocuparVaga();

    // Act
    const ocupou = setor.ocuparVaga();

    // Assert
    expect(ocupou).toBe(false);
    expect(setor.estaLotado()).toBe(true);
  });

  test("nao deve estar lotado com vagas livres", () => {
    // Arrange
    const setor = new Setor("A", 2);
    setor.ocuparVaga();

    // Act
    const lotado = setor.estaLotado();

    // Assert
    expect(lotado).toBe(false);
  });
});

describe("Patio", () => {
  test("deve registrar a entrada de um veiculo", () => {
    // Arrange
    const patio = new Patio(2);

    // Act
    const entrou = patio.entrar();

    // Assert
    expect(entrou).toBe(true);
    expect(patio.veiculos).toBe(1);
  });

  test("nao deve registrar entrada com o patio cheio", () => {
    // Arrange
    const patio = new Patio(1);
    patio.entrar();

    // Act
    const entrou = patio.entrar();

    // Assert
    expect(entrou).toBe(false);
  });

  test("deve registrar a saida de um veiculo", () => {
    // Arrange
    const patio = new Patio(2);
    patio.entrar();

    // Act
    const saiu = patio.sair();

    // Assert
    expect(saiu).toBe(true);
    expect(patio.veiculos).toBe(0);
  });

  test("nao deve registrar saida com o patio vazio", () => {
    // Arrange
    const patio = new Patio(2);

    // Act
    const saiu = patio.sair();

    // Assert
    expect(saiu).toBe(false);
  });
});

describe("Ticket", () => {
  test("deve registrar a saida depois da entrada", () => {
    // Arrange
    const ticket = new Ticket("ABC1D23", 8);

    // Act
    const registrou = ticket.registrarSaida(12);

    // Assert
    expect(registrou).toBe(true);
    expect(ticket.calcularHoras()).toBe(4);
  });

  test("nao deve registrar saida anterior a entrada", () => {
    // Arrange
    const ticket = new Ticket("ABC1D23", 8);

    // Act
    const registrou = ticket.registrarSaida(7);

    // Assert
    expect(registrou).toBe(false);
    expect(ticket.horaSaida).toBeNull();
  });

  test("deve retornar zero horas enquanto o ticket esta aberto", () => {
    // Arrange
    const ticket = new Ticket("ABC1D23", 8);

    // Act
    const horas = ticket.calcularHoras();

    // Assert
    expect(horas).toBe(0);
    expect(ticket.estaAberto()).toBe(true);
  });

  test("deve fechar o ticket apos a saida", () => {
    // Arrange
    const ticket = new Ticket("ABC1D23", 8);
    ticket.registrarSaida(10);

    // Act
    const aberto = ticket.estaAberto();

    // Assert
    expect(aberto).toBe(false);
  });
});

describe("Tarifa", () => {
  test("deve calcular o valor pelas horas", () => {
    // Arrange
    const tarifa = new Tarifa(7);

    // Act
    const valor = tarifa.calcular(3);

    // Assert
    expect(valor).toBe(21);
  });

  test("deve retornar zero para horas nao positivas", () => {
    // Arrange
    const tarifa = new Tarifa(7);

    // Act
    const valor = tarifa.calcular(0);

    // Assert
    expect(valor).toBe(0);
  });

  test("deve considerar diaria a partir de 12 horas", () => {
    // Arrange
    const tarifa = new Tarifa(7);

    // Act
    const diaria = tarifa.ehDiaria(12);

    // Assert
    expect(diaria).toBe(true);
  });

  test("nao deve considerar diaria abaixo de 12 horas", () => {
    // Arrange
    const tarifa = new Tarifa(7);

    // Act
    const diaria = tarifa.ehDiaria(11);

    // Assert
    expect(diaria).toBe(false);
  });
});

describe("Permanencia", () => {
  test("deve arredondar os minutos para cima em horas", () => {
    // Arrange
    const permanencia = new Permanencia(90);

    // Act
    const horas = permanencia.emHoras();

    // Assert
    expect(horas).toBe(2);
  });

  test("deve estar dentro da tolerancia com 15 minutos", () => {
    // Arrange
    const permanencia = new Permanencia(15);

    // Act
    const tolerada = permanencia.dentroDaTolerancia();

    // Assert
    expect(tolerada).toBe(true);
  });

  test("nao deve estar dentro da tolerancia acima de 15 minutos", () => {
    // Arrange
    const permanencia = new Permanencia(16);

    // Act
    const tolerada = permanencia.dentroDaTolerancia();

    // Assert
    expect(tolerada).toBe(false);
  });
});

describe("Caixa", () => {
  test("deve receber um valor positivo", () => {
    // Arrange
    const caixa = new Caixa();

    // Act
    const recebeu = caixa.receber(50);

    // Assert
    expect(recebeu).toBe(true);
    expect(caixa.obterTotal()).toBe(50);
  });

  test("nao deve receber valor zero ou negativo", () => {
    // Arrange
    const caixa = new Caixa();

    // Act
    const recebeu = caixa.receber(0);

    // Assert
    expect(recebeu).toBe(false);
    expect(caixa.obterTotal()).toBe(0);
  });

  test("deve fechar o caixa retornando e zerando o total", () => {
    // Arrange
    const caixa = new Caixa();
    caixa.receber(30);
    caixa.receber(20);

    // Act
    const total = caixa.fechar();

    // Assert
    expect(total).toBe(50);
    expect(caixa.obterTotal()).toBe(0);
  });
});

describe("Pagamento", () => {
  test("deve pagar quando o valor recebido cobre o total", () => {
    // Arrange
    const pagamento = new Pagamento(20);

    // Act
    const pagou = pagamento.pagar(20);

    // Assert
    expect(pagou).toBe(true);
    expect(pagamento.foiPago()).toBe(true);
  });

  test("nao deve pagar com valor insuficiente", () => {
    // Arrange
    const pagamento = new Pagamento(20);

    // Act
    const pagou = pagamento.pagar(19);

    // Assert
    expect(pagou).toBe(false);
    expect(pagamento.foiPago()).toBe(false);
  });

  test("deve calcular o troco", () => {
    // Arrange
    const pagamento = new Pagamento(20);

    // Act
    const troco = pagamento.calcularTroco(50);

    // Assert
    expect(troco).toBe(30);
  });

  test("deve retornar troco zero quando o valor e insuficiente", () => {
    // Arrange
    const pagamento = new Pagamento(20);

    // Act
    const troco = pagamento.calcularTroco(10);

    // Assert
    expect(troco).toBe(0);
  });
});

describe("Recibo", () => {
  test("deve gerar o texto do recibo", () => {
    // Arrange
    const recibo = new Recibo("ABC1D23", 12.5);

    // Act
    const texto = recibo.gerar();

    // Assert
    expect(texto).toBe("ABC1D23 - R$ 12.50");
  });

  test("deve indicar recibo isento com valor zero", () => {
    // Arrange
    const recibo = new Recibo("ABC1D23", 0);

    // Act
    const isento = recibo.ehIsento();

    // Assert
    expect(isento).toBe(true);
  });

  test("nao deve indicar isencao com valor cobrado", () => {
    // Arrange
    const recibo = new Recibo("ABC1D23", 10);

    // Act
    const isento = recibo.ehIsento();

    // Assert
    expect(isento).toBe(false);
  });
});

describe("Mensalista", () => {
  test("deve registrar o pagamento de um mes", () => {
    // Arrange
    const mensalista = new Mensalista("Maria", 200);

    // Act
    const meses = mensalista.pagar();

    // Assert
    expect(meses).toBe(1);
  });

  test("deve calcular o total pago", () => {
    // Arrange
    const mensalista = new Mensalista("Maria", 200);
    mensalista.pagar();
    mensalista.pagar();

    // Act
    const total = mensalista.totalPago();

    // Assert
    expect(total).toBe(400);
  });

  test("nao deve estar adimplente sem pagamentos", () => {
    // Arrange
    const mensalista = new Mensalista("Maria", 200);

    // Act
    const adimplente = mensalista.estaAdimplente();

    // Assert
    expect(adimplente).toBe(false);
  });
});

