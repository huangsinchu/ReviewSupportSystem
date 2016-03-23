package review.system.entity;

import javax.persistence.Entity;

@Entity
public class DocPosition extends Position {

	private int page;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

}
