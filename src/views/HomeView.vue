<template>
  <div class="home-container">
    <!-- Logo -->
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>

    <!-- Card principal -->
    <div class="info-card">
      <h2 class="title">Tu Embarazo</h2>

      <div v-if="storedDate" class="summary">
        <p>Última menstruación:</p>
        <p class="highlight">{{ formattedDate }}</p>
        <p class="highlight">Semana {{ weeks }} de 40</p>

        <!-- Fecha probable de parto -->
        <div class="fpp">
          <p>Fecha estimada de parto:</p>
          <p class="highlight">{{ dueDate }}</p>
        </div>

        <!-- Barra de progreso -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progressPercent + '%' }" />
        </div>

        <p class="stage-message">{{ stageMessage }}</p>
      </div>

      <div v-else class="summary">
        <p class="info-text">Selecciona la fecha de tu última menstruación para comenzar el seguimiento.</p>
      </div>

      <input type="date" v-model="selectedDate" class="date-picker" />

      <div class="btn-row">
        <button class="btn-save" @click="saveDate">Guardar</button>
        <button v-if="storedDate" class="btn-clear" @click="clearDate">Borrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      selectedDate: '',
      storedDate: null
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.storedDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    weeks() {
      if (!this.storedDate) return 0
      const now = new Date()
      const start = new Date(this.storedDate)
      const diff = now - start
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      return Math.min(Math.floor(days / 7), 40)
    },
    dueDate() {
      if (!this.storedDate) return ''
      const date = new Date(this.storedDate)
      date.setDate(date.getDate() + 280) // 40 semanas = 280 días
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    progressPercent() {
      return Math.min((this.weeks / 40) * 100, 100).toFixed(1)
    },
    stageMessage() {
      if (this.weeks < 13) return '¡Estás en el primer trimestre! 🌱'
      if (this.weeks < 27) return 'Segundo trimestre en curso 🤰'
      if (this.weeks < 37) return 'Tercer trimestre, ya casi 💫'
      return '¡Prepárate, falta poco! 👶'
    }
  },
  created() {
    const saved = localStorage.getItem('lmpDate')
    if (saved) this.storedDate = saved
  },
  methods: {
    saveDate() {
      if (this.selectedDate) {
        this.storedDate = this.selectedDate
        localStorage.setItem('lmpDate', this.selectedDate)
      }
    },
    clearDate() {
      localStorage.removeItem('lmpDate')
      this.storedDate = null
      this.selectedDate = ''
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f9f9fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 6rem;
  box-sizing: border-box;
}

/* Logo */
.logo-container {
  margin-bottom: 1.5rem;
}

.logo {
  width: 120px;
  height: auto;
  object-fit: contain;
}

/* Card */
.info-card {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 460px;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.summary {
  text-align: center;
  margin-bottom: 1.2rem;
}

.highlight {
  font-size: 1.1rem;
  font-weight: 600;
  color: #007aff;
  margin: 0.2rem 0;
}

.info-text {
  color: #666;
  font-size: 0.95rem;
}

.fpp {
  margin-top: 1rem;
}

/* Progreso */
.progress-container {
  background-color: #e0e0e0;
  height: 10px;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress-bar {
  background-color: #007aff;
  height: 10px;
  transition: width 0.4s ease;
}

/* Trimestre */
.stage-message {
  font-size: 0.95rem;
  color: #444;
  font-style: italic;
  margin-top: 0.5rem;
}

/* Input */
.date-picker {
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin-top: 1.2rem;
  appearance: none;
  font-family: inherit;
}

/* Botones */
.btn-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-save {
  flex: 1;
  padding: 0.7rem;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
}

.btn-clear {
  flex: 1;
  padding: 0.7rem;
  background-color: #f2f2f2;
  color: #555;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
}
</style>
