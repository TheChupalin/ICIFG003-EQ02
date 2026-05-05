package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.FamiliaEntity;
import com.example.demo.entity.PersonaEntity;
import com.example.demo.interfaces.IFamiliaService;
import com.example.demo.repository.FamiliaRepository;
import com.example.demo.repository.PersonaRepository;

@Service
public class FamiliaServiceImpl implements IFamiliaService{

	@Autowired
	private FamiliaRepository repositoryFamilia;

	@Autowired
	private PersonaRepository repositoryPersona;

	@Override
	public List<FamiliaEntity> findAll() {
		Iterable<FamiliaEntity> ifa = repositoryFamilia.findAll();
		return (List<FamiliaEntity>)ifa;
	}

	@Override
	public FamiliaEntity findById(Long id) {
		Optional<FamiliaEntity> ofa = repositoryFamilia.findById(id);
		return ofa.orElse(null);
	}

	@Override
	public FamiliaEntity save(FamiliaEntity familia) {
		return repositoryFamilia.save(familia);
	}

	@Override
	public void deleteById(long id) {
		repositoryFamilia.deleteById(id);
	}

	@Override
	public List<PersonaEntity> findPersonasByFamiliaId(int familiaId) {
		return repositoryPersona.findByFamilia(familiaId);
	}

}
