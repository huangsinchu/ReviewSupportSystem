package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.InvatationService;
import review.system.entity.Invatation;
import review.system.repository.InvatationRepository;

public class InvatationServiceImpl implements InvatationService {

	@Autowired
	private InvatationRepository invatationRepository;

	@Override
	public Invatation getInvatation(Long id) {
		return invatationRepository.findOne(id);
	}

	@Override
	public ArrayList<Invatation> getInvatationByUser(Long uid) {
		return invatationRepository.findByUserId(uid);
	}

	@Override
	public void createInvatation(Invatation invatation) {
		invatationRepository.save(invatation);
	}

}
