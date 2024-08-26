import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '@/stores/user'

export const userBehavior = BehaviorWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token']
  }
})
