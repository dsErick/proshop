<template>
<div id="product-details" class="container-lg container-fluid">
    <h2 class="mb-4">
        <router-link :to="{ name: 'admin.products.index' }" class="text-secondary">
            Products
        </router-link>
        <span class="text-muted">/</span>
        {{ product._id }}
    </h2>

    <v-alert v-if="success" class="mb-4" type="alert-success">
        Product updated
    </v-alert>

    <v-loader v-if="isLoading" />
    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>

    <form @submit.prevent="updateProduct(product)">
        <v-form-input
            v-model="product.name"
            inputId="name"
            label="Name"
            autofocus
            :errors="error.errors ? error.errors.name : undefined"
        />

        <!-- image -->

        <div class="grid">
            <v-form-input
                v-model="product.brand"
                inputId="brand"
                label="Brand"
                :errors="error.errors ? error.errors.brand : undefined"
            />

            <v-form-input
                v-model="product.price"
                inputId="price"
                label="Price"
                type="number"
                :step="0.01"
                :errors="error.errors ? error.errors.price : undefined"
            />
        </div>

        <div class="grid">
            <v-form-input
                v-model="product.category"
                inputId="category"
                label="Category"
                :errors="error.errors ? error.errors.category : undefined"
            />

            <v-form-input
                v-model="product.countInStock"
                inputId="countInStock"
                label="Count in Stock"
                type="number"
                :errors="error.errors ? error.errors.countInStock : undefined"
            />
        </div>

        <v-form-textarea
            v-model="product.description"
            inputId="description"
            label="Description"
            :errors="error.errors ? error.errors.description : undefined"
        />
        
        <div class="col-lg-4 col-md-6 col-sm-8 col-12 mx-auto mt-4 p-0">
            <button type="submit" class="btn btn-dark btn-block">
                Update
            </button>
        </div>
    </form>
</div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import useProducts from '@/composables/useProducts'
import VFormInput from '@/components/VFormInput'
import VFormTextarea from '@/components/VFormTextarea'

export default {
    name: 'Product Details',
    components: {
        VFormInput,
        VFormTextarea,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { success, product, setProduct, updateProduct, isLoading, error } = useProducts()

        setProduct()

        return {
            success,
            product: ref(product.value),
            updateProduct,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
#product-details {
    form .grid {
        display: grid;
        grid-template-columns: 9fr 3fr;
        grid-gap: 1rem;
    }
}

@media (max-width: 767px) {
    #product-details {
        form .grid {
            grid-template-columns: 8fr 4fr;
        }
    }
}

@media (max-width: 575px) {
    #product-details {
        form .grid {
            grid-template-columns: 1fr;
            grid-gap: 0;
        }
    }
}
</style>
