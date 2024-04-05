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
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { liveMessage } from '@/utils/messageUtil'
import { useLiveStore } from '@/stores/live';
import { ElMessage } from 'element-plus';
const title = ref('聊天')
const user = useUserInfoStore().user!;

const getMenuItemData = (item: any) => {
  title.value = item.title;
}
let uid = useUserInfoStore().user!.id;
api.socket.chat.connect(uid);
onMounted(() => {
  // todo 对方为发起者，己方为接收者。当对方挂断时，己方通知关闭
  api.socket.chat.onmessage((resJSON: any) => {
    let data = JSON.parse(resJSON).data;
    if (data.type.includes('live')) {
      let content = JSON.parse(data.content);
      if (data.type == 'open-live') {
        useLiveStore().liveMessage = liveMessage(data.from, content.nickname, content.type).elMessage;
      } else if (data.type == 'close-live') {
        useLiveStore().liveMessage?.close();
        useLiveStore().liveMessage = null;
        useLiveStore().closeVideoChatPage();
      }
    }
  })
})
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