package review.system.resources.impl;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.PositionService;
import review.system.entity.CodePosition;
import review.system.entity.DocPosition;
import review.system.repository.CodePositionRepository;
import review.system.repository.DocPositionRepository;

public class PositionServiceImpl implements PositionService {

	@Autowired
	private CodePositionRepository codePositionRepository;

	@Autowired
	private DocPositionRepository docPositionRepository;

	@Override
	public CodePosition getCodePosition(Long id) {
		return codePositionRepository.findOne(id);
	}

	@Override
	public Long createCodePosition(CodePosition codePosition) {
		return codePositionRepository.save(codePosition).getId();
	}

	@Override
	public DocPosition getDocPosition(Long id) {
		return docPositionRepository.findOne(id);
	}

	@Override
	public Long createDocPosition(DocPosition docPosition) {
		return docPositionRepository.save(docPosition).getId();
	}

}
