import { ref, computed } from "vue";

const usePagination = (total) => {
  const currentPage = ref(1);
  const itemsPerPage = ref(12);

  const pageCount = computed(() => {
    return Math.ceil(total.value / itemsPerPage.value);
  });

  const indexOfLastItem = computed(() => {
    return currentPage.value * itemsPerPage.value;
  });

  const indexOfFirstItem = computed(() => {
    return indexOfLastItem.value - itemsPerPage.value;
  });

  return {
    currentPage,
    itemsPerPage,
    pageCount,
    indexOfLastItem,
    indexOfFirstItem,
  };
};
export default usePagination;
