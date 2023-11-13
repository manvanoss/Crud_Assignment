<template>
  <layout-div>
    <h2>Edit Employee Details</h2>
    <div class="card">
      <div class="card-header">
        <router-link to="/" class="btn btn-outline-info float-right">
          View All Employees
        </router-link>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Employee Name</label>
            <input
              v-model="employee_name"
              type="text"
              class="form-control"
              id="name"
              name="name"
            />
          </div>

          <div class="form-group">
            <label for="salary">Employee Salary</label>
            <input
              v-model="employee_salary"
              type="text"
              class="form-control"
              id="salary"
              name="salary"
            />
          </div>

          <div class="form-group">
            <label for="age">Employee Age</label>
            <input
              v-model="employee_age"
              type="text"
              class="form-control"
              id="age"
              name="age"
            />
          </div>

          <button
            @click="handleSave()"
            :disabled="isSaving"
            type="button"
            class="btn btn-outline-primary mt-3"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2';

const Base_URL = 'https://dummy.restapiexample.com/api/v1';

export default {
  name: 'EmployeeEdit',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      employee: {
        name: '',
        salary: '',
        age: '',
      },
      isSaving: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`${Base_URL}/employee/${id}`)
      .then(response => {
        this.employee = response.data.data[0];
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500,
        });
        return error;
      });
  },
  methods: {
    handleSave() {
      this.isSaving = true;
      const id = this.$route.params.id;
      axios.put(`${Base_URL}/update/${id}`, this.employee)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Project updated successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.isSaving = false;
          this.employee.name = '';
          this.employee.salary = '';
          this.employee.age = '';
          return response;
        })
        .catch(error => {
          this.isSaving = false;
          Swal.fire({
            icon: 'error',
            title: 'An Error Occurred!',
            showConfirmButton: false,
            timer: 1500,
          });
          return error;
        });
    },
  },
};
</script>
