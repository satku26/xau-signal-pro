async function loadPrice() {
    const url =
        `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=5min&outputsize=60&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values) {
            document.getElementById("price").innerHTML = "Gagal mengambil data";
            return;
        }

        const price = data.values[0].close;

        document.getElementById("price").innerHTML = price;

    } catch (e) {
        document.getElementById("price").innerHTML = "Error";
    }
}

loadPrice();
setInterval(loadPrice,60000);