export default function useChatScroll() {
  const scrollContainer = useTemplateRef<HTMLDivElement>("scrollContainer");
  const textareaRef = useTemplateRef<HTMLTextAreaElement>("textareaRef");
  const isAtBottom = ref(true);
  const showScrollButton = ref(false);

  const checkScrollPosition = (): void => {
    if (scrollContainer.value) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
      isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 200;
      showScrollButton.value = !isAtBottom.value;
    }
  };

  const scrollToBottom = (immediate = false): void => {
    if (!scrollContainer.value) return;

    const targetScrollTop =
      scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight;

    if (immediate) {
      scrollContainer.value.scrollTop = targetScrollTop;
      return;
    }

    const startScrollTop = scrollContainer.value.scrollTop;
    const distance = targetScrollTop - startScrollTop;
    const duration = 300;

    const startTime = performance.now();
    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      if (scrollContainer.value) {
        scrollContainer.value.scrollTop =
          startScrollTop + distance * easeInOutCubic;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };

  async function pinToBottom() {
    if (isAtBottom.value) {
      if (scrollContainer.value) {
        await nextTick();
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
      }
    }
  }

  onMounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.addEventListener("scroll", checkScrollPosition);
      nextTick(() => {
        scrollToBottom(true);
        textareaRef.value?.focus();
      });
    }
  });

  onUnmounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener("scroll", checkScrollPosition);
    }
  });

  onUpdated(() => {
    checkScrollPosition();
  });

  return {
    isAtBottom,
    showScrollButton,
    scrollToBottom,
    pinToBottom,
    textareaRef,
  };
}
