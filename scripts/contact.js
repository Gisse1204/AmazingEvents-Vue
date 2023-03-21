const { createApp } = Vue;

createApp({
    data() {
        return {
            name: '',
            email: '',
            message: '',
        }
    },

    methods: {
        EnviarFormulario() {
            try {
                if (this.name && this.email && this.message) {
                    console.log('Name:', this.name);
                    console.log('Email:', this.email);
                    console.log('Message:', this.message);
                    swal({
                        title: "Message sent successfully!",
                        icon: "success",
                        text: `Name: ${this.name}\nEmail: ${this.email}\nMessage: ${this.message}`
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    throw new Error("Please fill in all fields");
                }
            } catch (error) {
                swal({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                });
            }
        }
    }
})

.mount("#app");