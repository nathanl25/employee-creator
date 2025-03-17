package io.nology.backend.contract;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.backend.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "contracts")
@JsonIgnoreProperties({ "createdAt", "updatedAt" })
public class Contract extends BaseEntity {
    public enum EmploymentStatus {
        PERMANENT,
        CONTRACTOR
    }

    public enum EmploymentBasis {
        FULL_TIME,
        PART_TIME,
    }

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column
    private int weeklyHours;

    @Column(nullable = false)
    private EmploymentStatus status;

    @Column(nullable = false)
    private EmploymentBasis basis;

    @Column
    private boolean isOngoing = false;

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getWeeklyHours() {
        return weeklyHours;
    }

    public void setWeeklyHours(int weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    public EmploymentStatus getStatus() {
        return status;
    }

    public void setStatus(EmploymentStatus status) {
        this.status = status;
    }

    public EmploymentBasis getBasis() {
        return basis;
    }

    public void setBasis(EmploymentBasis basis) {
        this.basis = basis;
    }

    public boolean getIsOngoing() {
        return isOngoing;
    }

    public void setIsOngoing(boolean isOngoing) {
        this.isOngoing = isOngoing;
    }

}
