package review.system;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import review.system.api.utils.ConfigHelper;
import review.system.container.ResourceContainer;
import io.dropwizard.Application;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.jersey.setup.JerseyEnvironment;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class ReviewSystemApplication extends
		Application<ReviewSystemConfiguration> {
	private ApplicationContext applicationContext;

	public static void main(String[] args) throws Exception {
		new ReviewSystemApplication().run(args);
	}

	@Override
	public void initialize(Bootstrap<ReviewSystemConfiguration> bootstrap) {
		super.initialize(bootstrap);

		ConfigHelper.initialize("reviewsystem.properties");

		bootstrap
				.setConfigurationSourceProvider(new SubstitutingSourceProvider(
						bootstrap.getConfigurationSourceProvider(),
						new EnvironmentVariableSubstitutor(false)));
		applicationContext = new ClassPathXmlApplicationContext(
				"classpath:spring/applicationContext.xml");
		if (null == applicationContext) {
			throw new RuntimeException("can not get application context");
		}

	}

	@Override
	public void run(ReviewSystemConfiguration configuration,
			Environment environment) throws Exception {
		JerseyEnvironment je = environment.jersey();
		ResourceContainer resourceContainer = applicationContext
				.getBean(ResourceContainer.class);
		if (null != resourceContainer) {
			List<Object> resources = resourceContainer.getRestResources();
			for (Object o : resources) {
				je.register(o);
			}
		}
	}
}
