package io.nology.backend.contract;

import java.util.Date;

public interface ContractDTO {
    public Date getStartDate();

    public Date getEndDate();

    public boolean getIsOngoing();

    public int getWeeklyHours();
}
