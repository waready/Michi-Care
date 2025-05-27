<template>
    <div class="app-wrapper">
        <router-view />
        <BottomNav />
    </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'
export default {
    components: { BottomNav }
}
</script>

<style scoped>
.app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 60px;
    /* espacio para la barra */
    box-sizing: border-box;
}
</style>
