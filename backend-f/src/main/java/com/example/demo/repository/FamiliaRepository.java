package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.FamiliaEntity;

@Repository
public interface FamiliaRepository extends CrudRepository<FamiliaEntity, Long>{

}