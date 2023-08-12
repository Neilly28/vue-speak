<template>
  <Loading v-if="isLoading" />
  <div v-else>
    <div class="text-center">
      <h1 class="mb-8 mt-12 text-5xl font-bold">
        Start learning with one of our top teachers!
      </h1>
      <p class="mb-24 text-lg">
        There isn't a single way to teach a language. Book a trial lesson to get
        an introduction to a teacher's style. We have teachers who specialize in
        teaching the basics all the way to advanced topics.
      </p>
    </div>

    <!-- SEARCH FILTERS -->
    <div
      class="flex flex-col items-start justify-center gap-4 sm:flex-row sm:items-center"
    >
      <input
        class="rounded-full bg-slate-100 px-4 py-2"
        type="text"
        placeholder="🔎 Find your teacher..."
        v-model="searchTerm"
      />
      <select
        class="cursor-pointer rounded-full bg-slate-100 px-4 py-2"
        v-model="selectedLanguage"
      >
        <option value="">Choose Language</option>
        <option value="German">German</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
      </select>

      <select
        class="cursor-pointer rounded-full bg-slate-100 px-4 py-2"
        v-model="selectedProfession"
      >
        <option value="">Choose Level</option>
        <option value="professional">Professional Teacher</option>
        <option value="tutor">Community Tutor</option>
      </select>
    </div>
    <div v-if="filteredTeachers.length === 0" class="mt-12">
      <h1 class="text-center text-4xl font-bold">Oops, no teachers found 🥲</h1>
    </div>

    <TeacherCard :filteredTeachers="filteredTeachers" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

const teachers = ref([]);
const selectedLanguage = ref("");
const selectedProfession = ref("");
const searchTerm = ref("");
const router = useRouter();
const isLoading = ref(true);
import Loading from "../components/Loading.vue";

// import store
import { useTeacherStore } from "../store/teachers";
const teacherStore = useTeacherStore();

import TeacherCard from "./TeacherCard.vue";

// fetch teachers when component is mounted
onMounted(async () => {
  try {
    await teacherStore.fetchTeachers();
    teachers.value = teacherStore.teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    router.push("/error");
  } finally {
    isLoading.value = false;
  }
});

// language and professional filter
const filteredTeachers = computed(() => {
  if (
    !selectedLanguage.value &&
    !selectedProfession.value &&
    !searchTerm.value
  ) {
    return teachers.value;
  } else {
    return teachers.value.filter((teacher) => {
      const languageMatch =
        !selectedLanguage.value || teacher.language === selectedLanguage.value;
      const professionMatch =
        !selectedProfession.value ||
        (teacher.professional && selectedProfession.value === "professional") ||
        (!teacher.professional && selectedProfession.value === "tutor");
      const searchMatch =
        teacher.name
          .replace(/\s+/g, "")
          .toLowerCase()
          .includes(searchTerm.value.replace(/\s+/g, "").toLowerCase()) ||
        teacher.description
          .replace(/\s+/g, "")
          .toLowerCase()
          .includes(searchTerm.value.replace(/\s+/g, "").toLowerCase());

      return languageMatch && professionMatch && searchMatch;
    });
  }
});
</script>
