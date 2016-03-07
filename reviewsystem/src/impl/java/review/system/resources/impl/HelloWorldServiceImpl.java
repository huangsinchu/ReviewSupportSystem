package review.system.resources.impl;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.HelloWorldService;
import review.system.entity.User;
import review.system.repository.UserRepository;

public class HelloWorldServiceImpl implements HelloWorldService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public int helloworld() {
		return 100;
	}

	@Override
	public User getUser(Long id) {
		return userRepository.findById(id);
	}
}
