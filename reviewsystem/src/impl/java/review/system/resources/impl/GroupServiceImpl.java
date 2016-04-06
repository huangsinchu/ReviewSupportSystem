package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.GroupService;
import review.system.entity.Group;
import review.system.repository.GroupRepository;

public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupRepository groupRepository;

	@Override
	public Group getGroup(Long id) {
		return groupRepository.findOne(id);
	}

	@Override
	public ArrayList<Group> getGroupByUser(Long uid) {
		return groupRepository.findByUserId(uid);
	}

	@Override
	public void createGroup(Group group) {
		groupRepository.save(group);
	}

}
