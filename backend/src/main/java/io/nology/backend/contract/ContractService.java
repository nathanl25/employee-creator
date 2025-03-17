package io.nology.backend.contract;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

    private ContractRepository repo;
    private ModelMapper mapper;

    ContractService(ContractRepository repo, ModelMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public Optional<Contract> getContractById(long id) {
        return this.repo.findById(id);
    }
}
