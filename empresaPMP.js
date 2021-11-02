let btn = document.getElementById("button");
let datos = document.getElementById("datosFIFO");
let textContent = "";

btn.addEventListener("click", function () {
  textContent = datos.value;
  textContent = textContent.split(/\n|,/);
  let table = document.getElementById("tabla");
  let len = 5;

  while (len > 0) {
    table.innerHTML += `
        <tr>
            <td > </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
        </tr>

    `;
    len--;
  }

  let tds = document.querySelectorAll("#tabla td");

  for (i in tds) {
    tds[i].id = "id" + i;
  }

  len = textContent.length / 4;
  let first = document.querySelectorAll("tr td:first-child");
  let second = document.querySelectorAll("tr td:nth-child(2");
  let third = document.querySelectorAll("tr td:nth-child(3");
  let fourth = document.querySelectorAll("tr td:nth-child(4");
  let fifth = document.querySelectorAll("tr td:nth-child(5");
  let sixth = document.querySelectorAll("tr td:nth-child(6");
  let seventh = document.querySelectorAll("tr td:nth-child(7");
  let eighth = document.querySelectorAll("tr td:nth-child(8");
  let ninth = document.querySelectorAll("tr td:nth-child(9");
  let tenth = document.querySelectorAll("tr td:nth-child(10");
  let eleventh = document.querySelectorAll("tr td:nth-child(11");

  let fecha = [];
  for (i in textContent) {
    if (i % 4 == 0) {
      fecha.push(textContent[i]);
    }
  }

  let procedencia = [];
  for (i in textContent) {
    if ((i - 1) % 4 == 0) {
      procedencia.push(textContent[i]);
    }
  }

  let cantidad = [];
  for (i in textContent) {
    if ((i - 2) % 4 == 0) {
      cantidad.push(textContent[i]);
    }
  }

  let precio = [];
  for (i in textContent) {
    if ((i - 3) % 4 == 0) {
      precio.push(textContent[i]);
    }
  }

  for (i in first) {
    first[i].innerHTML = fecha[i];
    second[i].innerHTML = procedencia[i];
    if (procedencia[i] == "existencia") {
      var canE = (ninth[i].innerHTML = cantidad[i]);
      var precioE = (tenth[i].innerHTML = precio[i]);
      var valorE = (eleventh[i].innerHTML = canE * precioE);
    } else if (
      procedencia[i] == "compra" ||
      procedencia[i] == "devolucion"
    ) {
      third[i].innerHTML = cantidad[i];
      fourth[i].innerHTML = precio[i];
      fifth[i].innerHTML = cantidad[i] * precio[i];
    } else if (procedencia[i] == "venta" || procedencia[i] == "perdida") {
      sixth[i].innerHTML = cantidad[i]; //6
      seventh[i].innerHTML = precio[i]; //7
    }
  }
  for (i = 12; i < tds.length; i = i + 11) {
    if (tds[i].innerHTML == "compra") {
      // document.querySelector("td" + i + 7).innerHTML =
      // document.querySelector("td" + i - 4).innerHTML + "";
      // console.log(document.querySelector("#id" + i + 7));
      var x = +i + 7;
      var y = +i - 4;
      var cantidadCompra = document.querySelector("#id" + x);
      var cantidadCompraAntigua = document.querySelector(
        "#id" + y
      ).innerHTML;

      // console.log(+tds[i + 1].innerHTML + +cantidadCompraAntigua); // price of compra eg: compra | 480

      cantidadCompra.innerHTML =
        +tds[i + 1].innerHTML + +cantidadCompraAntigua;

      var precioCompra = document.querySelector("#id" + (x + 1));
      // precioCompra.innerHTML =

      precioCompra.innerHTML =
        (+tds[i - 2].innerHTML + +tds[i + 3].innerHTML) /
        cantidadCompra.innerHTML;

      var valorCompra = cantidadCompra.innerHTML * precioCompra.innerHTML;
      tds[x + 2].innerHTML = valorCompra;
    } else if (
      tds[i].innerHTML == "venta" ||
      tds[i].innerHTML == "perdida"
    ) {
      var x = +i + 7;
      var y = +i - 4;
      var cantidadVenta = document.querySelector("#id" + x);
      var cantidadVentaAntigua = document.querySelector(
        "#id" + y
      ).innerHTML;

      cantidadVenta.innerHTML = cantidadVentaAntigua - tds[i + 4].innerHTML;

      var precioVenta = document.querySelector("#id" + (x + 1));
      precioVenta.innerHTML = tds[i - 3].innerHTML;
      document.querySelector("#id" + (i + 5)).innerHTML =
        precioVenta.innerHTML;

      var valorVenta = document.querySelector("#id" + (x + 2));
      valorVenta.innerHTML =
        precioVenta.innerHTML * cantidadVenta.innerHTML;
    } else if (tds[i].innerHTML == "devolucion") {
      tds[i + 2].innerHTML = tds[i - 3].innerHTML;
      tds[i + 7].innerHTML = +tds[i - 4].innerHTML + +tds[i + 1].innerHTML;
      tds[i + 3].innerHTML = tds[i + 1].innerHTML * tds[i + 2].innerHTML;
      tds[i + 8].innerHTML = tds[i + 2].innerHTML;
      tds[i + 9].innerHTML = tds[i + 7].innerHTML * tds[i + 8].innerHTML;
    }
  }
});