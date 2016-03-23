package review.system.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.User;

public interface UserRepository  extends PagingAndSortingRepository<User, Integer> {

	public User findById(Long id);
}
