package review.system.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "deficiency_combination_record")
public class DeficiencyCombinationRecord {

	@Id
	private Long id;
	private Long deficiencyId;
	private Long combinedId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getDeficiencyId() {
		return deficiencyId;
	}

	public void setDeficiencyId(Long deficiencyId) {
		this.deficiencyId = deficiencyId;
	}

	public Long getCombinedId() {
		return combinedId;
	}

	public void setCombinedId(Long combinedId) {
		this.combinedId = combinedId;
	}

}
