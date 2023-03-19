const { createApp } = Vue;
const url = "https://mh.up.railway.app/api/amazing-events?time=past";

createApp({
  data() {
    return {
      events: undefined,
      categories: undefined,
      eventsFiltrados : undefined,
      valorBusqueda : '',
      checked : [],
      /* evento: undefined, */
    };
  },
  created() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const fn = evento => evento.category;
          this.events = data.events.filter(fn);
          this.categories = [...new Set(this.events.map(fn)) ];
          this.categories.sort();
          this.eventsFiltrados = this.events;
          this.events.sort((a, b) => a.name.localeCompare(b.name));
          /* console.log(this.categories) */
      })
      .catch((err) => console.log(err));
  },
  methods: {
    filtro(){
      /* console.log('funciona') */
      this.eventsFiltrados = this.events.filter( evento => 
        (this.checked.includes(evento.category) || this.checked.length === 0) 
        && evento.name.toLowerCase().includes(this.valorBusqueda.toLowerCase()));
        if (this.eventsFiltrados.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'No matches found',
            text: 'Please try another search',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.eventsFiltrados = this.events;
              this.valorBusqueda = '';
              this.checked = [];
            }
          });
    }
    }},
  computed: {},
}).mount("#cards");