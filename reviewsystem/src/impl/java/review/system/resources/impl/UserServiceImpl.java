package review.system.resources.impl;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.UserService;
import review.system.entity.User;
import review.system.repository.UserRepository;

public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User getUser(Long id) {
		return userRepository.findOne(id);
	}

	@Override
	public void createUser(User user) {
		userRepository.save(user);
	}

	@Override
	public User getUserByName(String name) {
		return userRepository.findByName(name);
	}

}
