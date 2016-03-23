package review.system.entity;

import javax.persistence.Entity;

@Entity
public class CodePosition extends Position {

	private String fileName;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
