package review.system.resources.impl;

import review.system.api.resources.HelloWorldService;

public class HelloWorldServiceImpl implements HelloWorldService {

	@Override
	public int helloworld() {
		return 100;
	}
}
