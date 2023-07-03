export function useModal() {
  const isVisible = ref(false)

  const showModal = () => {
    isVisible.value = true
  }

  const hideModal = () => {
    isVisible.value = false
  }

  const toggleModal = () => {
    isVisible.value = !isVisible.value
  }

  return {
    isVisible,
    showModal,
    hideModal,
    toggleModal,
  }
}
