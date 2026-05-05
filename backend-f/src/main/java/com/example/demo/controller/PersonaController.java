package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PersonaEntity;
import com.example.demo.interfaces.IPersonaService;

@RestController
@CrossOrigin(origins = "http://localhost:8882")
@RequestMapping("/api/v1/entities/personas")
public class PersonaController {

	@Autowired
	private IPersonaService service;

	@GetMapping
    public ResponseEntity<?> findAll(){
        try {
            return ResponseEntity.ok(service.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody PersonaEntity persona){
        try {
            return ResponseEntity.ok(service.save(persona));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody PersonaEntity persona, @PathVariable Long id){
        try {
            PersonaEntity existingPersona = service.findById(id);
            if (existingPersona == null) {
                return ResponseEntity.status(404).body("Persona no encontrada");
            }
            existingPersona.setNombres(persona.getNombres());
            existingPersona.setApellidopa(persona.getApellidopa());
            existingPersona.setApellidoma(persona.getApellidoma());
            existingPersona.setTipo(persona.getTipo());
            existingPersona.setPadre(persona.getPadre());
            existingPersona.setMadre(persona.getMadre());
            existingPersona.setDireccionPrincipal(persona.getDireccionPrincipal());
            existingPersona.setComunaRegion(persona.getComunaRegion());
            existingPersona.setTelefono_movil(persona.getTelefono_movil());
            existingPersona.setFamilia(persona.getFamilia());
            return ResponseEntity.ok(service.save(existingPersona));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            PersonaEntity existingPersona = service.findById(id);
            if (existingPersona == null) {
                return ResponseEntity.status(404).body("Persona no encontrada");
            }
            service.deleteById(id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }
}