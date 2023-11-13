<template>
  <layout-div>
    <h2>Create Employee</h2>
    <div class="card">
      <div class="card-body">
        <router-link
          class="btn btn-outline-info float-right"
          to="/"
        >
          View All Employee
        </router-link>
        <form>
          <div class="form-group">
            <label for="name">Employee Name</label>
            <input
              v-model="newEmployeeData.name"
              type="text"
              class="form-control"
              id="name"
              name="name"
            />
          </div>
          <div class="form-group">
            <label for="salary">Employee Salary</label>
            <input
              v-model="newEmployeeData.salary"
              type="text"
              class="form-control"
              id="salary"
              name="salary"
            />
          </div>
          <div class="form-group">
            <label for="age">Employee Age</label>
            <input
              v-model="newEmployeeData.age"
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
  name: 'EmployeeCreate',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      newEmployeeData: {
        name: '',
        salary: '',
        age: '',
      },
      isSaving: false,
      employees: [],
    };
  },
  methods: {
    handleSave() {
      this.isSaving = true;
      axios.post(`${Base_URL}/create`, this.newEmployeeData)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Employee created successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.isSaving = false;

          // Push the new employee data to the employees array
          this.employees.push({
            id: response.data.data.id,
            employee_name: response.data.data.name,
            employee_salary: response.data.data.salary,
            employee_age: response.data.data.age,
          });

          // Reset the input fields
          this.newEmployeeData.name = '';
          this.newEmployeeData.salary = '';
          this.newEmployeeData.age = '';
          this.$router.push('/');
          return response;
          
        })
        .catch((error) => {
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