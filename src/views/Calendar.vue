<template>
  <div class="calendar-container">
    <header class="calendar-header">
      <span class="calendar-title">Calendario</span>
    </header>

    <div ref="calendar" class="calendar-view"></div>

    <!-- Modal para agregar evento -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-box">
        <h3>Agregar evento</h3>
        <p class="date-label">📅 {{ selectedDate }}</p>
        <input
          type="text"
          v-model="newEventTitle"
          placeholder="Título del evento"
        />
        <textarea
          v-model="newEventNote"
          placeholder="Nota (opcional)"
          rows="3"
          style="margin-top: 0.5rem; resize: none;"
        ></textarea>
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveEvent">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Modal para ver detalles -->
    <div v-if="showEventInfo" class="modal-overlay" @click.self="showEventInfo = false">
      <div class="modal-box">
        <h3>{{ currentEvent.title }}</h3>
        <p class="date-label">📅 {{ currentEvent.date }}</p>
        <p style="margin-top: 0.5rem;">📝 {{ currentEvent.note || 'Sin nota.' }}</p>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showEventInfo = false">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'

export default {
  name: 'CalendarView',
  data() {
    return {
      calendar: null,
      selectedDate: '',
      newEventTitle: '',
      newEventNote: '',
      showModal: false,
      currentEvent: null,
      showEventInfo: false
    }
  },
  mounted() {
    this.calendar = new Calendar(this.$refs.calendar, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      dateClick: this.handleDateClick,
      eventClick: this.showEventDetails,
      eventSources: [
        {
          events: (fetchInfo, successCallback, failureCallback) => {
            this.fetchEvents(fetchInfo.startStr, fetchInfo.endStr, successCallback, failureCallback)
          }
        }
      ],
      height: 'auto'
    })

    this.calendar.render()
  },
  methods: {
    async fetchEvents(startDate, endDate, successCallback, failureCallback) {
      const dateList = this.generateDateRange(startDate, endDate)
      const allEvents = []

      try {
        for (const date of dateList) {
          const res = await fetch(`https://michicute.waready.org.pe/calendar/${date}`)
          const data = await res.json()
          data.forEach(event => {
            allEvents.push({
              title: event.title,
              date: event.date,
              color: '#0dcaf0'
            })
          })
        }
        successCallback(allEvents)
      } catch (err) {
        console.error('❌ Error cargando eventos:', err)
        failureCallback(err)
      }
    },
    generateDateRange(start, end) {
      const dates = []
      const current = new Date(start)
      const last = new Date(end)
      while (current <= last) {
        dates.push(current.toISOString().split('T')[0])
        current.setDate(current.getDate() + 1)
      }
      return dates
    },
    handleDateClick(info) {
      this.selectedDate = info.dateStr
      this.newEventTitle = ''
      this.newEventNote = ''
      this.showModal = true
    },
    async saveEvent() {
      const title = this.newEventTitle.trim()
      const note = this.newEventNote.trim()
      if (!title) return

      try {
        await fetch('https://michicute.waready.org.pe/calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            note,
            date: this.selectedDate
          })
        })

        this.calendar.addEvent({
          title,
          date: this.selectedDate,
          color: '#0dcaf0'
        })

        this.closeModal()
      } catch (err) {
        console.error('❌ Error guardando evento:', err)
      }
    },
    async showEventDetails(info) {
      this.currentEvent = {
        title: info.event.title,
        date: info.event.startStr,
        note: ''
      }

      try {
        const res = await fetch(`https://michicute.waready.org.pe/calendar/${info.event.startStr}`)
        const data = await res.json()
        const match = data.find(e => e.title === info.event.title)
        if (match) this.currentEvent.note = match.note
      } catch (err) {
        console.error('❌ Error obteniendo nota:', err)
      }

      this.showEventInfo = true
    },
    closeModal() {
      this.newEventTitle = ''
      this.newEventNote = ''
      this.showModal = false
    }
  }
}
</script>

<style>
.calendar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 70px;
  overflow: hidden;
}

.calendar-header {
  height: 55px;
  padding-top: 10px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.calendar-view {
  margin-top: 60px;
}

/* Modal estilo iOS */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.2s ease-in-out;
}

.modal-box h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.date-label {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
}

.modal-box input,
.modal-box textarea {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 1.2rem;
  margin-bottom: 1rem;
  outline: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.cancel-btn,
.save-btn {
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}

.cancel-btn {
  background-color: #e5e5e5;
  color: #333;
}

.save-btn {
  background-color: #007aff;
  color: white;
}
</style>
