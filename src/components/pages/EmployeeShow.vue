<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Show Employee</h2>
    <div class="card">
      <div class="card-header">
        <router-link
          class="btn btn-outline-info float-right"
          to="/"
        >
          View All Employees
        </router-link>
      </div>
      <div class="card-body">
        <b className="text-muted">Employee No:</b>
        <p>{{ employee.id }}</p>
        <b className="text-muted">Employee Name:</b>
        <p>{{ employee.employee_name }}</p>
        <b className="text-muted">Employee Salary:</b>
        <p>{{ employee.employee_salary }}</p>
        <b className="text-muted">Employee Age:</b>
        <p>{{ employee.employee_age }}</p>
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
  name: 'EmployeeShow',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      employee: {},
      isSaving: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`${Base_URL}/employee/${id}`)
      .then(response => {
        this.employee = response.data.data;
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
  methods: {},
};
</script>
