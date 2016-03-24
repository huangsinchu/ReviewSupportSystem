package review.system.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "code_position")
public class CodePosition extends Position {

	private String fileName;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
