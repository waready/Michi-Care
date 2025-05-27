<template>
    <div class="tips-container">
        <!-- Encabezado estilo iOS -->
        <header class="tips-header">
            <span class="tips-title">Consejos de Alimentación</span>
        </header>

        <!-- Lista de tips -->
        <main class="tips-list">
            <div v-for="(tip, index) in tips" :key="index" class="tip-card" :style="{ backgroundColor: tip.bg }">
                <div class="tip-icon">
                    <i :class="tip.icon" />
                </div>
                <div class="tip-content">
                    <h4 class="tip-title">{{ tip.title }}</h4>
                    <p class="tip-desc">{{ tip.desc }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'TipsView',
    data() {
        return {
            tips: [
                {
                    title: 'Frutas frescas',
                    desc: 'Plátano, manzana, papaya o naranja te aportan vitaminas, fibra y energía saludable.',
                    icon: 'pi pi-apple',
                    bg: '#fff5ec' // melocotón suave
                },
                {
                    title: 'Verduras de hoja verde',
                    desc: 'Espinaca, acelga y brócoli son ricos en ácido fólico, vital para el bebé.',
                    icon: 'pi pi-leaf',
                    bg: '#edfdf3' // verde menta suave
                },
                {
                    title: 'Proteínas de calidad',
                    desc: 'Huevos, pescado cocido, carne magra y lentejas ayudan al desarrollo fetal.',
                    icon: 'pi pi-check-square',
                    bg: '#e8f4ff' // azul cielo suave
                },
                {
                    title: 'Lácteos diarios',
                    desc: 'Leche, yogur o queso bajos en sal proporcionan el calcio necesario.',
                    icon: 'pi pi-thumbs-up',
                    bg: '#f3f0ff' // lila pastel
                },
                {
                    title: 'Evita crudos',
                    desc: 'Nada de carne o huevos crudos: evitas bacterias peligrosas.',
                    icon: 'pi pi-ban',
                    bg: '#ffecec' // rojo rosado claro
                },
                {
                    title: 'Mantente hidratada',
                    desc: 'Bebe al menos 6–8 vasos de agua por día. También puedes tomar infusiones suaves.',
                    icon: 'pi pi-glass',
                    bg: '#ecfbff' // celeste suave
                }
            ]
        }
    }
}
</script>

<style scoped>
.tips-container {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding-bottom: 80px;
}

.tips-header {
    height: 55px;
    background-color: white;
    border-bottom: 1px solid #ddd;
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tips-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
}

.tips-list {
    padding: 1rem;
}

.tip-card {
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    transition: transform 0.2s ease;
}

.tip-card:hover {
    transform: translateY(-2px);
}

.tip-icon {
    font-size: 1.5rem;
    color: #007aff;
    margin-right: 1rem;
    flex-shrink: 0;
}

.tip-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
}

.tip-desc {
    margin: 0.2rem 0 0;
    font-size: 0.92rem;
    color: #555;
}

.tips-list {
    padding: 1rem;
    max-width: 500px;
    margin: 0 auto;
}
</style>
