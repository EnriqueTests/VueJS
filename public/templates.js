/**
 * TEMPLATES.HTML
 */
const app = new Vue({
    el: '#app',

    data: {
        user: { name: null, password: null },
        urlPasswordChange: 'http://localhost:8080',
        errors: []
    },

    computed: {
        isFormEmpty: function () {
            return !(this.user.name && this.user.password);
        }
    },

    methods: {
        onLogin: function () {
            this.errors = [];

            if (this.user.name.length < 6) {
                this.errors.push('El nombre de usuario tiene que tener al menos 6 caracteres');
            }

            if (this.user.password.length < 6) {
                this.errors.push('La contraseña tiene que tener al menos 6 caracteres');
            }
        }
    },

    filters: {
        uppercase: function (data) {
            return data && data.toUpperCase();
        }
    }
});