<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1 v-text="titulo"></h1>
    <hr />
    <!-- <p><label v-text="ocupado"></label></p> -->
    <p>
      <label v-text="ocupado"></label
      ><input type="button" value="Cambiar  estado" @click="modificarOcupado" />
    </p>
    <p>{{ this.$store.state.ocupado }}</p>

    <p><label v-text="totalVentas"></label></p>
    <hr />
    <h1>Productos Disponibles</h1>
    <!-- <ul>
      <li v-for="(producto, clave) in productosConStock" :key="clave">
        <label v-text="producto.nombre"></label>
      </li>
    </ul> -->
    <ul>
      <li v-for="(producto, clave) in productosConStock" :key="clave">
        <label>{{ producto.nombre }} | stock: {{ producto.stock }} | </label>
        <input type="button" value="+" @click="agregarStock(producto)" />
        <input type="button" value="-" @click="disminuirStock(producto)" />
        <input type="button" value="Vender" @click="vender(producto)" />
      </li>
    </ul>

    <!-- <p>{{this.$store.getters.productosConStock}}</p> -->
    <hr />
    <h1>Productos Baratos Disponibles</h1>
    <ul>
      <li v-for="(producto, clave) in productosBaratosDisponibles" :key="clave">
        <label v-text="producto.nombre"></label>
      </li>
    </ul>
    <hr />
    <h1>Búsqueda de productos disponibles</h1>
    <input type="text" v-model="busquedaPorId" />
    <ul v-if="productoDisponiblePorId.length > 0">
      <li v-for="(producto, clave) in productoDisponiblePorId" :key="clave">
        <label v-text="producto.nombre"></label>
      </li>
    </ul>
    <ul v-else>
      <li><label>...</label></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return { busquedaPorId: "" };
  },
  // computed: {
  //   ocupado() {
  //     console.log(this.$store.state.ocupado);
  //     let ocupado = this.$store.state.ocupado ? "Ocupado" : "Disponible";
  //     return `Estado: ${ocupado}`;
  //   },
  //   totalVentas() {
  //     console.log(this.$store.state.totalVentas);
  //     return `Total: $${this.$store.state.totalVentas}`;
  //   },
  // },

  // computed: mapState({
  //   ocupado: (state) => {
  //     let ocupado = state.ocupado ? "Ocupado" : "Disponible"
  //     return `Estado: ${ocupado}`
  //   },
  //   totalVentas: (state) => {
  //     return `Total: $${state.totalVentas}`;
  //   },
  // }),

  computed: {
    titulo() {
      return "Mi Almacen Web";
    },
    // productosConStock() {
    //   return this.$store.getters.productosConStock;
    // },
    // productosBaratosDisponibles() {
    //   return this.$store.getters.productosBaratosDisponibles;
    // },
    productoDisponiblePorId() {
      return this.$store.getters.productoDisponiblePorId(this.busquedaPorId);
    },
    ...mapGetters(["productosConStock", "productosBaratosDisponibles"]),
    ...mapState({
      ocupado: (state) => {
        return state.ocupado ? "Ocupado" : "Disponible";
      },
      totalVentas: (state) => {
        return `Total: $${state.totalVentas}`;
      },
    }),
  },

  methods: {
    // modificarOcupado() {
    //   this.$store.commit("modificarOcupado");
    // },
    // agregarStock(producto) {
    //   this.$store.commit("agregarStock", producto);
    // },
    // disminuirStock(producto) {
    //   this.$store.commit("disminuirStock", producto);
    // },
    ...mapMutations(["modificarOcupado", "agregarStock", "disminuirStock"]),
    modificarOcupado() {
      this.$store.dispatch("modificarOcupado");
    },
    vender(producto) {
      this.$store.dispatch("vender", producto);
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
