<template>
    <div class="chat-container">
        <!-- Encabezado superior -->
        <header class="chat-header">
            Chat
        </header>

        <!-- Mensajes -->
        <div class="messages" ref="messages">
            <div v-for="(msg, index) in messages" :key="index"
                :class="['message-bubble', msg.sender === 'me' ? 'from-me' : 'from-them']">
                {{ msg.text }}
            </div>
        </div>

        <!-- Campo de entrada -->
        <div class="chat-input">
            <input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Escribe un mensaje..." />
            <button @click="sendMessage">
                <i class="pi pi-send"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: [
                { sender: 'them', text: '¡Hola! ¿Cómo te sientes hoy?' },
                { sender: 'me', text: 'Muy bien, gracias 😊' }
            ],
            newMessage: ''
        }
    },
    methods: {
        sendMessage() {
            const text = this.newMessage.trim()
            if (text === '') return

            // Agrega el mensaje del usuario
            this.messages.push({ sender: 'me', text })
            this.newMessage = ''

            this.$nextTick(() => {
                this.scrollToBottom()
            })

            // Simula respuesta automática luego de 1s
            setTimeout(() => {
                this.messages.push({
                    sender: 'them',
                    text: 'Gracias por compartir. ¡Recuerda mantenerte hidratada! 💧'
                })
                this.$nextTick(() => {
                    this.scrollToBottom()
                })
            }, 1000)
        },
        scrollToBottom() {
            const container = this.$refs.messages
            container.scrollTop = container.scrollHeight
        }
    }
}
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f7fa;
    box-sizing: border-box;
    overflow: hidden;
}

/* Header tipo iOS */
.chat-header {
    height: 55px;
    padding-top: 10px;
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
    color: #333;
    background-color: white;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;
}

/* Mensajes debajo del header */
.messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    padding-top: 70px;
    /* espacio para el header */
    padding-bottom: 100px;
    /* espacio para input + navbar */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Estilos de burbujas */
.message-bubble {
    max-width: 75%;
    padding: 0.7rem 1rem;
    border-radius: 1.2rem;
    font-size: 0.95rem;
    line-height: 1.4;
    word-wrap: break-word;
}

.from-me {
    align-self: flex-end;
    background-color: #007aff;
    color: white;
    border-bottom-right-radius: 0;
}

.from-them {
    align-self: flex-start;
    background-color: #e5e5ea;
    color: black;
    border-bottom-left-radius: 0;
}

/* Input fijo */
.chat-input {
    display: flex;
    padding: 0.5rem;
    background: white;
    border-top: 1px solid #ddd;
    position: fixed;
    bottom: 70px;
    /* espacio sobre navbar */
    width: 100%;
    box-sizing: border-box;
    gap: 0.5rem;
    z-index: 20;
}

.chat-input input {
    flex: 1;
    padding: 0.7rem 1rem;
    border: 1px solid #ccc;
    border-radius: 1.5rem;
    font-size: 1rem;
    outline: none;
}

.chat-input button {
    background: none;
    border: none;
    color: #007aff;
    font-size: 1.4rem;
    cursor: pointer;
}
</style>
