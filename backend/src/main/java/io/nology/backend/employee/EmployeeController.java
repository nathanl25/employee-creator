package io.nology.backend.employee;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.backend.common.exceptions.NotFoundException;
import io.nology.backend.common.exceptions.ServiceValidationException;
import io.nology.backend.contract.Contract;
import io.nology.backend.contract.ContractService;
import io.nology.backend.contract.CreateContractDTO;
import io.nology.backend.contract.UpdateContractDTO;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    private EmployeeService employeeService;
    private ContractService contractService;

    EmployeeController(EmployeeService employeeService, ContractService contractService) {
        this.employeeService = employeeService;
        this.contractService = contractService;
    }

    @PostMapping()
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) {
        Employee newEmployee = this.employeeService.createEmployee(data);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Employee>> getEmployees() {
        List<Employee> employees = this.employeeService.getEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @Valid @RequestBody UpdateEmployeeDTO data)
            throws NotFoundException {
        Employee updatedEmployee = this.employeeService.updateEmployee(data, id);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @PostMapping("/{id}/contract")
    public ResponseEntity<Contract> addEmployeeContract(@PathVariable long id,
            @Valid @RequestBody CreateContractDTO data)
            throws ServiceValidationException, NotFoundException {
        Contract addedContract = this.employeeService.addContract(id, data);
        return new ResponseEntity<>(addedContract, HttpStatus.OK);
    }

    @PatchMapping("/{id}/contract/{contractId}")
    public ResponseEntity<Contract> updateEmployeeContract(@PathVariable long id, @PathVariable long contractId,
            @Valid @RequestBody UpdateContractDTO data) throws NotFoundException, ServiceValidationException {
        Contract toBeUpdated = this.contractService.getContractById(contractId).orElseThrow(
                () -> new NotFoundException("Could not find a contract belonging to this ID"));
        Contract updatedContract = this.employeeService.updateContract(id, toBeUpdated, data);
        return new ResponseEntity<>(updatedContract, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable long id) throws NotFoundException {
        this.employeeService.deleteEmployee(id);
        return new ResponseEntity<>("Employee has been deleted", HttpStatus.OK);
    }

    @DeleteMapping("/{id}/contract/{contractId}")
    public ResponseEntity<Void> deleteEmployeeContract(@PathVariable long id, @PathVariable long contractId)
            throws NotFoundException, ServiceValidationException {
        Contract toBeDeleted = this.contractService.getContractById(contractId).orElseThrow(
                () -> new NotFoundException("Could not find a contract belonging to this ID"));
        this.employeeService.deleteContract(id, toBeDeleted);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
