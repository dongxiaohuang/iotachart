$("document").ready(function() {
  let date_label = [];
  let close_price = [];
  $.get("https://min-api.cryptocompare.com/data/histoday?fsym=IOT&tsym=GBP&limit=60&aggregate=3&e=CCCAGG", function(data, status) {
      data = data["Data"];
      for (var i = 0; i < data.length; i++) {
        //get date
        unix_tm = data[i].time;
        var dt = new Date(unix_tm * 1000);
        var date = dt.getDate();
        var month = dt.getMonth();
        var year = dt.getFullYear();
        var time = year + '/' + month + '/' + date;
        date_label.push(time)
        // get close price
        price = data[i].close;
        close_price.push(price);
      }
    })
    .done(function() {
      var ctx = $("#priceChart");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: date_label,
          datasets: [{
            data: close_price,
            label: "price(GBP)",
            borderColor: "#3e95cd",
            fill: false
          }]
        }
      });
    });
});
