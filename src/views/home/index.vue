<template>
  <div class="main">
    <div class="menu">
      <Menu @item-data="getMenuItemData"></Menu>
    </div>
    <div class="contain">
      <div class="header">
        <Header :title="title"></Header>
      </div>
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/index.vue';
import Menu from '@/components/Menu/index.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const title = ref('聊天')

const getMenuItemData = (item: any) => {
  title.value = item.title;
}
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
  gap: 5px;
  height: 100%;
}

.menu {
  width: 60px;
  height: 100%;
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
  box-shadow: 0 0 1px 0 #ccc;
}

.content {
  flex: 1;
  height: calc(100% - 60px);
}
</style>