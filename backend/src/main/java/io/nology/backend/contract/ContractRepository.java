package io.nology.backend.contract;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    // public void deleteByEmployeeId(long id);
}