const Employee = require('../models/Employee');
const ObjectId = require('mongoose').Types.ObjectId;

class EmployeeRepository {
    async create(employeeData) {
        const employee = new Employee(employeeData);
        return await employee.save();
    }

    async getAll() {
        return await Employee.find({ isActive: true });
    }

    async getById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Employee.findById(id);
    }

    async update(id, employeeData) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Employee.findByIdAndUpdate(id, employeeData, { new: true });
    }

    async delete(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Employee.findByIdAndDelete(id);
    }
}
module.exports = {
    EmployeeRepository
};
