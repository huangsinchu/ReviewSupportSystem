package review.system.resources.impl;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.HelloWorldService;
import review.system.repository.UserRepository;

public class HelloWorldServiceImpl implements HelloWorldService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public int helloworld() {
		return 100;
	}

}
