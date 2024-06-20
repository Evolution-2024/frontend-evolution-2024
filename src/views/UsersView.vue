<template>
  <crud-layout
    end-point="users"
    icon="account"
    :entity-property="entityProperty"
    post-ep="users/auth/sign-up"
    :headers="headers"
    default-title="username"
    align-end
    alter
    hide-detail
    hide-delete
    hide-edit
    hide-hover
    @edit="onEdit"
  >
    <template #form>
      <v-text-field
        v-model="name"
        :rules="contentRules"
        label="Name"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="contentRules"
        label="Last Name"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-text-field
        v-model="entityProperty.email"
        :rules="emailRules"
        label="Email"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-text-field
        v-if="!valueEdit"
        v-model="entityProperty.password"
        :rules="contentRules"
        label="Password"
        density="compact"
        variant="outlined"
        :append-inner-icon="
          marker ? 'mdi-lock-outline' : 'mdi-lock-open-variant-outline'
        "
        :type="!marker ? '' : 'password'"
        @click:append-inner="this.marker = !this.marker"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-autocomplete
        density="compact"
        variant="outlined"
        label="Roles"
        required
        v-model="entityProperty.roles"
        :loading="loadingSelect"
        :items="roles"
        item-title="name"
        item-value="value"
        multiple
      >
      </v-autocomplete>
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe
        illo. Aliquam perspiciatis adipisci laudantium voluptatem tempora, quo
        deleniti rerum blanditiis ducimus sint neque dignissimos debitis tenetur
        labore consectetur magnam.
      </v-card>
    </template>
  </crud-layout>
</template>

<script>
// @ is an alias to /src
import CrudLayout from "@/layouts/CrudLayout.vue";

export default {
  name: "CoursesView",
  components: {
    CrudLayout,
  },
  data() {
    return {
      nameCourseRules: [(v) => !!v || "Required"],
      headers: [
        { text: "Email", value: "email" },
        { text: "Username", value: "username" },
      ],
      name: "",
      lastName: "",
      entityProperty: {
        username: "",
        email: "",
        password: "",
        roles: [],
      },
      marker: true,
      valueEdit: false,
      loadingSelect: false,
      roles: [
        {
          name: "STUDENT",
          value: "ROLE_STUDENT",
        },
        {
          name: "TEACHER",
          value: "ROLE_TEACHER",
        },
        {
          name: "ADMIN",
          value: "ROLE_ADMIN",
        },
      ],
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      contentRules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    onEdit(value) {
      this.valueEdit = value;
    },
  },
  watch: {
    name(newVal) {
      this.entityProperty.username = newVal + " " + this.lastName;
    },
    lastName(newVal) {
      this.entityProperty.username = this.name + " " + newVal;
    },
  },
  mounted() {},
};
</script>
