<template>
  <form @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: !firstName.isValid }"
      @click="resetValidity(this.firstName)"
    >
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" v-model.trim="firstName.value" />
      <p v-if="!firstName.isValid">First Name Is Required</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !lastName.isValid }"
      @click="resetValidity(this.lastName)"
    >
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="lastName.value" />
      <p v-if="!lastName.isValid">Last Name Is Required</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !description.isValid }"
      @click="resetValidity(this.description)"
    >
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description.value">
      </textarea>
      <p v-if="!description.isValid">Description Is Required</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !rate.isValid }"
      @click="resetValidity(this.rate)"
    >
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.value" />
      <p v-if="!rate.isValid">Rate Must Be Greater Than 0</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !areas.isValid }"
      @click="resetValidity(this.areas)"
    >
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">Must Have At least One Expertise</p>
    </div>
    <p v-if="!formIsValid">Please Fix The Highlighted Fields</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: { value: '', isValid: true },
      lastName: { value: '', isValid: true },
      description: { value: '', isValid: true },
      rate: { value: null, isValid: true },
      areas: { value: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.value === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.value === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    resetValidity(item) {
      item.isValid = true;
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
