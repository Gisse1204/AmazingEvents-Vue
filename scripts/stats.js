async function printTabla1() {
  try {
    let urlApi = "https://mh.up.railway.app/api/amazing-events?time=past";
    let fetchResponse = await fetch(urlApi);
    let response = await fetchResponse.json();
    let arrayEventos = response.events;

    arrayEventos = arrayEventos.sort((e1, e2) => e1.assistance - e2.assistance)
    document.getElementById("highest").innerHTML = arrayEventos[arrayEventos.length - 1].name;
    document.getElementById("highestValue").innerHTML = arrayEventos[arrayEventos.length - 1].assistance.toLocaleString();
    document.getElementById("lowest").innerHTML = arrayEventos[0].name;
    document.getElementById("lowestValue").innerHTML = arrayEventos[0].assistance.toLocaleString();

    arrayEventos = arrayEventos.sort((e1, e2) => e1.capacity - e2.capacity)
    document.getElementById("capacidad").innerHTML = arrayEventos[arrayEventos.length - 1].name;
    document.getElementById("capacidadValue").innerHTML = arrayEventos[arrayEventos.length - 1].capacity.toLocaleString();
  } catch (error) {
    console.error(error);
  }
}

async function printTabla2() {
  try {
    let urlApi = "https://mh.up.railway.app/api/amazing-events?time=upcoming";
    let response = await fetch(urlApi).then(res => res.json());
    let arrayEventos = response.events;
    let categorias = [...new Set(arrayEventos.map(evento => evento.category))];
    categorias = categorias.sort();
    arrayEventos.forEach(evento => evento.ganancia = evento.estimate * evento.price);
    let datos2 = categorias.map(category => {
      let eventosFiltro = arrayEventos.filter(evento => evento.category === category);
      let ganancia = eventosFiltro.reduce((acum, evento) => acum + evento.ganancia, 0);
      let asistenciat = eventosFiltro.reduce((acum, evento) => acum + evento.estimate, 0);
      let capitalt = eventosFiltro.reduce((acum, evento) => acum + evento.capacity, 0);
      let gananciaFormateada = ganancia.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      let porcentaje = (asistenciat / capitalt * 100).toFixed(2);
      return `<tr class="d-flex justify-content-center text-center" style="font-weight: bold;">
              <td>${category}</td>
              <td>$${gananciaFormateada}</td>
              <td>${porcentaje}%</td>
            </tr>`;
    });

    document.getElementById("tabla2").innerHTML += datos2.join("");
  } catch (error) {
    console.error(error);
  }
}

async function printTabla3() {
  try {
    let urlApi = "https://mh.up.railway.app/api/amazing-events?time=past";
    let response = await fetch(urlApi).then(res => res.json());
    let arrayEventos = response.events;
    let categorias = [...new Set(arrayEventos.map(evento => evento.category))];
    categorias = categorias.sort(); // Ordenar alfabéticamente
    arrayEventos.forEach(evento => evento.ganancia = evento.assistance * evento.price);
    let datos3 = categorias.map(category => {
      let eventosFiltro = arrayEventos.filter(evento => evento.category === category);
      let ganancia = eventosFiltro.reduce((acum, evento) => acum + evento.ganancia, 0);
      let asistenciat = eventosFiltro.reduce((acum, evento) => acum + evento.assistance, 0);
      let capitalt = eventosFiltro.reduce((acum, evento) => acum + evento.capacity, 0);
      let gananciaFormateada = ganancia.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      let porcentaje = (asistenciat / capitalt * 100).toFixed(2);
      return `<tr class="d-flex justify-content-center text-center" style="font-weight: bold;">
              <td>${category}</td>
              <td>$${gananciaFormateada}</td>
              <td>${porcentaje}%</td>
            </tr>`;
    });

    document.getElementById("tabla3").innerHTML += datos3.join("");
  } catch (error) {
    console.error(error);
  }
}

printTabla1();
printTabla2();
printTabla3();