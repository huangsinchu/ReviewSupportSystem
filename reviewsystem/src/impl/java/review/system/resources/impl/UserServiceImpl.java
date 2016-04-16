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
	public Long createUser(User user) {
		return userRepository.save(user).getId();
	}

	@Override
	public User getUserByEmail(String email) {
		return userRepository.findByEmailAddress(email);
	}

}
