document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const linhas = event.target.result.split('\n').filter(l => l.trim() !== '');

        let receitas = 0;
        let despesas = 0;

        // Lê cada linha do CSV
        linhas.forEach(linha => {
            const [descricao, valorStr] = linha.split(',');
            const valor = parseFloat(valorStr);

            if (!isNaN(valor)) {
                if (valor > 0) receitas += valor;
                else despesas += valor;
            }
        });

        // Atualiza cards
        document.getElementById('receitas').textContent = formatarMoeda(receitas);
        document.getElementById('despesas').textContent = formatarMoeda(Math.abs(despesas));
        document.getElementById('saldo').textContent = formatarMoeda(receitas + despesas);

        // Atualiza gráfico
        gerarGrafico(receitas, Math.abs(despesas), receitas + despesas);
    };

    reader.readAsText(file);
});

// Função para formatar valores como moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para criar gráfico
let chart;
function gerarGrafico(receitas, despesas, saldo) {
    const ctx = document.getElementById('graficoFinanceiro').getContext('2d');

    if (chart) {
        chart.destroy(); // Evita sobreposição de gráficos
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Receitas', 'Despesas', 'Saldo'],
            datasets: [{
                data: [receitas, despesas, saldo],
                backgroundColor: ['#27ae60', '#e74c3c', '#2980b9']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatarMoeda(context.raw);
                        }
                    }
                }
            }
        }
    });
}