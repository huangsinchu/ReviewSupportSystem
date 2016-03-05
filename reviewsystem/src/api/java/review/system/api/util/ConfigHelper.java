package review.system.api.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigHelper {
	private static Properties properties;

	public static void initialize(String fileName) {
		properties = new Properties();
		InputStream inputStream = ConfigHelper.class.getClassLoader()
				.getResourceAsStream(fileName);
		try {
			properties.load(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String getProperty(String key) {
		return properties.getProperty(key);
	}

	public static int getPropertyAsInt(String key) {
		return Integer.parseInt(properties.getProperty(key));
	}
}
