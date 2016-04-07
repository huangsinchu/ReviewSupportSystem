package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.GroupService;
import review.system.entity.ContactGroup;
import review.system.repository.GroupRepository;

public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupRepository groupRepository;

	@Override
	public ContactGroup getGroup(Long id) {
		return groupRepository.findOne(id);
	}

	@Override
	public ArrayList<ContactGroup> getGroupByUser(Long uid) {
		return groupRepository.findByUserId(uid);
	}

	@Override
	public void createGroup(ContactGroup group) {
		groupRepository.save(group);
	}

	@Override
	public void deleteGroup(Long id) {
		groupRepository.delete(id);
	}

}
