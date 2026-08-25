// 1) Veiculo
class Veiculo {
  constructor(placa, tipo) {
    this.placa = placa;
    this.tipo = tipo;
  }

  placaValida() {
    return this.placa.length === 7;
  }

  ehMoto() {
    return this.tipo === "moto";
  }
}

// 2) Vaga
class Vaga {
  constructor(numero) {
    this.numero = numero;
    this.ocupada = false;
  }

  ocupar() {
    if (this.ocupada) return false;

    this.ocupada = true;
    return true;
  }

  liberar() {
    this.ocupada = false;
    return this.ocupada;
  }

  estaLivre() {
    return !this.ocupada;
  }
}

// 3) Setor
class Setor {
  constructor(nome, totalVagas) {
    this.nome = nome;
    this.totalVagas = totalVagas;
    this.ocupadas = 0;
  }

  ocuparVaga() {
    if (this.estaLotado()) return false;

    this.ocupadas += 1;
    return true;
  }

  vagasDisponiveis() {
    return this.totalVagas - this.ocupadas;
  }

  estaLotado() {
    return this.ocupadas >= this.totalVagas;
  }
}

// 4) Patio
class Patio {
  constructor(capacidade) {
    this.capacidade = capacidade;
    this.veiculos = 0;
  }

  entrar() {
    if (this.estaCheio()) return false;

    this.veiculos += 1;
    return true;
  }

  sair() {
    if (this.veiculos === 0) return false;

    this.veiculos -= 1;
    return true;
  }

  estaCheio() {
    return this.veiculos >= this.capacidade;
  }
}

// 5) Ticket
class Ticket {
  constructor(placa, horaEntrada) {
    this.placa = placa;
    this.horaEntrada = horaEntrada;
    this.horaSaida = null;
  }

  registrarSaida(hora) {
    if (hora < this.horaEntrada) return false;

    this.horaSaida = hora;
    return true;
  }

  calcularHoras() {
    if (this.horaSaida === null) return 0;

    return this.horaSaida - this.horaEntrada;
  }

  estaAberto() {
    return this.horaSaida === null;
  }
}

// 6) Tarifa
class Tarifa {
  constructor(valorHora) {
    this.valorHora = valorHora;
  }

  calcular(horas) {
    if (horas <= 0) return 0;

    return horas * this.valorHora;
  }

  ehDiaria(horas) {
    return horas >= 12;
  }
}

// 7) Permanencia
class Permanencia {
  constructor(minutos) {
    this.minutos = minutos;
  }

  emHoras() {
    return Math.ceil(this.minutos / 60);
  }

  dentroDaTolerancia() {
    return this.minutos <= 15;
  }
}

// 8) Caixa
class Caixa {
  constructor() {
    this.total = 0;
  }

  receber(valor) {
    if (valor <= 0) return false;

    this.total += valor;
    return true;
  }

  obterTotal() {
    return this.total;
  }

  fechar() {
    const total = this.total;
    this.total = 0;
    return total;
  }
}

// 9) Pagamento
class Pagamento {
  constructor(valor) {
    this.valor = valor;
    this.pago = false;
  }

  pagar(recebido) {
    if (recebido < this.valor) return false;

    this.pago = true;
    return true;
  }

  calcularTroco(recebido) {
    if (recebido < this.valor) return 0;

    return recebido - this.valor;
  }

  foiPago() {
    return this.pago;
  }
}

// 10) Recibo
class Recibo {
  constructor(placa, valor) {
    this.placa = placa;
    this.valor = valor;
  }

  gerar() {
    return `${this.placa} - R$ ${this.valor.toFixed(2)}`;
  }

  ehIsento() {
    return this.valor === 0;
  }
}

// 11) Mensalista
class Mensalista {
  constructor(nome, valorMensal) {
    this.nome = nome;
    this.valorMensal = valorMensal;
    this.mesesPagos = 0;
  }

  pagar() {
    this.mesesPagos += 1;
    return this.mesesPagos;
  }

  totalPago() {
    return this.mesesPagos * this.valorMensal;
  }

  estaAdimplente() {
    return this.mesesPagos > 0;
  }
}

// 12) Convenio
class Convenio {
  constructor(nome, percentual) {
    this.nome = nome;
    this.percentual = percentual;
  }

  ehValido() {
    return this.percentual > 0 && this.percentual <= 100;
  }

  aplicar(valor) {
    if (!this.ehValido()) return valor;

    return valor - (valor * this.percentual) / 100;
  }
}

// 13) Cancela
class Cancela {
  constructor() {
    this.aberta = false;
  }

  abrir() {
    if (this.aberta) return false;

    this.aberta = true;
    return true;
  }

  fechar() {
    this.aberta = false;
    return this.aberta;
  }

  estaAberta() {
    return this.aberta;
  }
}

// 14) Operador
class Operador {
  constructor(nome, turno) {
    this.nome = nome;
    this.turno = turno;
    this.atendimentos = 0;
  }

  atender() {
    this.atendimentos += 1;
    return this.atendimentos;
  }

  ehNoturno() {
    return this.turno === "noite";
  }
}

// 15) Turno
class Turno {
  constructor(horaInicio, horaFim) {
    this.horaInicio = horaInicio;
    this.horaFim = horaFim;
  }

  duracao() {
    return this.horaFim - this.horaInicio;
  }

  ehValido() {
    return this.horaFim > this.horaInicio;
  }
}

// 16) Reserva
class Reserva {
  constructor(placa, numeroVaga) {
    this.placa = placa;
    this.numeroVaga = numeroVaga;
    this.confirmada = false;
  }

  confirmar() {
    this.confirmada = true;
    return this.confirmada;
  }

  cancelar() {
    if (!this.confirmada) return false;

    this.confirmada = false;
    return true;
  }

  estaConfirmada() {
    return this.confirmada;
  }
}

// 17) Multa
class Multa {
  constructor(motivo, valor) {
    this.motivo = motivo;
    this.valor = valor;
    this.paga = false;
  }

  ehGrave() {
    return this.valor > 100;
  }

  quitar() {
    if (this.paga) return false;

    this.paga = true;
    return true;
  }
}

// 18) Relatorio
class Relatorio {
  constructor() {
    this.valores = [];
  }

  registrar(valor) {
    this.valores.push(valor);
    return this.valores.length;
  }

  total() {
    return this.valores.reduce((soma, valor) => soma + valor, 0);
  }

  maiorValor() {
    if (this.valores.length === 0) return 0;

    return Math.max(...this.valores);
  }
}

// 19) Validador
class Validador {
  validarPlaca(placa) {
    return Boolean(placa) && placa.length === 7;
  }

  validarHora(hora) {
    return hora >= 0 && hora <= 23;
  }
}

// 20) Formatador
class Formatador {
  formatarPlaca(placa) {
    return placa.trim().toUpperCase();
  }

  formatarValor(valor) {
    return `R$ ${valor.toFixed(2)}`;
  }
}

module.exports = {
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
};
