const tipo = document.getElementById('tipo');
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const adicionarBtn = document.getElementById('adicionar');

const listaTransacoes = document.getElementById('lista-transacoes');
const totalReceitasEl = document.getElementById('total-receitas');
const totalDespesasEl = document.getElementById('total-despesas');
const saldoEl = document.getElementById('saldo');

let transacoes = [];

function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

adicionarBtn.addEventListener('click', () => {
  const tipoValor = tipo.value;
  const descricaoValor = descricao.value.trim();
  const valorNumerico = parseFloat(valor.value);

  if (descricaoValor === '' || isNaN(valorNumerico) || valorNumerico <= 0) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  const novaTransacao = {
    id: Date.now(),
    tipo: tipoValor,
    descricao: descricaoValor,
    valor: valorNumerico
  };

  transacoes.push(novaTransacao);
  atualizarDashboard();

  // Limpa os campos do formulário
  descricao.value = '';
  valor.value = '';
});

function atualizarDashboard() {
  listaTransacoes.innerHTML = '';

  let totalReceitas = 0;
  let totalDespesas = 0;

  transacoes.forEach(transacao => {
    const li = document.createElement('li');
    li.textContent = `${transacao.descricao}: ${formatarValor(transacao.valor)}`;
    li.classList.add(transacao.tipo === 'receita' ? 'receita' : 'despesa');

    // Cria botão de excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = '❌';
    btnExcluir.classList.add('btn-excluir');
    btnExcluir.onclick = () => excluirTransacao(transacao.id);

    li.appendChild(btnExcluir);
    listaTransacoes.appendChild(li);

    if (transacao.tipo === 'receita') {
      totalReceitas += transacao.valor;
    } else {
      totalDespesas += transacao.valor;
    }
  });

  const saldo = totalReceitas - totalDespesas;

  totalReceitasEl.textContent = `Receitas: ${formatarValor(totalReceitas)}`;
  totalDespesasEl.textContent = `Despesas: ${formatarValor(totalDespesas)}`;
  saldoEl.textContent = `Saldo: ${formatarValor(saldo)}`;

  salvarTransacoes(); //salva ao atualizar
}

function excluirTransacao(id) {
  transacoes = transacoes.filter(transacao => transacao.id !== id);
  atualizarDashboard();
}

function salvarTransacoes() {
  localStorage.setItem('transacoesFinanceiras', JSON.stringify(transacoes));
}

function carregarTransacoes() {
  const dadosSalvos = localStorage.getItem('transacoesFinanceiras');
  if (dadosSalvos) {
    transacoes = JSON.parse(dadosSalvos);
    atualizarDashboard();
  }
}

// Chamar a função ao iniciar
carregarTransacoes();