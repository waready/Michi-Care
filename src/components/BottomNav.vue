<template>
    <nav class="bottom-nav">
        <!-- Home con ruta exacta "/" -->
        <router-link to="/" class="nav-item" exact exact-active-class="active">
            <i class="pi pi-home" />
            <span>Home</span>
        </router-link>

        <!-- Resto de ítems -->
        <router-link v-for="item in otherItems" :key="item.to" :to="item.to" class="nav-item"
            exact-active-class="active">
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'BottomNav',
    data() {
        return {
            otherItems: [
                { label: 'Calendario', to: '/calendar', icon: 'pi pi-calendar' },
                { label: 'Tips', to: '/tips', icon: 'pi pi-heart' },
                { label: 'Chat', to: '/chat', icon: 'pi pi-comments' }
            ]
        }
    }
}
</script>

<style scoped>
.bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
    z-index: 999;
}

.nav-item {
    text-align: center;
    text-decoration: none;
    color: #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    flex: 1;
    transition: color 0.2s ease;
}

.nav-item i {
    font-size: 1.4rem;
}

.nav-item.active {
    color: #007ad9;
}

.nav-item.active i {
    color: #007ad9;
}
</style>
