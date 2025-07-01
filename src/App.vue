<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useLLM } from './composables/useLLM';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const systemPrompt = "You are a sarcastic cat";

const { generateResponse, isLoading, error } = useLLM(systemPrompt);
const inputMessage = ref('');
const messages = ref<Message[]>([]);
const chatContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const sendToLLM = async () => {
  const messageText = inputMessage.value.trim();
  if (!messageText || isLoading.value) return;

  // Add user message to chat
  messages.value.push({ id: Date.now(), text: messageText, sender: 'user' });
  inputMessage.value = '';
  scrollToBottom();

  const response = await generateResponse(messageText, systemPrompt);

  if (response) {
    // Add AI response to chat
    messages.value.push({ id: Date.now() + 1, text: response, sender: 'ai' });
    scrollToBottom();
  } else if (error.value) {
    // Optionally handle error in UI
    messages.value.push({ id: Date.now() + 1, text: `Error: ${error.value}`, sender: 'ai' });
    scrollToBottom();
  }
};
</script>

<template>
  <div class="flex flex-col h-screen max-w-3xl mx-auto border border-base-200 bg-base-200">
    <header class="p-4 bg-base-100 border-b border-base-300 text-center shadow">
      <h1 class="text-xl font-bold">Study Buddy</h1>
    </header>
    <main ref="chatContainer" class="flex-grow overflow-y-auto p-4 border-base-200 border-2">
      <div v-for="message in messages" :key="message.id" class="chat" :class="message.sender === 'user' ? 'chat-end' : 'chat-start'">
        <div class="chat-bubble" :class="message.sender === 'user' ? 'chat-bubble-primary' : ''">
          {{ message.text }}
        </div>
      </div>
    </main>
    <footer class="p-4 bg-base-100 border-t border-base-300 flex items-center">
      <textarea v-model="inputMessage" placeholder="Type your message here..." :disabled="isLoading"
        @keyup.enter.prevent="sendToLLM" class="textarea textarea-bordered flex-grow resize-none mr-2" />
      <button @click="sendToLLM" :disabled="isLoading || !inputMessage.trim()" class="btn btn-primary">
        <span v-if="isLoading" class="loading loading-spinner"></span>
        {{ isLoading ? 'Sending...' : 'Send' }}
      </button>
    </footer>
  </div>
</template>

<style>
/* Remove the scoped styles and add global styles if needed, for example: */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

</style>
