const { createApp } = Vue;
const url = "https://mh.up.railway.app/api/amazing-events";

createApp({
  data() {
    return {
      events: [],
      evento: {},
    };
  },

  async created() {
    try {
      let id = new URLSearchParams(location.search).get("id");
      let response = await fetch(`${url}/${id}`);
      let data = await response.json();
      let event = data.response;
      this.evento = event;
    } catch (error) {
      console.error(error);
    }
  },

  methods: {},
  computed: {},
})
.mount("#card");