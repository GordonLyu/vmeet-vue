<template>
    <div>
        <el-dropdown v-if="props.hasDropdown" :trigger="props.dropdownTrigger"
            :style="`${props.dropdownTrigger == 'click' ? 'cursor: pointer;' : ''}`">
            <span :class="`dropdown-link ${props.class}`">
                <el-avatar :src="props.src + (noCache ? `?r=${Math.random()}` : '')" :size="props.size"> user
                </el-avatar>
                <span class="username" v-if="props.username">{{
                    props.username
                }}</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in props.dropdownConfig"
                        @click="item.click ? item.click($event) : '' || to(item.to)" :divided="item.divided">
                        {{ item.name }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span class="dropdown-link" v-else>
            <el-avatar :src="props.src + (noCache ? `?r=${Math.random()}` : '')"> user </el-avatar> <span
                class="username" v-if="props.username">{{
                    props.username
                }}</span>
        </span>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';


export interface DropdownConfig {
    /**下拉菜单选项名称 */
    name: string;
    /**跳转 */
    to?: string;
    /**点击执行的方法 */
    click?: Function;
    /**是否有分割线 */
    divided?: boolean;
}

const props = defineProps<{
    src?: string;
    class?: string;
    size?: number;
    hasDropdown?: boolean;
    dropdownTrigger?: 'hover' | 'click' | 'contextmenu';
    dropdownConfig?: DropdownConfig[];
    username?: string;
    noCache?: boolean;
}>();

const to = (url: string | undefined) => {
    if (url == '' || url == undefined) {
        return;
    }
    router.push(url);
}

</script>

<style scoped>
.username {
    margin-left: 8px;
}

.dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
}
</style>