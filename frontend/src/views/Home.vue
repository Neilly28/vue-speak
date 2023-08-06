<template>
  <div>
    <div class="text-center">
      <h1 class="text-5xl font-bold mt-12 mb-8">
        Start learning with one of our top teachers!
      </h1>
      <p class="text-lg mb-24">
        There isn't a single way to teach a language. Book a regular lesson or a
        trial lessons to get an introduction to a teacher's style. We have
        teachers who specialize in teaching the foundations of German all the
        way to advanced topics.
      </p>
    </div>

    <!-- SEARCH FILTERS -->
    <div class="flex items-center justify-center gap-4">
      <input
        class="bg-slate-100 px-4 py-2 rounded-full"
        type="text"
        placeholder="🔎 Find your teacher..."
        v-model="searchTerm"
      />
      <select
        class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
        v-model="selectedLanguage"
      >
        <option value="">Choose Language</option>
        <option value="German">German</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
      </select>

      <select
        class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
        v-model="selectedProfession"
      >
        <option value="">Choose Level</option>
        <option value="professional">Professional Teacher</option>
        <option value="tutor">Community Tutor</option>
      </select>
    </div>
    <div v-if="filteredTeachers.length === 0" class="mt-12">
      <h1 class="text-4xl text-center font-bold">Oops, no teachers found 🥲</h1>
    </div>

    <div class="grid grid-cols-3 gap-12 mt-12">
      <div v-for="teacher in filteredTeachers" :key="teacher._id">
        <router-link
          :to="{
            name: 'TeacherDetails',
            params: { id: teacher._id },
            props: { teacher },
          }"
          class="group h-80 cursor-pointer flex flex-col items-start justify-evenly gap-4 shadow-md p-6 rounded-3xl bg-white"
        >
          <div class="flex gap-4">
            <img class="rounded-full w-24" :src="teacher.image" alt="" />
            <div class="text-left flex flex-col items-start justify-center">
              <h2 class="text-2xl font-bold">{{ teacher.name }}</h2>
              <h2 class="text-xs text-slate-400">
                {{
                  teacher.professional
                    ? "Professional Teacher ✅"
                    : "Community Tutor"
                }}
              </h2>
              <span
                class="mt-2 border-transparent px-2 py-1 rounded-3xl text-xs font-semibold text-cyan-800 bg-cyan-200"
                >{{ teacher.language }}</span
              >
            </div>
          </div>

          <div>
            <p class="text-sm text-left">{{ teacher.description }}</p>
          </div>
          <div class="flex items-center justify-evenly gap-4">
            <div>
              <p class="text-sm text-left text-slate-400">Trial from</p>
              <h3 class="font-bold text-xl text-left">
                EUR {{ teacher.price.toFixed(2) }}
              </h3>
            </div>

            <button
              class="bg-red-500 text-white font-bold px-4 py-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 ease-in-out duration-300"
            >
              Book a class
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const teachers = ref([]);
const selectedLanguage = ref("");
const selectedProfession = ref("");
const searchTerm = ref("");
const store = useStore();

// user auth
const user = computed(() => store.state.user);
console.log(user);

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

onMounted(async () => {
  try {
    // fetch teachers
    const response = await axios.get("http://localhost:5000/api/teachers");
    teachers.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>
