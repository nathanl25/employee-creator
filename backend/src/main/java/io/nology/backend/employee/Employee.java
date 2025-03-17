package io.nology.backend.employee;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.backend.common.BaseEntity;
import io.nology.backend.contract.Contract;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "employees")
@JsonIgnoreProperties({ "createdAt", "updatedAt" })
public class Employee extends BaseEntity {

    public Employee() {

    }

    @Column(nullable = false)
    private String firstName;

    @Column
    private String middleName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private String address;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "employee_contracts", joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "contract_id", referencedColumnName = "id"))
    private List<Contract> contracts = new ArrayList<>();

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void addContract(Contract contract) {
        contracts.add(contract);
    }

    public void removeContract(Contract contract) {
        contracts.remove(contract);
    }

    public void setContracts(List<Contract> contracts) {
        this.contracts = contracts;
    }

    public void removeAllContracts() {
        contracts.clear();
    }

    @JsonIgnoreProperties({ "createdAt", "updatedAt" })
    public List<Contract> getContracts() {
        return contracts.stream().sorted((a, b) -> {
            return b.getCreatedAt().compareTo(a.getCreatedAt());
        }).collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public Contract getMostRecentContract() {
        if (contracts.isEmpty()) {
            return null;
        }
        return contracts.stream().reduce(contracts.getFirst(),
                (acc, curr) -> {
                    return acc.getStartDate().getTime() > curr.getStartDate().getTime() ? acc : curr;
                });
    }

    @JsonIgnore
    public Contract getMostRecentlyUpdatedContract() {
        if (contracts.isEmpty()) {
            return null;
        }
        return contracts.stream().reduce(contracts.getFirst(),
                (acc, curr) -> {
                    return acc.getUpdatedAt().getTime() > curr.getUpdatedAt().getTime() ? acc : curr;
                });
    }
}
