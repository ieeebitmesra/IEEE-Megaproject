import { useUserStore } from '@/store/user-store'

function useUser() {
  const user = useUserStore((state) => state.user)
  const hasHydrated = useUserStore((state) => state.hasHydrated)

  return {
    user,
    loading: !hasHydrated,
    logout: useUserStore((state) => state.logout),
  }
}

export default useUser
