<template>
    <div class="calendar-container">
        <!-- Encabezado fijo estilo iOS -->
        <header class="calendar-header p-d-flex p-jc-center p-ai-center p-shadow-2">
            <span class="calendar-title">Calendario</span>
        </header>

        <!-- Vista del calendario -->
        <div ref="calendar" class="calendar-view p-p-3"></div>
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
            events: [
                { title: 'Cita prenatal', date: '2025-07-02', color: '#007bff' },
                { title: 'Tomar vitaminas', date: '2025-07-03', color: '#17a2b8' },
                { title: 'Control ecográfico', date: '2025-07-06', color: '#ffc107' },
                { title: 'Clase de lactancia', date: '2025-07-09', color: '#28a745' },
                { title: 'Revisión nutricional', date: '2025-07-11', color: '#6f42c1' },
                { title: 'Ejercicio suave', date: '2025-07-21', color: '#20c997' },
                { title: 'Consulta médica', date: '2025-07-23', color: '#dc3545' }
            ]
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
            events: this.events,
            height: 'auto',
            dateClick: this.handleDateClick
        })

        this.calendar.render()
    },
    methods: {
        handleDateClick(info) {
            const title = prompt(`¿Qué deseas agendar para el ${info.dateStr}?`)
            if (title) {
                this.calendar.addEvent({
                    title,
                    date: info.dateStr,
                    color: '#0dcaf0'
                })
            }
        }
    }
}
</script>

<!-- Sin scoped para que los estilos globales tengan efecto -->
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
}

.calendar-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
}

.calendar-view {
    margin-top: 60px;
}
</style>
