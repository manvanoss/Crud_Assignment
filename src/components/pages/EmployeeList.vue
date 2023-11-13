<template>
  <layout-div>
    <div class="container">
      <h2 class="text-center mt-5 mb-3">Employee Management</h2>
      <div class="card">
        <div class="card-header">
          <router-link to="/create" class="btn btn-outline-primary">
            Create Employee
          </router-link>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Employee No</th>
                <th>Employee Name</th>
                <th>Employee Salary</th>
                <th>Employee Age</th>
                <th width="240px">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.id }}</td>
                <td>{{ employee.employee_name }}</td>
                <td>{{ employee.employee_salary }}</td>
                <td>{{ employee.employee_age }}</td>
                <td>
                  <router-link :to="`/show/${employee.id}`" class="btn btn-outline-info mx-1">Show</router-link>
                  <router-link :to="`/edit/${employee.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
                  <button @click="handleDelete(employee.id)" class="btn btn-outline-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  name: 'EmployeeList',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      employees: [],
    };
  },
  created() {
    this.fetchEmployeeList();
  },
  methods: {
    fetchEmployeeList() {
      axios.get(`${Base_URL}/employees`)
        .then(response => {
          this.employees = response.data.data.map(employee => ({
            id: employee.id,
            employee_name: employee.employee_name,
            employee_salary: employee.employee_salary,
            employee_age: employee.employee_age,
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleDelete(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${Base_URL}/employees/${id}`)
            .then(response => {
              Swal.fire({
                icon: 'success',
                title: 'Employee deleted successfully!',
                showConfirmButton: false,
                timer: 1500,
              });
              this.fetchEmployeeList();
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    },
  },
};
</script>
