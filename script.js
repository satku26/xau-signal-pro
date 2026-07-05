function calculateEMA(prices, period) {
    const multiplier = 2 / (period + 1);

    let ema = prices[0];

    for (let i = 1; i < prices.length; i++
        ema = ((prices[i] - ema) * multiplier) + ema;
    }

    return ema;
}

async function loadPrice() {
    try {
        const url = `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=5min&outputsize=100&apikey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.values) {
            document.getElementById("price").innerHTML = "Data gagal";
            return;
        }

        const prices = data.values
            .map(item => parseFloat(item.close))
            .reverse();

        const price = prices[prices.length - 1];

        const ema20 = calculateEMA(prices, 20);
        const ema50 = calculateEMA(prices, 50);

        document.getElementById("price").innerHTML = "$ " + price.toFixed(2);
        document.getElementById("ema20").innerHTML = ema20.toFixed(2);
        document.getElementById("ema50").innerHTML = ema50.toFixed(2);

        let signal = "WAIT";

        if (ema20 > ema50)
            signal = "BUY";
        else if (ema20 < ema50)
            signal = "SELL";

        document.getElementById("signal").innerHTML = signal;

    } catch (err) {
        document.getElementById("price").innerHTML = err.message;
    }
}

loadPrice();
setInterval(loadPrice, 60000);