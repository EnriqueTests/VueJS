/**
 * Subcomponente para el componente course
 */
const courseHeader = {
    props: {
        image: { type: String, required: true },
        title: { type: String, required: true }
    },
    template: `
        <header class="course-header" v-once>
            <img :src="image" :alt="title">
            <h2>{{ title }}</h2>
        </header>
    `
};

/**
 * Subcomponente para el componente course
 */
const courseContent = {
    props: {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, required: true }
    },
    template: `
        <main class="course-content">
            <img src="http://lorempixel.com/300/150/" :alt="title">
            <section>
                <h3>{{ title }}</h3>
                <h4>{{ subtitle }}</h4>
                <p> {{ description }}</p>
            </section>
        </main>
    `
};

/**
 * Subcomponente para el componente course
 */
const courseFooter = {
    props: {
        months: { type: Number, required: true }
    },
    template: `
        <footer class="course-footer">
            <label for="meses">MESES</label>
            <input id="meses" type="number" min="0" max="12" v-model="months" />
            <button @click="add">AÑADIR</button>
        </footer>
    `,
    methods: {
        add: function () {
            this.$emit('add', this.months );
        }
    },
};

/*
 * Componente base para los demas cursos
 * Emitira un evento de tipo add con un objeto que contiene los datos del curso y los meses que se quiere cursar
 */
const course = {
    props: {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, required: true }
    },
    components: {
        'course-header': courseHeader,
        'course-content': courseContent,
        'course-footer': courseFooter
    },
    data: function () {
        return {
            months: 0,
            styleClass: null,
            header: {
                title: 'Course default',
                image: 'http://lorempixel.com/64/64/'
            }
        }
    },
    template: `
        <div :class="['course', styleClass]">
            <course-header :title="header.title" :image="header.image"></course-header>
            <course-content :title="title" :subtitle="subtitle" :description="description"></course-content>
            <course-footer :months="months" @add="add"></course-footer>
        </div>
    `,
    methods: {
        add: function (months) {
            this.$emit('add', { title: this.title, months: months });
        }
    }
};

/*
 * Componente que se puede utilizar en cualquier parte 
 * Hereda del componente course por medio de mixins
 */
Vue.component('course-js', {
    mixins: [course],
    data: function () {
        return {
            styleClass: 'course-js',
            header: {
                title: 'Curse JS',
                image: 'http://lorempixel.com/64/64/'
            }
        }
    },
});

/*
 * Componente que se puede utilizar en cualquier parte
 * Hereda del componente course por medio de mixins
 */
Vue.component('course-css', {
    mixins: [course],
    data: function () {
        return {
            styleClass: 'course-css',
            header: {
                title: 'Curso CSS',
                image: 'http://lorempixel.com/64/64/'
            }
        }
    },
});

/*
 * Componente que se puede utilizar en cualquier parte
 * Se utiliza para pintar en pantalla los otros componentes
 */
Vue.component('marketplace', {
    template: `
        <div class="marketplace">
            <slot></slot>
        </div>
    `
});

/**
 * Aqui se prepara todo lo que se muestra en el archivo HTML
 */
const app = new Vue({
    el: '#app',
    data: {
    courses: [
        {
            id: 1,
            title: 'Curso introductorio JavaScript',
            subtitle: 'Aprende lo básico en JS',
            description: 'En este curso explicaremos de la mano de los mejores profesores JS los principios básicos',
            type: 'course-js'
        },
        {
            id: 2,
            title: 'Curso avanzado JavaScript',
            subtitle: 'Aprende lo avanzado en JS',
            description: 'En este curso explicaremos de la mano de los mejores profesores JS los principios avanzados',
            type: 'course-js'
        },
        {
            id: 3,
            title: 'Curso introductorio Cascading Style Sheets',
            subtitle: 'Aprende lo básico en CSS',
            description: 'En este curso explicaremos de la mano de los mejores profesores CSS los principios básicos',
            type: 'course-css'
        }
    ],
    cart: []
    },
    methods: {
        addToCart: function (course) {
            this.cart.push(course);
        }
    }
});