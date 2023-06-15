<template>
    <div class="main">
        <div class="contain">
            <div class="avatar">
                <Avatar :size="120"></Avatar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import Avatar from '@/components/Avatar/index.vue'
import type { User } from '@/types/User';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const uid = Number(useRoute().params.id);
const user = ref<User>();

const getUser = () => {
    api.contact.getOneContact(uid).then((res) => {
        user.value = res.data;
        console.log(user.value);
    })
}
getUser();

</script>

<style scoped>
.main {
    box-sizing: border-box;
    padding: 15px 30px;
}

.contain {
    width: 100%;
    height: 100%;
    background-color: #ccc;
}
</style>