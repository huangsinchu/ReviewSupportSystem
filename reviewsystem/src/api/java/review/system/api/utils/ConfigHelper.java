package review.system.api.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author Sakura
 *
 */
public class ConfigHelper {
	private static Properties properties;

	/**
	 * @param fileName
	 */
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

	/**
	 * @param key
	 * @return
	 */
	public static String getProperty(String key) {
		return properties.getProperty(key);
	}

	/**
	 * @param key
	 * @return
	 */
	public static int getPropertyAsInt(String key) {
		return Integer.parseInt(properties.getProperty(key));
	}
}
