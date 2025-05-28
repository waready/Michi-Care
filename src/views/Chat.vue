<template>
    <div class="chat-container">
        <header class="chat-header">Chat</header>

        <div class="messages" ref="messages">
            <div v-for="(msg, index) in messages" :key="index"
                :class="['message-bubble', msg.sender === 'me' ? 'from-me' : 'from-them']">
                <div class="markdown-body" v-html="formatMarkdown(msg.text)"></div>
            </div>

            <div v-if="isTyping" class="typing-indicator">Michi está escribiendo...</div>
        </div>

        <div class="chat-input">
            <input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Escribe un mensaje..." />
            <button @click="sendMessage">
                <i class="pi pi-send"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { marked } from 'marked'

export default {
    data() {
        return {
            messages: [],
            newMessage: '',
            isTyping: false
        }
    },
    mounted() {
        this.fetchChatHistory().then(() => {
            if (this.messages.length === 0) {
                this.messages.push({
                    sender: 'them',
                    text: '👋 ¡Hola! ¿Cómo te sientes hoy? Si tienes dudas sobre, alimentación o cuidados, estoy aquí para ayudarte. 🍎💬'
                })
            }
        })
    },
    methods: {
        formatMarkdown(text) {
            if (!text) return ''

            // Reemplazar líneas que empiezan con ### Título
            const parsed = text.replace(/^###\s(.+)$/gm, (_, title) => {
                return `<strong class="subtitle">${title.trim()}</strong>`
            })

            // Convertir el resto con marked inline
            return marked.parseInline(parsed)
        },
        async fetchChatHistory() {
            try {
                const res = await fetch('https://michicute.waready.org.pe/chat')
                const data = await res.json()
                this.messages = data.map(m => ({
                    text: m.message,
                    sender: m.sender === 'gpt' ? 'them' : 'me'
                }))
                this.scrollToBottom()
            } catch (err) {
                console.error('❌ Error cargando historial:', err)
            }
        },
        async sendMessage() {
            const text = this.newMessage.trim()
            if (text === '') return

            this.messages.push({ sender: 'me', text })
            this.newMessage = ''
            this.scrollToBottom()

            this.isTyping = true

            try {
                const res = await fetch('https://michicute.waready.org.pe/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: text,
                        sender: 'usuario'
                    })
                })

                const data = await res.json()
                if (data.reply) {
                    this.messages.push({ sender: 'them', text: data.reply })
                }
            } catch (err) {
                console.error('❌ Error al enviar mensaje:', err)
                this.messages.push({
                    sender: 'them',
                    text: '🚫 Ocurrió un error al conectar con Michi.'
                })
            } finally {
                this.isTyping = false
                this.scrollToBottom()
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$refs.messages
                if (container) container.scrollTop = container.scrollHeight
            })
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
    overflow: hidden;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-header {
    height: 55px;
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    background-color: white;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
    padding-top: 12px;
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    padding-top: 70px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.message-bubble {
    max-width: 85%;
    font-size: 0.85rem;
    line-height: 1.5;
    word-wrap: break-word;
    padding: 0.75rem 1rem;
    border-radius: 1.2rem;
    white-space: pre-wrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    text-align: left;
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
    color: #111;
    border-bottom-left-radius: 0;
}

.typing-indicator {
    align-self: flex-start;
    font-size: 0.85rem;
    color: #888;
    margin-left: 10px;
    font-style: italic;
}

.chat-input {
    display: flex;
    padding: 0.5rem;
    background: white;
    border-top: 1px solid #ddd;
    position: fixed;
    bottom: 70px;
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

/* Markdown */
.markdown-body strong {
    font-weight: 600;
}

.markdown-body em {
    font-style: italic;
}

.markdown-body ul {
    margin: 0.5rem 0 0.5rem 1.2rem;
}

.markdown-body li {
    margin-bottom: 0.4rem;
}

.markdown-body h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.8rem;
    margin-bottom: 0.4rem;
    color: #333;
}
</style>
