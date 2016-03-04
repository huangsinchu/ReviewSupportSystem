package review.system;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.jolbox.bonecp.BoneCPDataSource;

import review.system.api.util.ConfigHelper;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories("review.system.repository")
public class DBConfig {
	@Bean
	public DataSource dataSource() {
		BoneCPDataSource dataSource = new BoneCPDataSource();
		dataSource.setDriverClass(ConfigHelper.getProperty("db.driverClass"));
		dataSource.setJdbcUrl(ConfigHelper.getProperty("db.jdbcUrl"));
		dataSource.setUsername(ConfigHelper.getProperty("db.username"));
		dataSource.setPassword(ConfigHelper.getProperty("db.password"));
		dataSource.setPartitionCount(ConfigHelper
				.getPropertyAsInt("db.partitionCount"));
		dataSource.setAcquireIncrement(ConfigHelper
				.getPropertyAsInt("db.acquireIncrement"));
		dataSource.setStatementsCacheSize(ConfigHelper
				.getPropertyAsInt("db.statementsCacheSize"));
		dataSource.setMinConnectionsPerPartition(ConfigHelper
				.getPropertyAsInt("db.min.connections"));
		dataSource.setMaxConnectionsPerPartition(ConfigHelper
				.getPropertyAsInt("db.max.connections"));
		return dataSource;
	}

	@Bean
	public EntityManagerFactory entityManagerFactory() {
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setGenerateDdl(true);
		vendorAdapter.setDatabasePlatform("org.hibernate.dialect.MySQLDialect");
		vendorAdapter.setShowSql(true);

		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
		factory.setJpaVendorAdapter(vendorAdapter);
		factory.setPackagesToScan("review.system.entity");
		factory.setDataSource(dataSource());
		factory.afterPropertiesSet();

		return factory.getObject();
	}

	@Bean
	public PlatformTransactionManager transactionManager() {

		JpaTransactionManager txManager = new JpaTransactionManager();
		txManager.setEntityManagerFactory(entityManagerFactory());
		return txManager;
	}

	@Bean
	public LocalSessionFactoryBean sessionFactory() {
		LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
		sessionFactory.setDataSource(dataSource());
		sessionFactory
				.setPackagesToScan(new String[] { "review.system.entity" });
		sessionFactory.setHibernateProperties(hibernateProperties());
		return sessionFactory;
	}

	private Properties hibernateProperties() {
		Properties properties = new Properties();
		properties.put("hibernate.dialect",
				"org.hibernate.dialect.MySQLDialect");
		properties.put("hibernate.connection.url",
				ConfigHelper.getProperty("db.jdbcUrl"));
		properties.put("hibernate.connection.driver_class",
				ConfigHelper.getProperty("db.driverClass"));
		properties.put("hibernate.connection.username",
				ConfigHelper.getProperty("db.username"));
		properties.put("hibernate.connection.password",
				ConfigHelper.getProperty("db.password"));
		properties.put("hibernate.hbm2ddl.auto", "validate");
		return properties;
	}

}
