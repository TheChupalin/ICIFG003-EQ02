package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.FamiliaEntity;

public interface IFamiliaService {
	List<FamiliaEntity> findAll();

	FamiliaEntity findById(Long id);

	FamiliaEntity save(FamiliaEntity familia);

	void deleteById(long id);
}
