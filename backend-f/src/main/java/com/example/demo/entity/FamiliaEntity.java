package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name = "familias")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FamiliaEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	private String nombref;
	@NonNull
	private String representante;
	private String estadoCivilPadres;
	private String situacionVivienda;
	private int telefono_fijo;
	private int contacto_emergencia;
}
