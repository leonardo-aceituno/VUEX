import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        ocupado: false,
        totalVentas: 0,
        productos: [{
            id: '0001',
            nombre: 'Agua sin gas',
            stock: 30,
            precio: 670
        }, {
            id: '0002',
            nombre: 'Leche extra proteína',
            stock: 25,
            precio: 1190
        }, {
            id: '0003',
            nombre: 'Huevos Docena',
            stock: 10,
            precio: 1590
        }, {
            id: '0004',
            nombre: 'Pan marraqueta integral 1kg',
            stock: 100,
            precio: 990
        }, {
            id: '0005',
            nombre: 'Avena multisemillas',
            stock: 0,
            precio: 1390
        }, ]
    },

    getters: {
        productosConStock: state => {
            return state.productos.filter((producto) => {
                return producto.stock > 0
            })
        },
        productosBaratosDisponibles: (state, getters) => {
            return getters.productosConStock.filter((producto) => {
                return producto.precio < 1000
            })
        },
        productoDisponiblePorId: (state, getters) => (id) => {
            return getters.productosConStock.filter((producto) => {
                return producto.id == id
            })
        }
    },

    // mutacion = modificacion de estados
    mutations: {
        modificarOcupado: (state) => {
            state.ocupado = !state.ocupado
        },
        agregarStock: (state, producto) => {
            state.productos.map((p) => {
                if (p.id == producto.id) p.stock++
            })
        },
        disminuirStock: (state, producto) => {
            state.productos.map((p) => {
                if (p.id == producto.id) p.stock--
            })
        },
        venderProducto(state, producto) {
            state.productos.forEach((p) => {
                if (p.id == producto.id && p.stock > 0) {
                    p.stock--
                }
            })
        },
        actualizarTotal(state, producto) {
            state.totalVentas += producto.precio
        }
    },


    // LasActionsson,enesencia,funcionesmuyparecidasalasmutations,conlaexcepción que están destinadas para realizar operaciones asíncronas y ejecutar mutations.
    actions: {
        // modificarOcupado(context) {
        //     context.commit('modificarOcupado')
        // }
        modificarOcupado({
            commit
        }) {
            commit('modificarOcupado')
        },

        simularOcupado({
            commit
        }) {
            commit('modificarOcupado')
        },

        // eslint-disable-next-line no-unused-vars
        async vender({commit, state, dispatch}, producto) {
            await  dispatch('procesarVenta', producto).then(() => {
                alert('Venta procesada exitosamente')
            }).catch(() => {
                alert('Venta rechazada. No hay stock o el producto no existe')
            })
            dispatch('actualizarTotal', producto)
        },

        async procesarVenta({commit,state}, producto) {
            return new Promise((resolve, reject) => {
                let tiempoEjecucion = Math.floor((Math.random() * 5000) + 1)
                setTimeout(() => {
                    let resultado = false
                    state.productos.forEach((p) => {
                        if (p.id == producto.id && p.stock > 0) {
                            commit('venderProducto', producto)
                            resultado = true
                        }
                    })
                    if (resultado) resolve()
                    else reject()
                }, tiempoEjecucion);
            })
        },

        actualizarTotal({commit}, producto) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                let tiempoEjecucion = Math.floor((Math.random() * 3000) + 1)
                setTimeout(() => {
                    commit('actualizarTotal', producto)
                }, tiempoEjecucion);
            })
        }
    }





}) 
export default store