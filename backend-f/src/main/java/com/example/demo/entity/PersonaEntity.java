package com.example.demo.entity;

import java.util.Date;

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
@Table(name = "personas")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonaEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	private String nombres;
	@NonNull
	private String apellidopa;
	@NonNull
	private String apellidoma;
	@NonNull
	private String tipo; //padre o alumno
	private int padre;
	private int madre;
	private String direccionPrincipal;
	private String comunaRegion;
	private String telefono_movil;
	private int familia;
	@NonNull
	private Date fechaRegistro;
}
