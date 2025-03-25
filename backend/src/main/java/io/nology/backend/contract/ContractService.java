package io.nology.backend.contract;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

    private ContractRepository repo;
    // private ModelMapper mapper;

    ContractService(ContractRepository repo) {
        this.repo = repo;
        // this.mapper = mapper;
    }

    public Optional<Contract> getContractById(long id) {
        return this.repo.findById(id);
    }

    public void deleteByEmployeeId(List<Contract> contracts) {
        // this.repo.deleteByEmployeeId(id);
        // this.repo.deleteAllById(ids);
        this.repo.deleteAll(contracts);

    }

    public void deleteById(long contractId) {
        this.repo.deleteById(contractId);
    }
}
