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

describe("Convenio", () => {
  test("deve validar percentual dentro do intervalo", () => {
    // Arrange
    const convenio = new Convenio("Shopping", 50);

    // Act
    const valido = convenio.ehValido();

    // Assert
    expect(valido).toBe(true);
  });

  test("deve aplicar o desconto do convenio", () => {
    // Arrange
    const convenio = new Convenio("Shopping", 50);

    // Act
    const valor = convenio.aplicar(30);

    // Assert
    expect(valor).toBe(15);
  });

  test("deve manter o valor quando o convenio e invalido", () => {
    // Arrange
    const convenio = new Convenio("Shopping", 0);

    // Act
    const valor = convenio.aplicar(30);

    // Assert
    expect(convenio.ehValido()).toBe(false);
    expect(valor).toBe(30);
  });
});

describe("Cancela", () => {
  test("deve abrir a cancela fechada", () => {
    // Arrange
    const cancela = new Cancela();

    // Act
    const abriu = cancela.abrir();

    // Assert
    expect(abriu).toBe(true);
    expect(cancela.estaAberta()).toBe(true);
  });

  test("nao deve abrir a cancela ja aberta", () => {
    // Arrange
    const cancela = new Cancela();
    cancela.abrir();

    // Act
    const abriu = cancela.abrir();

    // Assert
    expect(abriu).toBe(false);
  });

  test("deve fechar a cancela", () => {
    // Arrange
    const cancela = new Cancela();
    cancela.abrir();

    // Act
    const aberta = cancela.fechar();

    // Assert
    expect(aberta).toBe(false);
  });
});

describe("Operador", () => {
  test("deve contar os atendimentos", () => {
    // Arrange
    const operador = new Operador("Joao", "manha");
    operador.atender();

    // Act
    const atendimentos = operador.atender();

    // Assert
    expect(atendimentos).toBe(2);
  });

  test("deve identificar operador do turno da noite", () => {
    // Arrange
    const operador = new Operador("Joao", "noite");

    // Act
    const noturno = operador.ehNoturno();

    // Assert
    expect(noturno).toBe(true);
  });

  test("nao deve identificar turno da manha como noturno", () => {
    // Arrange
    const operador = new Operador("Joao", "manha");

    // Act
    const noturno = operador.ehNoturno();

    // Assert
    expect(noturno).toBe(false);
  });
});

describe("Turno", () => {
  test("deve calcular a duracao do turno", () => {
    // Arrange
    const turno = new Turno(8, 14);

    // Act
    const duracao = turno.duracao();

    // Assert
    expect(duracao).toBe(6);
  });

  test("deve validar turno com fim depois do inicio", () => {
    // Arrange
    const turno = new Turno(8, 14);

    // Act
    const valido = turno.ehValido();

    // Assert
    expect(valido).toBe(true);
  });

  test("deve invalidar turno com inicio e fim iguais", () => {
    // Arrange
    const turno = new Turno(8, 8);

    // Act
    const valido = turno.ehValido();

    // Assert
    expect(valido).toBe(false);
  });
});

describe("Reserva", () => {
  test("deve confirmar a reserva", () => {
    // Arrange
    const reserva = new Reserva("ABC1D23", 10);

    // Act
    const confirmada = reserva.confirmar();

    // Assert
    expect(confirmada).toBe(true);
    expect(reserva.estaConfirmada()).toBe(true);
  });

  test("deve cancelar uma reserva confirmada", () => {
    // Arrange
    const reserva = new Reserva("ABC1D23", 10);
    reserva.confirmar();

    // Act
    const cancelou = reserva.cancelar();

    // Assert
    expect(cancelou).toBe(true);
    expect(reserva.estaConfirmada()).toBe(false);
  });

  test("nao deve cancelar reserva que nao foi confirmada", () => {
    // Arrange
    const reserva = new Reserva("ABC1D23", 10);

    // Act
    const cancelou = reserva.cancelar();

    // Assert
    expect(cancelou).toBe(false);
  });
});

describe("Multa", () => {
  test("deve considerar grave a multa acima de 100", () => {
    // Arrange
    const multa = new Multa("Vaga de idoso", 150);

    // Act
    const grave = multa.ehGrave();

    // Assert
    expect(grave).toBe(true);
  });

  test("nao deve considerar grave a multa de 100", () => {
    // Arrange
    const multa = new Multa("Atraso", 100);

    // Act
    const grave = multa.ehGrave();

    // Assert
    expect(grave).toBe(false);
  });

  test("deve quitar a multa em aberto", () => {
    // Arrange
    const multa = new Multa("Atraso", 50);

    // Act
    const quitou = multa.quitar();

    // Assert
    expect(quitou).toBe(true);
    expect(multa.paga).toBe(true);
  });

  test("nao deve quitar multa ja paga", () => {
    // Arrange
    const multa = new Multa("Atraso", 50);
    multa.quitar();

    // Act
    const quitou = multa.quitar();

    // Assert
    expect(quitou).toBe(false);
  });
});

describe("Relatorio", () => {
  test("deve registrar valores", () => {
    // Arrange
    const relatorio = new Relatorio();

    // Act
    const quantidade = relatorio.registrar(20);

    // Assert
    expect(quantidade).toBe(1);
  });

  test("deve somar os valores registrados", () => {
    // Arrange
    const relatorio = new Relatorio();
    relatorio.registrar(20);
    relatorio.registrar(35);

    // Act
    const total = relatorio.total();

    // Assert
    expect(total).toBe(55);
  });

  test("deve retornar o maior valor registrado", () => {
    // Arrange
    const relatorio = new Relatorio();
    relatorio.registrar(20);
    relatorio.registrar(35);

    // Act
    const maior = relatorio.maiorValor();

    // Assert
    expect(maior).toBe(35);
  });

  test("deve retornar zero como maior valor sem registros", () => {
    // Arrange
    const relatorio = new Relatorio();

    // Act
    const maior = relatorio.maiorValor();

    // Assert
    expect(maior).toBe(0);
  });
});

describe("Validador", () => {
  test("deve validar placa com 7 caracteres", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const valida = validador.validarPlaca("ABC1D23");

    // Assert
    expect(valida).toBe(true);
  });

  test("deve recusar placa vazia", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const valida = validador.validarPlaca("");

    // Assert
    expect(valida).toBe(false);
  });

  test("deve validar hora dentro do dia", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const valida = validador.validarHora(23);

    // Assert
    expect(valida).toBe(true);
  });

  test("deve recusar hora fora do intervalo", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const valida = validador.validarHora(24);

    // Assert
    expect(valida).toBe(false);
  });
});

describe("Formatador", () => {
  test("deve formatar a placa em maiusculo sem espacos", () => {
    // Arrange
    const formatador = new Formatador();

    // Act
    const placa = formatador.formatarPlaca("  abc1d23  ");

    // Assert
    expect(placa).toBe("ABC1D23");
  });

  test("deve formatar o valor como moeda", () => {
    // Arrange
    const formatador = new Formatador();

    // Act
    const valor = formatador.formatarValor(7);

    // Assert
    expect(valor).toBe("R$ 7.00");
  });
});
