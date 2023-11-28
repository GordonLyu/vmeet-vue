<template>
  <div class="main">
    <div class="menu">
      <Menu @item-data="getMenuItemData"></Menu>
    </div>
    <div class="contain">
      <div class="header">
        <Header :title="title" :avatar="user.avatar"></Header>
      </div>
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api';
import Header from '@/components/Header/index.vue';
import Menu from '@/components/Menu/index.vue';
import { useUserInfoStore } from '@/stores/user';
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const title = ref('聊天')
const user = useUserInfoStore().user!;

const getMenuItemData = (item: any) => {
  title.value = item.title;
}
let uid = useUserInfoStore().user!.id;
  api.socket.chat.connect(uid);

// onUnmounted(() => {
//   api.socket.chat.close();
// })
</script>
<style>
html,
body,
#app {
  height: 100%;
}
</style>

<style scoped>
.main {
  display: flex;
  height: 100%;
}

.menu {
  width: 60px;
  height: 100%;
  z-index: 1;
}

.contain {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}


.header {
  height: 60px;
}

.content {
  flex: 1;
  height: calc(100% - 60px);
}
</style>