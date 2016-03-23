package review.system.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Group {

	@Id
	private Long gid;
	private Long userid;
	private String groupName;

	public Long getGid() {
		return gid;
	}

	public void setGid(Long gid) {
		this.gid = gid;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

}
