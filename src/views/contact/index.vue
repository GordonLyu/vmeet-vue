<template>
    <div class="main">
        <div class="contain">
            <div class="contact-list">
                <ContactList @selected="selected"></ContactList>
            </div>
            <div class="contact-setting">
                <ContactSetting :user="user"></ContactSetting>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ContactList from '@/components/Contact/ContactList.vue';
import ContactSetting from '@/components/Contact/ContactSetting.vue';
import type { User } from '@/types/User';
import { ref } from 'vue';

const user = ref<User>();

const selected = (_user: User) => {
    user.value = _user;
}

</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
}

.contain {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    padding-right: 0;
    padding-left: 0;
}

.contact-list {
    width: 300px;
    height: 100%;
    transition: .3s;
}

.contact-setting {
    flex: 1;
    box-sizing: border-box;
    padding: 20px 0px;
    padding-left: 30px;
    overflow-y: auto;
}
</style>