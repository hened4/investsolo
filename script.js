function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateChart(dataLabels, dataValuesWithInterest, dataValuesWithoutInterest) {
    const ctx = document.getElementById('investmentChart').getContext('2d');

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [
                {
                    label: 'Total Investment',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: dataValuesWithInterest,
                    fill: false,
                },
                {
                    label: 'Total Contributions',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: dataValuesWithoutInterest,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: [{
                    type: 'linear',
                    position: 'bottom',
                }],
            },
        },
    });
}

function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const contribution = parseFloat(document.getElementById('contribution').value);
    const years = parseInt(document.getElementById('years').value);

    let totalWithInterest = principal;
    let totalWithoutInterest = principal;
    const dataLabels = [];
    const dataValuesWithInterest = [];
    const dataValuesWithoutInterest = [];

    for (let i = 0; i <= years; i++) {
        dataLabels.push(i);
        dataValuesWithInterest.push(totalWithInterest);
        dataValuesWithoutInterest.push(totalWithoutInterest);

        totalWithInterest += contribution * 12;
        totalWithInterest *= (1 + rate);

        totalWithoutInterest += contribution * 12;
    }

    updateChart(dataLabels, dataValuesWithInterest, dataValuesWithoutInterest);

    const chartCanvas = document.getElementById('investmentChart');
    chartCanvas.classList.remove('hidden');

    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block'; // Set the display to block after the calculation
    resultElement.innerHTML = `After ${years} years, your investment will be $${numberWithCommas(totalWithInterest.toFixed(2))}`;
}
function hideDisclaimer() {
    const disclaimer = document.getElementById('disclaimer');
    disclaimer.style.display = 'none';
}