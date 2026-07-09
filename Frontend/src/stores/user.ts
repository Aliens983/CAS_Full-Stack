import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types'
import { isAdminRole } from '@/utils/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref<UserInfo | null>(null)

    const isLogin = computed(() => Boolean(token.value))
    const isAdmin = computed(() => isAdminRole(userInfo.value?.role))

    function setToken(value: string) {
      token.value = value
    }

    function setUserInfo(value: UserInfo) {
      userInfo.value = value
    }

    function logout() {
      token.value = ''
      userInfo.value = null
    }

    return {
      token,
      userInfo,
      isLogin,
      isAdmin,
      setToken,
      setUserInfo,
      logout,
    }
  },
  {
    persist: {
      key: 'enterprise_frontend_user',
      paths: ['token', 'userInfo'],
    },
  },
)
