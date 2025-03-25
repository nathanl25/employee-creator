package io.nology.backend.employee;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.backend.common.ValidationErrors;
import io.nology.backend.common.exceptions.NotFoundException;
import io.nology.backend.common.exceptions.ServiceValidationException;
import io.nology.backend.contract.Contract;
import io.nology.backend.contract.ContractDTO;
import io.nology.backend.contract.ContractService;
import io.nology.backend.contract.CreateContractDTO;
import io.nology.backend.contract.UpdateContractDTO;

@Service
public class EmployeeService {

    private EmployeeRepository repo;

    private ModelMapper mapper;

    private ContractService contractService;

    EmployeeService(EmployeeRepository repo, ModelMapper mapper, ContractService contractService) {
        this.repo = repo;
        this.mapper = mapper;
        this.contractService = contractService;
    }

    public Employee createEmployee(CreateEmployeeDTO data) {
        Employee newEmployee = new Employee();
        Contract newContract = new Contract();
        mapper.map(data, newEmployee);
        mapper.map(data, newContract);
        newEmployee.addContract(newContract);
        return this.repo.save(newEmployee);
    }

    public List<Employee> getEmployees() {
        return this.repo.findAll();
    }

    public Employee updateEmployee(UpdateEmployeeDTO data, long id) throws NotFoundException {
        Employee currEmployee = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not find an employee with this id"));
        mapper.map(data, currEmployee);
        this.repo.save(currEmployee);
        return currEmployee;
    }

    public Contract addContract(long id, CreateContractDTO data) throws NotFoundException, ServiceValidationException {
        ValidationErrors err = new ValidationErrors();
        Employee currEmployee = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not find an employee with this id"));
        validateContractDates(err, data, currEmployee.getContracts());
        if (!err.isEmpty()) {
            throw new ServiceValidationException(err);
        }
        Contract newContract = new Contract();
        mapper.map(data, newContract);
        currEmployee.addContract(newContract);
        this.repo.saveAndFlush(currEmployee);
        return currEmployee.getMostRecentlyUpdatedContract();
    }

    private void validateContractDates(ValidationErrors errors, ContractDTO proposedContract,
            List<Contract> existingContracts) {
        long proposedStart = proposedContract.getStartDate().getTime();
        long proposedEnd = proposedContract.getIsOngoing() ? Long.MAX_VALUE : proposedContract.getEndDate().getTime();
        for (Contract existing : existingContracts) {
            long existingStart = existing.getStartDate().getTime();
            long existingEnd = existing.getIsOngoing() ? Long.MAX_VALUE : existing.getEndDate().getTime();
            if (proposedStart <= existingStart && proposedEnd >= existingEnd) {
                errors.addError("contract", "An existing contract cannot exist inbetween the dates of a new contract");
                return;
            }
            if (proposedStart >= existingStart && proposedStart <= existingEnd) {
                errors.addError("contract", "New contract cannot start inbetween dates of an existing contract");
                return;
            }
            if (proposedEnd >= existingStart && proposedEnd <= existingEnd) {
                errors.addError("contract", "New contract cannot end inbetween dates of an existing contract");
                return;
            }
        }
    }

    public Contract updateContract(long id, Contract toBeUpdated, UpdateContractDTO data)
            throws NotFoundException, ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        Employee currEmployee = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not find an employee with this id"));
        List<Contract> allContracts = currEmployee.getContracts();
        if (!allContracts.contains(toBeUpdated)) {
            errors.addError("contract", "The proposed contract to be updated does not belong to this employee");
        }
        List<Contract> currentContracts = currEmployee.getContracts().stream()
                .filter(c -> c.getId() != toBeUpdated.getId())
                .collect(Collectors.toList());
        validateContractDates(errors, data, currentContracts);
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        mapper.map(data, toBeUpdated);
        this.repo.saveAndFlush(currEmployee);
        return toBeUpdated;
    }

    public void deleteEmployee(long id) throws NotFoundException {
        Employee currEmployee = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not find an employee with this id"));
        this.repo.delete(currEmployee);

    }

    public void deleteContract(long id, Contract toBeDeleted) throws NotFoundException, ServiceValidationException {
        Employee currEmployee = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not find an employee with this id"));
        ValidationErrors errors = new ValidationErrors();
        List<Contract> currentContracts = currEmployee.getContracts();
        if (!currentContracts.contains(toBeDeleted)) {
            errors.addError("contract", "The proposed contract to be deleted does not belong to this employee");
        }
        if (currentContracts.size() == 1) {
            errors.addError("contract",
                    "An employee must have a minimum of one contract at any given time, cannot delete any more contracts");
        }
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        long contractId = toBeDeleted.getId();
        currEmployee.removeContract(toBeDeleted);
        this.contractService.deleteById(contractId);
        this.repo.saveAndFlush(currEmployee);
    }
}
