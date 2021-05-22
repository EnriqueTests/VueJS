/**
 * INDEX.HTML
 */

/**
 * El elemento input tiene una directiva v-model que nos va a permitir ir 
 * obteniendo el valor del input e ir incluyéndolo en la variable titleGame.
 * 
 * El elemento button tiene una directiva @click que lo que nos permite 
 * es registrar una función cuando se genere el evento clic sobre el botón.
 * 
 * El elemento data se inicializa
 * 
 * La función emitNewGame se encarga de ver si el input se encuentra vacío y 
 * emitir un evento hacia componentes padres con el nuevo título del juego.
 */
Vue.component('game-add', {
    template: `
        <div>
            <input type="text" v-model="titleGame" />
            <button @click="emitNewGame">Añadir</button>
        </div>
    `,

    data: function () {
        return {
            titleGame: null
        }
    },

    methods: {
        emitNewGame: function () {
            if (this.titleGame) {
                this.$emit('new', { title: this.titleGame });
                this.titleGame = null;
            }
        }
    },
});

/**
 * El componente game-list recibe un modelo como propiedad. Se trata del listado 
 * de juegos a mostrar. En el template vemos la directiva v-for encargado de 
 * iterar los juegos e ir pintando diferentes componentes game-item.
 */
Vue.component('game-list', {
    props: ['games'],

    template: `
        <ol>
            <game-item v-for="item in games" :game="item" :key="item.id"></game-item>
        </ol>
    `
});

/**
 * El componente game-item recibe un modelo y lo pinta. El sistema es reactivo, 
 * es decir que si yo inserto un nuevo elemento en el array de juegos, VueJS es 
 * lo suficientemente inteligente para saber que tiene que renderizar los 
 * elementos precisos.
 */
Vue.component('game-item', {
    props: ['game'],

    template: '<li>{{ game.title }}</li>'
});

/**
 * Plantilla de la cabecera o titulo
 */
Vue.component('game-header', {
    template: '<h1>Video Games</h1>'
});

/**
 * Instancia creada para nuestra aplicacion
 */
const app = new Vue({
    el: '#app',

    /**
     * Plantilla de mi aplicacion
     * Tiene que comenzar con div
     * game-header: cabecera o titulo
     * game-add: agregar game
     * game-list: lista de los games
     */
    template: `
        <div class="view">
            <game-header></game-header>
            <game-add @new="addNewGame"></game-add>
            <game-list v-bind:games="games"></game-list>
        </div>
    `,

    /**
     * Datos de games ligados a game-list en template
     */
    data: {
        games: [
            { title: 'ME: Andromeda' },
            { title: 'Fifa 2017' },
            { title: 'League of Legend' }
        ]
    },
    
    /**
     * Agrega un game por medio de game-add en template
     */
    methods: {
        addNewGame: function (game) {
            this.games.push(game);
        }
    }
});