<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import MessageItem from '@/components/MessageItem.vue'
import useMessagesStore from '@/stores/messages.js'
import useContactsStore from '@/stores/contacts.js'
import useChannelStore from '@/stores/channels.js'

const route = useRoute()
const messagesStore = useMessagesStore()
const contactsStore = useContactsStore()
const channelStore = useChannelStore()

const end = ref(null)
const channelId = ref(null)
const message = ref('')

const peopleInChat = computed(() => {
  return channelStore.getPeopleinChannel(channelId.value)
})

const nameChannel = computed(() => {
  return channelStore.getNameChannel(channelId.value);
})

const messagesView = computed(() => messagesStore.findMessagesByChannelId(channelId.value).map((message) => {
  const author = contactsStore.getContactById(message.author)
  if (!author) return message;
    return {
    ...message,
    author,
    self: author.id === 1
  }
}))

const addMessage = () => {
  messagesStore.addMessage(channelId.value, message.value)
  message.value = ''
  scrollToBottom()
}

const scrollToBottom = () => {
  /*
  nextTick en Vue.js es una función que permite ejecutar código después de que Vue haya actualizado el DOM como resultado de un cambio en los datos
  */
  nextTick(() => {
    end.value?.scrollIntoView({
      behavior: 'smooth'
    })
  });
}

watch(
  () => route.params.id,
  (id) => {
    channelId.value = parseInt(id)
    scrollToBottom()
    console.log('scroll')
  },
  { immediate: true }
)

scrollToBottom()
</script>

<template>
  <div class="messages">
    <header>
      <h2>{{ nameChannel?.name }}</h2>
      <div class="people-list">
        <div
          class="people-item"
          v-for="p in peopleInChat"
          :key="p.id"
        >
          <img :src="p.avatar" :alt="p.name" />
        </div>
      </div>
    </header>
    <div class="content">
      <MessageItem
        v-for="message in messagesView"
        :key="message.id"
        :avatar="message.author.avatar"
        :author="message.author.name"
        :message="message.message"
        :time="message.timestamp"
        :is-self="message.self"
      />
      <span ref="end"></span>
    </div>
    <form class="footer" @submit.prevent="addMessage">
      <textarea rows="3" v-model="message"></textarea>
      <button>
        <Icon icon="carbon:send-alt" />
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.messages {
  @apply flex flex-col h-full;
  header {
    @apply flex justify-between items-center px-6 py-2;
    h2 {
      @apply font-bold text-2xl;
    }
    .people-list {
      @apply flex gap-1;
      .people-item {
        @apply flex justify-center items-center border-4 border-neutral-700 rounded-full;
        img {
          @apply w-8 rounded-full;
        }
      }
    }
  }
  .content {
    @apply flex flex-col gap-4 p-4 h-full overflow-y-auto;
  }
  .footer {
    @apply flex p-2;
    textarea {
      @apply w-full px-2 py-2 resize-none bg-zinc-800 rounded-tl-md rounded-bl-md focus:outline-none;
    }
    button {
      @apply flex justify-center items-center px-4 bg-zinc-800 hover:bg-zinc-700 rounded-tr-md rounded-br-md text-2xl;
    }
  }
}
</style>