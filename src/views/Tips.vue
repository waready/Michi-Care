<template>
  <div class="tips-container" @scroll.passive="handleScroll" ref="scrollContainer">
    <!-- Encabezado -->
    <header class="tips-header">
      <span class="tips-title">Consejos de Bienestar</span>
    </header>

    <!-- Chips de categoría -->
    <div class="category-filter">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['chip', { active: selectedCategory === cat }]"
        @click="selectCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Lista de tips -->
    <main class="tips-list">
      <div
        v-for="(tip, index) in visibleTips"
        :key="index"
        class="tip-card"
        :style="{ backgroundColor: tip.bg }"
      >
        <i :class="tip.icon" class="tip-icon" />
        <div class="tip-content">
          <h4 class="tip-title">{{ tip.title }}</h4>
          <p class="tip-desc">{{ tip.desc }}</p>
        </div>
      </div>

      <div v-if="loading" class="loading">Cargando más consejos...</div>
    </main>
  </div>
</template>

<script>
import allTips from '@/assets/data/tips.js'

export default {
  name: 'TipsView',
  data() {
    return {
      allTips,
      visibleTips: [],
      filteredTips: [],
      currentIndex: 0,
      tipsPerPage: 8,
      loading: false,
      selectedCategory: 'Todos',
      categories: [
        'Todos',
        'Frutas',
        'Proteínas',
        'Lácteos',
        'Líquidos',
        'Evitar',
        'Ejercicio',
        'Descanso',
        'Bienestar',
        'Carbohidratos'
      ]
    }
  },
  mounted() {
    this.applyFilter()
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
      this.applyFilter()
    },
    applyFilter() {
      this.visibleTips = []
      this.currentIndex = 0
      this.filteredTips =
        this.selectedCategory === 'Todos'
          ? this.allTips
          : this.allTips.filter(t => t.category === this.selectedCategory)
      this.loadMoreTips()
    },
    loadMoreTips() {
      if (this.loading || this.currentIndex >= this.filteredTips.length) return
      this.loading = true
      setTimeout(() => {
        const next = this.filteredTips.slice(this.currentIndex, this.currentIndex + this.tipsPerPage)
        this.visibleTips.push(...next)
        this.currentIndex += this.tipsPerPage
        this.loading = false
      }, 300)
    },
    handleScroll() {
      const el = this.$refs.scrollContainer
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
        this.loadMoreTips()
      }
    }
  }
}
</script>

<style scoped>
.tips-container {
  background-color: #fefefe;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 80px;
  -webkit-overflow-scrolling: touch;
}

.tips-header {
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tips-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.category-filter {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0.6rem 1rem;
  background-color: #f9fafb;
  gap: 0.5rem;
  -webkit-overflow-scrolling: touch;
}

.chip {
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  background-color: #e5e7eb;
  border: none;
  color: #374151;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;
}
.chip.active {
  background-color: #007aff;
  color: white;
}

.tips-list {
  padding: 1.25rem 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.tip-card {
  border-radius: 16px;
  padding: 1.1rem;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.2rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  background-color: white;
}

.tip-card:hover {
  transform: translateY(-2px);
}

.tip-icon {
  font-size: 1.6rem;
  color: #007aff;
  margin-right: 1rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.tip-desc {
  margin: 0.35rem 0 0;
  font-size: 0.925rem;
  color: #4b5563;
  line-height: 1.4;
}

.loading {
  text-align: center;
  padding: 1rem;
  font-size: 0.95rem;
  color: #6b7280;
}
</style>
