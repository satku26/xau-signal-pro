async function loadPrice() {
    try {
        const url = `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=5min&outputsize=1&apikey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.status === "error") {
            document.getElementById("price").innerHTML = data.message;
            return;
        }

        document.getElementById("price").innerHTML =
            "$ " + data.values[0].close;

    } catch (err) {
        document.getElementById("price").innerHTML = err.message;
    }
}

loadPrice();