<template>
<div id="products" class="container-lg container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="mb-0">Products</h2>

        <button class="btn btn-secondary btn-sm">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-1" />
            Create product
        </button>
    </div>

    <v-loader v-if="isLoading" />
    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>

    <div class="table-responsive" v-else>
        <table class="table table-hover table-sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th class="min-width">Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Qty</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product._id">
                    <td>{{ product._id }}</td>
                    <td>{{ product.name }}</td>
                    <td>
                        {{
                            new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(product.price)
                        }}
                    </td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.brand }}</td>
                    <td>{{ product.countInStock }}</td>
                    <td>
                        <div class="btn-group dropleft">
                            <button type="button" class="btn py-0 px-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
                            </button>

                            <div class="dropdown-menu">
                                <h6 class="dropdown-header">{{ product.name }}</h6>
                                <router-link :to="`/admin/products/${product._id}`" class="dropdown-item">
                                    <font-awesome-icon :icon="['fas', 'edit']" class="mr-2" /> Edit
                                </router-link>

                                <button class="dropdown-item" @click.prevent="deleteProduct(product._id)">
                                    <font-awesome-icon :icon="['fas', 'trash']" class="mr-2" /> Remove
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useProducts from '@/composables/useProducts'

export default {
    name: 'Products',
    components: {
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { products, setProducts, deleteProduct, isLoading, error } = useProducts()

        setProducts()

        return {
            products,
            deleteProduct,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
table {
    thead tr th,
    tbody tr td {
        text-align: center;
        vertical-align: middle;

        .btn-group.dropleft {
            > .btn { font-size: 1.4em }
            
            .dropdown-menu {
                max-width: 14rem;

                .dropdown-header,
                .dropdown-item {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

    }
}

@media (max-width: 767px) {
    table thead tr th.min-width {
        min-width: 12rem
    }
}
</style>
