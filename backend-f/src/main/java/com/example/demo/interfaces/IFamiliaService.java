package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.FamiliaEntity;
import com.example.demo.entity.PersonaEntity;

public interface IFamiliaService {
	List<FamiliaEntity> findAll();

	FamiliaEntity findById(Long id);

	FamiliaEntity save(FamiliaEntity familia);

	void deleteById(long id);

	List<PersonaEntity> findPersonasByFamiliaId(int familiaId);
}
