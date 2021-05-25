/**
 * El codigo anterior define un componente pokemon con diferentes divs para simular 
 * la anatomía 'estilo lego' de un pokemon.
 */

Vue.component('pokemon', {
    template: `
        <div class="pokemon">
            <div class="pokemon-head"></div>
            <div class="pokemon-body"></div>
            <div class="pokemon-feet"></div>
        </div>
    `
});

const app = new Vue({
    el: '#app',

    data: {
        // definir dos jugadores
        player1: { pokemon: {}, winner: false },
        player2: { pokemon: {}, winner: false },

        // un listado de pokemons
        pokemons: [
            { id: 0, name: 'pikachu', type: 'electro' },
            { id: 1, name: 'bulvasaur', type: 'planta' },
            { id: 2, name: 'squirtle', type: 'agua' },
            { id: 3, name: 'charmander', type: 'fuego' }
        ],

        /**
         * Una tabla de resultados posibles donde x e y indican quien ganaria entre los pokemons 
         * seleccionados por ambos jugadores
         */
        results: [
            [0, 2, 1, 0],
            [1, 0, 2, 2],
            [2, 1, 0, 1],
            [0, 1, 2, 0],
        ]
    },
    methods: {
        /**
         * El metodo fight obtiene el id de ambos jugadores y busca la posicion en la tabla de resultados. 
         * Dependiendo del resultado dado, se indica el jugador que ha ganado.
         */
        fight: function () {
            const result = this.results[this.player1.pokemon.id][this.player2.pokemon.id];

            const selectWinner = [
                () => { this.player1.winner = true; this.player2.winner = true; },
            // empate

                () => { this.player1.winner = true; this.player2.winner = false; },
            // gana jugador 1

                () => { this.player1.winner = false; this.player2.winner = true; }
            // gana jugador 2
            ];
            
            selectWinner[result]();
        },

        /**
         * El metodo resetWinner nos permite reiniciar la partida para empezar una nueva.
         */
        resetWinner: function () {
            this.player1.winner = false;
            this.player2.winner = false;
        }
    }
});